import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
// import loginApi from '../../api/loginApi';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  fetch('https://library-server-1.herokuapp.com/api/v1/user/login', {
    method: 'POST',
    body: JSON.stringify(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      response.json();
    })
    .then(data => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem('jwt', token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      console.log(err);
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please provide correct credentials',
      });
      // logout
      logoutUser(dispatch);
    });
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};

export const logoutUser = dispatch => {
  AsyncStorage.removeItem('jwt');
  // set current user to empty
  dispatch(setCurrentUser({}));
};
