// import dependencies
import { combineReducers } from 'redux';

// import reducers
import postsReducer from './posts.js';
import authReducer from './auth.js';
export default combineReducers({ posts: postsReducer, auth: authReducer });
