import { AUTH, LOGOUT } from './../constants/actionTypes.js';

const authReducer = (
  state = !JSON.parse(localStorage.getItem('auth'))
    ? null
    : JSON.parse(localStorage.getItem('auth')),
  action
) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.payload);
      localStorage.setItem(
        'auth',
        JSON.stringify({ authData: { ...action?.payload } })
      );
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
