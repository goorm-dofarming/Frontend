import axios from 'axios';
import config from '@/src/_config';

const basicClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5000,
});

export default basicClient;
