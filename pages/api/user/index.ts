import { User } from '@/src/types/aboutMain';
import apiClient from '../apiClient';

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get(`/me`);
  const data = response.data;
  return data;
};

//NOTE:body { "multipartFile": "string","userModifyRequest": {"nickname": "usernickname",    "password": "userpassword"}}

export const modifyUser = async (body: {}) => {
  return await apiClient.put(`/users`, body);
};

export const getUser = (userId: number) => {
  return apiClient.get(`/users/${userId}`);
};

export const deleteUser = (userId: number) => {
  return apiClient.delete(`/users/${userId}`);
};
