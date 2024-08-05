import apiClient from "../apiClient";
import basicClient from "../basicClient";
import kakaoClient from "../kakaoClient";
import qs from "qs";

export const downloadTour = () => {
  return basicClient.get(`/apiCall/download/TourAttraction`);
};
export const getRandomGuest = (mapX: number, mapY: number, address: string) => {
  return basicClient.get(
    `/recommend/random?mapX=${mapX}&mapY=${mapY}&address=${address}`
  );
};
export const getRandomRecommends = (
  mapX: number,
  mapY: number,
  address: string
) => {
  return apiClient.get(
    `/recommend/random?mapX=${mapX}&mapY=${mapY}&address=${address}`
  );
};
export const getThemeRecommends = (
  mapX: number,
  mapY: number,
  themeId: number | null,
  address: string
) => {
  return apiClient.get(
    `/recommend/theme?theme=${themeId}&mapX=${mapX}&mapY=${mapY}&address=${address}`
  );
};
export const getOceanRecommends = () => {
  return apiClient.get(`/recommend/ocean`);
};
//MEMO: body { mapX, mapY, contentTypeIds}

export const getMountainRecommends = () => {
  return apiClient.get(`/recommend/mountain`);
};

export const getAddress = (lng: number, lat: number) => {
  return kakaoClient.get(`/geo/coord2address?&x=${lng}&y=${lat}`);
};

export const modifyLike = (locationId: number) => {
  return apiClient.post(`/like?&locationId=${locationId}`);
};
export const getLikeList = (params:{}) => {
  return apiClient.get(`/likeList`,{
    params:params,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat : 'brackets' })
    }
  });
};
