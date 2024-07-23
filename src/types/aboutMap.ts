import pin_random from "@/src/_assets/main/map/pin_random.svg";
import pin_food from "@/src/_assets/main/map/pin_food.svg";
import pin_cafe from "@/src/_assets/main/map/pin_cafe.svg";
import pin_tour from "@/src/_assets/main/map/pin_tour.svg";
import pin_mountain from "@/src/_assets/main/map/pin_mountain.svg";
import pin_ocean from "@/src/_assets/main/map/pin_ocean.png";

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

export type DataType = {
  ocean: 1;
  mountain: 2;
  activity: 3;
  tour: 4;
  restaurant: 5;
  cafe: 6;
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
  latDMS:string;
  lngDMS:string;
  theme: Theme | null;
  recommends: Recommend[];
}
