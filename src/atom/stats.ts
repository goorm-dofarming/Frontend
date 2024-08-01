import { atom } from 'recoil';

// types
import { Alarm, Chat } from '@/src/types/aboutChat';
import { RandomPinType } from '@/src/types/aboutMap';
import { User } from '../types/aboutMain';
import { logDataType } from '../types/aboutLog';

export const selectedChatState = atom<Chat>({
  key: 'selectedChatState',
  default: {
    roomId: 0,
    title: '',
    regionName: '',
    regionImageUrl: '',
    tags: [],
    participantCount: 0,
    createdAt: new Date(),
    unreadMessageCount: 0,
    latestMessage: {
      messageType: '',
      content: '',
      nickname: '',
    },
  },
});

export const randomPinState = atom<RandomPinType>({
  key: 'randomPinState',
  default: {
    address: '',
    logId: 0,
    lat: 0,
    lng: 0,
    latDMS: '',
    lngDMS: '',
    theme: null,
    recommends: [],
  },
});

export const searchState = atom<boolean>({
  key: 'searchState',
  default: false,
});

export const userState = atom<User>({
  key: 'userState',
  default: {
    userId: 0,
    email: '',
    nickname: '',
    imageUrl: '',
    role: '',
  },
});

export const alarmState = atom<boolean>({
  key: 'alarmState',
  default: false,
});

export const pageState = atom<string>({
  key: 'pageState',
  default: 'home',
});

export const messageAlarmState = atom<Alarm>({
  key: 'messageAlarmState',
  default: {
    receiveId: 0,
    roomId: 0,
    content: '',
    messageType: '',
    senderId: 0,
  },
});

export const logEntireData = atom<logDataType[]>({
  key: 'logEntireData',
  default: [
    {
      logId: 0,
      userId: 0,
      theme: '',
      address: '',
      latitude: '',
      longitude: '',
      createdAt: '',
      status: false,
    },
  ],
});
