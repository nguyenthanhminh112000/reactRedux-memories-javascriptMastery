// import dependencies
import * as api from './../api/index.js';

// action creators
//just work for sync-function
// export const getPosts = () => ({ type: 'FETCH_ALL', payload: [] });

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    console.log('getPosts action-creator');
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.error(error.message);
  }
};
