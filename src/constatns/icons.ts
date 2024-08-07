import { FaRegClock } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp, IoHeartSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

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
  {
    id:"logout",
    img:IoMdLogOut,
  }
];
