import pin_random from "@/src/_assets/main/map/pin_random.svg";
import pin_food from "@/src/_assets/main/map/pin_food.svg";
import pin_cafe from "@/src/_assets/main/map/pin_cafe.svg";
import pin_tour from "@/src/_assets/main/map/pin_tour.svg";
import pin_mountain from "@/src/_assets/main/map/pin_mountain.svg";
import pin_ocean from "@/src/_assets/main/map/pin_ocean.png";
import pin_activity from "@/src/_assets/main/map/pin_activity.svg";
// import config from "@/src/_config";

const imgSrc = "http://54.180.126.49";

export const themes: Theme[] = [
  {
    id: "random",
    img: pin_random,
    title: "랜덤",
    // contentTypeIds: [],
    themes: null,
  },
  { id: "restaurant", img: pin_food, title: "식도락", themes: [5] },
  { id: "cafe", img: pin_cafe, title: "카페 투어", themes: [6] },
  { id: "activity", img: pin_activity, title: "액티비티", themes: [3] },
  { id: "tour", img: pin_tour, title: "관광지", themes: [4] },
  { id: "ocean", img: pin_ocean, title: "바다", themes: [3, 4, 5, 6] },
  { id: "mountain", img: pin_mountain, title: "산", themes: [2] },
];

export type Theme = {
  id: string;
  img: string;
  title: string;
  themes: number[] | null;
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
};

export interface RandomPinType {
  address: string;
  lat: number;
  lng: number;
  latDMS: string;
  lngDMS: string;
  theme: Theme | null;
  recommends: Recommend[];
}
