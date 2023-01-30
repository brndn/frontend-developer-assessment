import Axios from 'axios';

export const HOST = 'http://localhost:9000/api';
export const REST_ENDPOINT = 'todoItems';

const resolveError = (e) => {
  console.error(e);
  if(e.response && e.response.data){
    return Promise.reject(e.response.data);
  } else {
    return Promise.reject(e.message);
  }
}

export const getAllTodos = async () => {
  try {
    console.log("getAllTodos")

    const resp = await Axios.get(`${HOST}/${REST_ENDPOINT}`);
    console.log("getAllTodos resp",{ resp })
    return resp.data;
  } catch (e) {
    return resolveError(e);
  }
};
export const updateSingleTodo = async (data) => {
  try {
    const resp = await Axios.put(`${HOST}/${REST_ENDPOINT}/${data.id}`, data);
    return resp.data;
  } catch (e) {
    return resolveError(e);
  }
};
export const addTodo = async (data) => {
  try {
    const resp = await Axios.post(`${HOST}/${REST_ENDPOINT}`, data);
    return resp.data;
  } catch (e) {
    return resolveError(e);
  }
};