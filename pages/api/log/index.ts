import apiClient from '../apiClient';

export const getLog = () => {
  return apiClient.get('/getLogs');
};

export const getLogData = (logId: number) => {
  return apiClient.get(`/getLogData?logId=${logId}`);
};
