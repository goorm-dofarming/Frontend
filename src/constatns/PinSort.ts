import OceanPin from '@/src/_assets/main/map/pin_ocean.svg';
import Mountain from '@/src/_assets/main/map/pin_mountain.svg';
import ActivityPin from '@/src/_assets/main/map/pin_activity.svg';
import TourPin from '@/src/_assets/main/map/pin_tour.svg';
import RestaurantPin from '@/src/_assets/main/map/pin_food.svg';
import CafePin from '@/src/_assets/main/map/pin_cafe.svg';
import { StaticImageData } from 'next/image';

interface pinTypes {
  dataType: number;
  img: StaticImageData;
}

export const pinType: pinTypes[] = [
  {
    dataType: 1,
    img: OceanPin,
  },
  {
    dataType: 2,
    img: Mountain,
  },
  {
    dataType: 3,
    img: ActivityPin,
  },
  {
    dataType: 4,
    img: TourPin,
  },
  {
    dataType: 5,
    img: RestaurantPin,
  },
  {
    dataType: 6,
    img: CafePin,
  },
];
