import apiClient from "../apiClient";
import basicClient from "../basicClient";
import kakaoClient from "../kakaoClient";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export const downloadTour = () => {
  return basicClient.get(`/apiCall/download/TourAttraction`);
};
export const getRandomRecommends = (
  mapX: number,
  mapY: number,
  address: string
  // themes: number[]
) => {
  if (cookies.get("token")) {
    return apiClient.get(
      `/recommend/random?mapX=${mapX}&mapY=${mapY}&address=${address}`
    );
  } else {
    return basicClient.get(
      `/recommend/random?mapX=${mapX}&mapY=${mapY}&address=${address}`
    );
  }
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
