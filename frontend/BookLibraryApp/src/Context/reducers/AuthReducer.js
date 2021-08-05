import {SET_CURRENT_USER} from '../actions/AuthActions';
import isEmpty from '../../components/isEmpty';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // boolean
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
};

export default AuthReducer;
