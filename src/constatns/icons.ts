import { FaRegClock } from 'react-icons/fa';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { FaMapMarkedAlt } from 'react-icons/fa';

export const homeDropdown = [
  {
    id: 'map',
    img: FaMapMarkedAlt,
  },
  {
    id: 'logs',
    img: FaRegClock,
  },
  {
    id: 'chat',
    img: IoChatbubbleEllipsesSharp,
  },
  {
    id: 'hearts',
    img: FaHeart,
  },
  {
    id: 'settings',
    img: IoMdSettings,
  },
];
