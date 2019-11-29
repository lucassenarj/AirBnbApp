import axios from 'axios';

const api = axios.create({
  baseURL: 'https://explore-places-serve.herokuapp.com',
});

export default api;
