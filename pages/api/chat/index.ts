import { Chat, Message } from '@/src/types/aboutChat';
import apiClient from '../apiClient';

// 전체 채팅방
// params 없으면 전체 채팅
// condition : 검색용
// roomId, createdAt은 무한 스크롤용
export const getChatRoomList = async (params: {}): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom', { params });
  const data = response.data;
  console.log('entire chat : ', data);
  return data;
};

// 채팅방 생성
export const createChatRoom = async (body: {}): Promise<any> => {
  const response = await apiClient.post('/chatroom', body);
  return response;
};

// 채팅방 퇴장
export const leaveChatRoom = async (roomId: number) => {
  return apiClient.post(`/chatroom/${roomId}/leave`);
};

// 채팅방 입장
export const joinChatRoom = async (roomId: number) => {
  return apiClient.post(`/chatroom/${roomId}/join`);
};

// 내 채팅 리스트 불러오기
export const getMyChatRooms = async (params: {}): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom/my', { params });
  const data = response.data;
  console.log('my chat : ', data);
  return data;
};

// 채팅방 메세지 가져오기
export const getMessage = async (params: {}): Promise<Message[]> => {
  const response = await apiClient.get('/message', { params });
  const data = response.data;
  console.log('message : ', data);
  return data;
};

// 마지막으로 읽은 메세지 보내기
export const sendLastMessage = async (body: {}) => {
  const response = await apiClient.put('/join', body);
  return response;
};
