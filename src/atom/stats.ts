import { atom } from 'recoil';

// types
import { Chat } from '@/src/types/aboutChat';
import { RandomPin } from '../types/aboutMap';

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

// export const randomPinState = atom<RandomPin>({
//   key: 'randomPinState',
//   default: {
//     id: 0,
//     name: '',
//     description: '',
//     image: '',
//   },
// });

export const searchState = atom<boolean>({
  key: 'searchState',
  default: false,
});
