import { FaRegClock } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp, IoHeartSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaMapMarkedAlt } from "react-icons/fa";

export const homeDropdown = [
  {
    id: "map",
    img: FaMapMarkedAlt,
  },
  {
    id: "log",
    img: FaRegClock,
  },
  {
    id: "likes",
    img: IoHeartSharp,
  },
  {
    id: "chat",
    img: IoChatbubbleEllipsesSharp,
  },
  {
    id: "settings",
    img: IoMdSettings,
  },
];
