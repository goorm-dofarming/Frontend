import { LocationInfo } from '@/src/types/aboutReview';
import apiClient from '../apiClient';

export const getReviewData = async (params: {}) => {
  const response = await apiClient.get('/review', { params });
  const data = response.data;
  return data;
};

export const makeReview = async (body: {}) => {
  const response = await apiClient.post('/review', body);
  const data = response.data;
  return data;
};

export const getLocationData = async (
  locationId: number
): Promise<LocationInfo> => {
  const response = await apiClient.get(`/location/${locationId}`);
  const data = response.data;
  return data;
};
