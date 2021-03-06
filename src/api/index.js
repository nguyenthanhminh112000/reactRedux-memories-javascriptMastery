import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api-memoriesapp.herokuapp.com/api/v1',
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem('auth')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('auth')).authData.token
    }`;
  }
  return req;
});
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => {
  return API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags || 'none'
    }`
  );
};

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`${'/posts'}/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);

export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
