const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoUri');

const connectDB = async () => {
  try{
    await mongoose.connect(database, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('Database Connected Successfully...')
  } catch(error) {
    console.error(error.message);
    //Exit Process with Failure
    process.exit(1);
  }
}

module.exports = connectDB;