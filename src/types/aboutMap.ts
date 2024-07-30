import pin_random from "@/src/_assets/main/map/pin_random.svg";
import pin_food from "@/src/_assets/main/map/pin_food.svg";
import pin_cafe from "@/src/_assets/main/map/pin_cafe.svg";
import pin_tour from "@/src/_assets/main/map/pin_tour.svg";
import pin_mountain from "@/src/_assets/main/map/pin_mountain.svg";
import pin_ocean from "@/src/_assets/main/map/pin_ocean.png";
import pin_activity from "@/src/_assets/main/map/pin_activity.svg";
// import config from "@/src/_config";

const imgSrc = `http://${process.env.NEXT_PUBLIC_DEPLOY}`;

export const themes: Theme[] = [
  {
    id: "Random",
    img: pin_random,
    title: "랜덤",
    // contentTypeIds: [],
    themeId: null,
  },
  { id: "Restaurant", img: pin_food, title: "식도락", themeId: 5 },
  { id: "Cafe", img: pin_cafe, title: "카페 투어", themeId: 6 },
  { id: "Activity", img: pin_activity, title: "액티비티", themeId: 3 },
  { id: "Tour", img: pin_tour, title: "관광지", themeId: 4 },
  { id: "Ocean", img: pin_ocean, title: "바다", themeId: null },
  { id: "Mountain", img: pin_mountain, title: "산", themeId: null },
];

export type Theme = {
  id: string;
  img: string;
  title: string;
  themeId: number | null;
};

type pin = {
  type: string;
  img: string;
};
interface DataTypeMap {
  [key: number]: pin;
}
export const DataType: DataTypeMap = {
  1: { type: "Ocean", img: `${imgSrc}/images/pin/pin_ocean.png` },
  2: { type: "Mountain", img: `${imgSrc}/images/pin/pin_mountain.png` },
  3: { type: "Activity", img: `${imgSrc}/images/pin/pin_activity.png` },
  4: { type: "Tour", img: `${imgSrc}/images/pin/pin_tour.png` },
  5: { type: "Restaurant", img: `${imgSrc}/images/pin/pin_food.png` },
  6: { type: "Cafe", img: `${imgSrc}/images/pin/pin_cafe.png` },
};

export type Recommend = {
  id: number;
  title: string;
  addr: string;
  dataType: number;
  tel: string;
  image: string;
  mapX: number;
  mapY: number;
  countLikes: number;
  liked:false;
};

export interface RandomPinType {
  address: string;
  logId:number;
  lat: number;
  lng: number;
  latDMS: string;
  lngDMS: string;
  theme: String | null;
  recommends: Recommend[];
}
