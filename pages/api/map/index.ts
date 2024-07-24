import apiClient from "../apiClient";
import basicClient from "../basicClient";
import testClient from "../testClient";

export const getRandomRecommends = (
  mapX: number,
  mapY: number
  // themes: number[]
) => {
  return testClient.get(`/recommend/withoutTheme?mapX=${mapX}&mapY=${mapY}`);
};
export const getThemeRecommends = (
  mapX: number,
  mapY: number,
  themes: number[] | null
) => {
  return testClient.get(
    `/recommend/withoutOcean?themes=${themes?.join(",")}&mapX=${mapX}&mapY=${mapY}`
  );
};
export const getOceanRecommends = (themes: number[] | null) => {
  return testClient.get(`/recommend/withOcean?themes=${themes?.join(",")}`);
};
//MEMO: body { mapX, mapY, contentTypeIds}

// export const getMountain = (body: {}) => {
//   return apiClient.get(`/apiCall/mountains`, body);
// };
