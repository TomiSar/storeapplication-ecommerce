import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.debug('JWT Token from localStorage:', jwtToken);
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
