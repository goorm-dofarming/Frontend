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
  createAt: Date;
}
