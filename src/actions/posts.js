// import dependencies
import * as api from '../api/index.js';
import {
  FETCH_POST,
  FETCH_BY_SEARCH,
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes.js';
// action creators
//just work for sync-function
// export const getPosts = () => ({ type: 'FETCH_ALL', payload: [] });
export const getPost = (id) => async (dispatch) => {
  try {
    console.log('continue bro1');
    // this dispatch not working immediately
    dispatch({ type: START_LOADING });
    console.log('continue bro');
    console.log('continue bro');
    console.log('continue bro');
    const { data } = await api.fetchPost(id);
    console.log('getPost action-creator');
    console.log(data);
    // this dispatch working immediately
    dispatch({ type: FETCH_POST, payload: data });
    console.log('next step bro');
    dispatch({ type: END_LOADING });
    console.log('end step bro');
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(`${error?.response?.status}: ${error?.response?.data.message}`);
    console.dir(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log('getPosts action-creator');
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    console.log('----------------------------------------------1');
    dispatch({ type: START_LOADING });
    console.log('----------------------------------------------2');
    const { data } = await api.fetchPostsBySearch(searchQuery);
    console.log('getPostsBySearch action-creator');
    console.log(data);
    console.log('----------------------------------------------3');
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    console.log('----------------------------------------------4');
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(
      `${error?.response?.status}: ${error?.response?.data?.message}`
    );
    console.dir(error);
  }
};
export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    console.log('createPost action-creator');
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log('updatePost action-creator');
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    console.log('deletePost action-creator');
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};
