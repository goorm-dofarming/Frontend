export type LocationInfo = {
  locationId: number;
  averageScore: number;
  totalReview: number;
  title: string;
  addr: string;
  tel: string;
  image: string;
  mapX: number;
  mapY: number;
  dataType: number;
  liked: boolean;
  isReviewed: boolean;
  countLikes: number;
};

export type ReviewImage = {
  imageId: number;
  imageUrl: string;
};

export type Review = {
  user: {
    userId: number;
    email: string;
    nickname: string;
    imageUrl: string;
  };
  reviewId: number;
  score: number;
  reviewLikeCount: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  images: ReviewImage[];
};
