import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    // Only fetch CSRF token for non-safe methods
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
    if (!safeMethods.includes(config.method!.toUpperCase())) {
      let csrfToken = Cookies.get('XSRF-TOKEN');
      if (!csrfToken) {
        await axios.get(`${import.meta.env.VITE_API_BASEURL}/csrf-token`, {
          withCredentials: true,
        });
        csrfToken = Cookies.get('XSRF-TOKEN');
        if (!csrfToken) {
          throw new Error('Failed to retrieve CSRF token from cookies');
        }
      }
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
