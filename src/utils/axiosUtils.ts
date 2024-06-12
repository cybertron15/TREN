import axios from 'axios';
import { getAccessToken, setAccessToken, getRefreshToken, removeTokens, isTokenExpired } from './tokenUtils';


const axiosInstance = axios.create({
  baseURL: '<http://localhost:8000/api>',  
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
      try {
        const response = await axios.post('<http://localhost:8000/api/token/refresh/>', {
          refresh: getRefreshToken(),
        });
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);
        token = newAccessToken;
      } catch (error) {
        removeTokens();
        window.location.href = '/login';
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
