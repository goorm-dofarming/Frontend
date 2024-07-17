import { Chat } from '@/src/types/aboutChat';
import axios from 'axios';

export const getMyChats = async (token: string) => {
  const response = await axios.get<Chat[]>(
    `${process.env.NEXT_PUBLIC_DEPLOY_API_ADDRESS}/chatroom/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('myChats: ', response.data);
  return response.data;
};
