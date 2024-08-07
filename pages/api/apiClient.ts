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
  console.log(cookies);
  const accessToken = cookies.get('token',{
    doNotParse: true,
  });
  console.log('accessToken: ', accessToken);
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

export default apiClient;
