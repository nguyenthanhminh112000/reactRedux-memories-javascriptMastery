import * as api from './../api/index.js';
export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: 'AUTH', payload: data });
    history.push('/');
  } catch (error) {
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: 'AUTH', payload: data });
    history.push('/');
  } catch (error) {
    console.log(`${error.response.status}: ${error.response.data.message}`);
    console.dir(error);
  }
};
