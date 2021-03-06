import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, REMOVE_CURRENT_USER } from './types';

// Register a new user function 

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Login and get a jwt token
export const loginUser = loginData => dispatch => {
  axios
    .post('/api/users/login', loginData)
    .then(res => {
      // Save to Local Storage
      // Object destructuring
      const { token } = res.data;
      // Set the token into Local storage
      localStorage.setItem('jwtToken', token);
      // Set the token into Axios header
      setAuthToken(token);
      // Decode the token, NPM package jwt_decode
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// export const logOutUser = () => dispatch => {
//   axios
//     .get('/api/users/test')
//     .then(res => {
//       console.log(res);
//     });
// };

// 

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
}