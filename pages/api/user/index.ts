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

export const getUser = async (userId: number): Promise<User> => {
  if (userId && userId > 0) {
    const response = await apiClient.get(`/users/${userId}`);
    const data = response.data;
    return data;
  }
  return {
    userId: 0,
    email: '',
    nickname: '',
    imageUrl: '',
    role: '',
  };
};

export const deleteUser = (userId: number) => {
  return apiClient.delete(`/users/${userId}`);
};
