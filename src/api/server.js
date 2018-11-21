import axios from 'axios';

export const API_BASE_URL = 'https://ww4.shaadi.com/api';

const server = axios.create({
  baseURL: API_BASE_URL,
});

export default server;
