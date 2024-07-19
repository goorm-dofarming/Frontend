import { atom } from 'recoil';

// types
import { Chat } from '@/src/types/aboutChat';

export const selectedChatState = atom<Chat>({
  key: 'selectedChatState',
  default: {
    roomId: 0,
    title: '',
    regionName: '',
    regionImageUrl: '',
    tags: [],
    participantCount: 0,
    createAt: new Date(),
  },
});
