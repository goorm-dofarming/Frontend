import { Chat, Message } from '@/src/types/aboutChat';
import apiClient from '../apiClient';

// 오픈 채팅방 검색
// condition : 검색용
// roomId, createdAt은 무한 스크롤용
export const getChatRoomList = async (params: {}): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom', { params });
  const data = response.data;
  return data;
};

// 채팅방 무한스크롤
export const getNextChatList = async ({
  pageParam = { lastId: 0, lastCreatedAt: new Date() },
}): Promise<Chat[]> => {
  const params = {
    roomId: pageParam.lastId,
    createdAt: pageParam.lastCreatedAt,
  };
  const response = await apiClient.get('/chatroom', { params });
  const data = response.data;
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
export const getMyChatRooms = async (): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom/my');
  const data = response.data;
  // console.log('my chat : ', data);
  return data;
};

// 전체 채팅 리스트 불러오기
export const getEntireChatRooms = async (): Promise<Chat[]> => {
  const response = await apiClient.get('/chatroom');
  const data = response.data;
  // console.log('entire chat : ', data);
  return data;
};

// 채팅방 삭제는 인원수가 0이 되면 자동 삭제됨
// export const deleteChatRoom = (roomId: number) => {
//   return apiClient.delete(`/chatroom/${roomId}`);
// };

// 채팅방 메세지 가져오기
export const getMessage = async (params: {}): Promise<Message[]> => {
  const response = await apiClient.get('/message', { params });
  const data = response.data;
  console.log('message : ', data);
  return data;
};
