import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      data: res.data
    });
  } catch(error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//Register User
export const register = (userData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(userData);

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      data: res.data
    });

    dispatch(loadUser());

  } catch(error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

//Login User
export const login = (userCredentials) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(userCredentials);

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      data: res.data
    });

    dispatch(loadUser());

  } catch(error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout User
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}