import { atom } from "recoil";

// types

import { Chat } from "@/src/types/aboutChat";
import { RandomPinType } from "@/src/types/aboutMap";

export const selectedChatState = atom<Chat>({
  key: "selectedChatState",
  default: {
    roomId: 0,
    title: "",
    regionName: "",
    regionImageUrl: "",
    tags: [],
    participantCount: 0,
    createdAt: new Date(),
  },
});


export const randomPinState = atom<RandomPinType>({
  key: "randomPinState",
  default: {
    address: "",
    lat: 0,
    lng: 0,
    latDMS: "",
    lngDMS: "",
    theme: null,
    recommends: [],
  },
});


export const searchState = atom<boolean>({
  key: "searchState",
  default: false,
});
