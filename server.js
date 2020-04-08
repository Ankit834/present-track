const express = require('express');
const connectDB = require('./config/database');
const path = require('path');

const app = express();

//Connect Database
connectDB();
const User = require('./models/User');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', async (socket) => {
  const userId = socket.handshake.query.userId;
  let user = await User.findOneAndUpdate({ _id: userId }, { isActive: true });
  let data = await User.find({ isActive: true }).select('-password');
  io.emit('Active Users', data);

  //When user disconnects
  socket.on('disconnect', async () => {
    let user = await User.findOneAndUpdate({ _id: userId }, { isActive: false});
    let data = await User.find({ isActive: true }).select('-password');
    io.emit('Active Users', data);
  });
});

//Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));