import axios from 'axios';
import config from '@/src/_config';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
  // const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const accessToken = cookies.get('token');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiClient;
