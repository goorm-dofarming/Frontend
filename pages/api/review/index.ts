import { LocationInfo } from '@/src/types/aboutReview';
import apiClient from '../apiClient';

export const getReviewData = async (params: {}) => {
  const response = await apiClient.get('/review', { params });
  const data = response.data;
  return data;
};

export const getMyReview = async (locationId: number) => {
  const response = await apiClient.get(`/review/${locationId}`);
  const data = response.data;
  return data;
};

export const makeReview = async (body: {}) => {
  const response = await apiClient.post('/review', body);
  const data = response.data;
  return data;
};

export const updateReview = async (body: {}, reviewId: number) => {
  const response = await apiClient.put(`/review/${reviewId}`, body);
  const data = response.data;
  return data;
};

export const deleteImage = async (imageId: number) => {
  const response = await apiClient.delete(`/image/${imageId}`);
  return response;
};

export const getLocationData = async (
  locationId: number
): Promise<LocationInfo> => {
  const response = await apiClient.get(`/location/${locationId}`);
  const data = response.data;
  return data;
};
