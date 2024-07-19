type theme = "food" | "cafe" | "activity" | "tour" | "ocean" | "mountain";
const themeId = {
  food: 39,
  cafe: "CAFE",
  activity: "ACTIVITY",
  tour: "TOUR",
  ocean: "OCEAN",
  mountain: "MOUNTAIN",
};
type recommend = {
  title: string;
  addr1: string;
  tel: string;
  mapx: string | number;
  mapy: string | number;
  firstimage: string;
  contentid: string;
};

export interface RandomPin {
  destination: string;
  latitude: number;
  longitude: number;
  theme: theme;
  recommends: recommend[];
}
