import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Default from './components/Layout/Default';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';
import styled from 'styled-components';
import { Provider } from 'react-redux'
import store from './store';
import Alert from './components/Layout/Alert';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';
import Home from './components/Home';
import PrivateRoute from './routing/PrivateRoute';

export class App extends Component {

  componentDidMount() {
    if(localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <RouteContainer>
              <Alert />
              <Switch>
                <Route exact path='/' component={Default} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/home' component={Home} />
              </Switch>
            </RouteContainer>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;

const RouteContainer = styled.section`
`;
