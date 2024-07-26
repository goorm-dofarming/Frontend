import axios from 'axios';
import apiClient from '../apiClient';
import basicClient from '../basicClient';

export const getLog = () => {
  return apiClient.get('/getLogs');
};

export const getLogData = (logId: number) => {
  return apiClient.get(`/getLogData?logId=${logId}`);
};
