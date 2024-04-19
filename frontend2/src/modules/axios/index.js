import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_API_URL;
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    const newConfig = { ...config };

    newConfig.headers.Authorization = `Bearer ${token}`;
    return newConfig;
  }
  return config;
});

export default instance;
