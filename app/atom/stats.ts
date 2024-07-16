import { atom } from "recoil";

// types
import { Chat } from "@/app/types/aboutChat";

export const selectedChatState = atom<Chat>({
  key: "selectedChatState",
  default: {
    roomId: 0,
    title: "",
    overview: "",
    regionId: 0,
  },
});