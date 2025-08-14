import axios from 'axios';

// Prefer env, fall back to localhost
const baseURL =
  process.env.REACT_APP_API_URL?.replace(/\/+$/, '') || 'http://localhost:5000/api';

const api = axios.create({ baseURL });

// attach token if present
const token = localStorage.getItem('authToken') || localStorage.getItem('token');
if (token) api.defaults.headers.common.Authorization = `${token}`;

export default api;
