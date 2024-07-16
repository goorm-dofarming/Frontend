import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/api/user", () => {
    return HttpResponse.json({
      data: {
        name: "서근재",
        age: 26,
      },
    });
  }),

  http.get("https://api.example.com/api/entireChats", () => {
    return HttpResponse.json({
      data: [
        {
          roomId: 1,
          title: "경남 여행 가는 사람 다 모여",
          overview: "#바다 #맛집",
          regionId: 1,
        },
        { roomId: 2, title: "돌 굴러가유~", overview: "#느림", regionId: 2 },
        {
          roomId: 3,
          title: "붓싼아이가!",
          overview: "#부산갈매기 #밀락더수변",
          regionId: 3,
        },
      ],
    });
  }),

  http.get("https://api.example.com/api/myChats", () => {
    return HttpResponse.json({
      data: [
        {
          roomId: 1,
          title: "경남 여행 가는 사람 다 모여chat",
          overview: "#바다 #맛집",
          regionId: 1,
        },
        {
          roomId: 2,
          title: "돌 굴러가유~",
          overview: "#느림",
          regionId: 2,
        },
      ],
    });
  }),
];
