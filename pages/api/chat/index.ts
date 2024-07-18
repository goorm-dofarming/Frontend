import { Chat } from '@/src/types/aboutChat';
import apiClient from '../apiClient';

//오픈 채팅방 검색(?)
export const getChatRoomList = () => {
  return apiClient.get('/chatroom');
};

// 채팅방 생성
export const createChatRoom = async (body: {}): Promise<any> => {
  const response = await apiClient.post('/chatroom', body);
  return response;
};

//채팅방 퇴장
export const leaveChatRoom = (roomId: number) => {
  return apiClient.post(`/chatroom/${roomId}/leave`);
};

//채팅방 입장
export const joinChatRoom = (roomId: number) => {
  return apiClient.post(`/chatroom/${roomId}/join`);
};

// 내 채팅 리스트 불러오기
export const getMyChatRooms = async (): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom/my');
  const data = response.data;
  console.log('my chat : ', data);
  return data;
};

// 전체 채팅 리스트 불러오기
export const getEntireChatRooms = async (): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom');
  const data = response.data;
  console.log('entire chat : ', data);
  return data;
};

export const deleteChatRoom = (roomId: number) => {
  return apiClient.delete(`/chatroom/${roomId}`);
};

//NOTE:message

export const getMessage = () => {
  return apiClient.get('/message');
};
