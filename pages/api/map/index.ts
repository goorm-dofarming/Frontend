import apiClient from "../apiClient";
import basicClient from "../basicClient";
import testClient from "../testClient";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export const downloadTour = () => {
  return basicClient.get(`/apiCall/download/TourAttraction`);
};
export const getRandomRecommends = (
  mapX: number,
  mapY: number
  // themes: number[]
) => {
  if (cookies.get("token")) {
    return apiClient.get(`/recommend/random?mapX=${mapX}&mapY=${mapY}`);
  } else {
    return basicClient.get(`/recommend/random?mapX=${mapX}&mapY=${mapY}`);
  }
};
export const getThemeRecommends = (
  mapX: number,
  mapY: number,
  themeId: number | null
) => {
  return apiClient.get(
    `/recommend/theme?theme=${themeId}&mapX=${mapX}&mapY=${mapY}`
  );
};
export const getOceanRecommends = () => {
  return apiClient.get(`/recommend/ocean`);
};
//MEMO: body { mapX, mapY, contentTypeIds}

export const getMountainRecommends = () => {
  return apiClient.get(`/recommend/mountain`);
};
