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

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    console.log('createPost action-creator');
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log('updatePost action-creator');
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
