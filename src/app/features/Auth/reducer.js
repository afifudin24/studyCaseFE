// reducer.js
import { LOGIN_SUCCESS, LOGOUT } from './constants';

const initialState = {
  isLogin: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};
