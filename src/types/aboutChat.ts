export interface Tag {
  name: string;
  color: string;
}

export interface Chat {
  roomId: number;
  title: string;
  regionName: string;
  regionImageUrl: string;
  tags: Tag[];
  participantCount: number;
  createdAt: Date;
  unreadMessageCount: number;
  latestMessage: {
    content: string;
    messageType: string;
    nickname: string;
  };
}

export interface Message {
  messageId: number;
  roomId: number;
  userId: number;
  nickname: string;
  messageType: string;
  content: string;
  createdAt: string;
}

export interface Alarm {
  receiveId: number;
  roomId: number;
  content: string;
  messageType: string;
  senderId: number;
}
