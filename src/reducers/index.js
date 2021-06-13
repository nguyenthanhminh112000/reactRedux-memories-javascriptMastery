// import dependencies
import { combineReducers } from 'redux';

// import reducers
import postsReducer from './posts.js';

export default combineReducers({ posts: postsReducer });
