import { Chat } from '@/src/types/aboutChat';
import axios from 'axios';

export const getEntireChats = async (): Promise<Chat[]> => {
  const body = {
    roomId: null,
    title: null,
    tagName: null,
    region: null,
    createdAt: null,
  };

  const response = await axios.post<Chat[]>(
    `${process.env.NEXT_PUBLIC_DEPLOY_API_ADDRESS}/chatroom`,
    body
  );

  console.log('entire Chat: ', response.data);
  return response.data;
};
