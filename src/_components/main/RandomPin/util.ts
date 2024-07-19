export const getRandomCoord = () => {
  //   //한국의 위도 범위
  //   const latMin = 33.0;
  //   const latMax = 38.6;

  //   //한국의 경도 범위
  //   const lonMin = 124.6;
  //   const lonMax = 131.9;

  // 임의의 지역 선택
  const region = regions[Math.floor(Math.random() * regions.length)];
  let latitude, longitude;
  while (true) {
    //임의의 위도와 경도 생성
    latitude = Math.random() * (region.latMax - region.latMin) + region.latMin;
    longitude = Math.random() * (region.lonMax - region.lonMin) + region.lonMin;
    if (checkInsideKorea({ lat: latitude, lng: longitude })) {
      break;
    }
  }

  return { lat: latitude, lng: longitude };
};

export const checkInsideKorea = ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  const coordinateList = KoreaCoordinate;
  const size = coordinateList.length;

  if (size < 3) {
    return false;
  }

  let isInner = false;
  let followIndex = size - 1;

  for (let cur = 0; cur < size; cur++) {
    const curPos = coordinateList[cur];
    const prevPos = coordinateList[followIndex];

    if (
      (curPos.lng < lng && prevPos.lng >= lng) ||
      (prevPos.lng < lng && curPos.lng >= lng)
    ) {
      /**
       * 직선의 방정식: y - y1 = M * (x - x1)
       * 기울기: M = (y2 - y1) / (x2 - x1)
       */
      if (
        curPos.lat +
          ((lng - curPos.lng) / (prevPos.lng - curPos.lng)) *
            (prevPos.lat - curPos.lat) <
        lat
      ) {
        isInner = !isInner;
      }
    }

    followIndex = cur;
  }

  return isInner;
};

const regions = [
  {
    name: "서울",
    latMin: 37.413294,
    latMax: 37.715133,
    lonMin: 126.734086,
    lonMax: 127.269311,
  },
  {
    name: "부산",
    latMin: 35.058877,
    latMax: 35.347441,
    lonMin: 128.818951,
    lonMax: 129.283478,
  },
  {
    name: "대구",
    latMin: 35.733712,
    latMax: 36.021266,
    lonMin: 128.431928,
    lonMax: 128.767274,
  },
  {
    name: "인천",
    latMin: 37.375145,
    latMax: 37.619116,
    lonMin: 126.416287,
    lonMax: 126.855835,
  },
  {
    name: "광주",
    latMin: 35.074443,
    latMax: 35.214563,
    lonMin: 126.676798,
    lonMax: 126.940148,
  },
  {
    name: "대전",
    latMin: 36.246075,
    latMax: 36.437923,
    lonMin: 127.291133,
    lonMax: 127.514073,
  },
  {
    name: "울산",
    latMin: 35.377433,
    latMax: 35.660642,
    lonMin: 129.095474,
    lonMax: 129.408041,
  },
  {
    name: "경기도",
    latMin: 36.966667,
    latMax: 38.291668,
    lonMin: 126.195833,
    lonMax: 127.862777,
  },
  {
    name: "강원도",
    latMin: 37.068828,
    latMax: 38.303202,
    lonMin: 127.119292,
    lonMax: 129.183855,
  },
  {
    name: "충청북도",
    latMin: 36.018762,
    latMax: 37.27461,
    lonMin: 127.192738,
    lonMax: 128.089996,
  },
  {
    name: "충청남도",
    latMin: 36.109056,
    latMax: 36.96107,
    lonMin: 126.18286,
    lonMax: 127.549065,
  },
  {
    name: "전라북도",
    latMin: 35.389502,
    latMax: 36.272618,
    lonMin: 126.448829,
    lonMax: 127.683582,
  },
  {
    name: "전라남도",
    latMin: 34.299246,
    latMax: 35.482293,
    lonMin: 126.10709,
    lonMax: 127.88052,
  },
  {
    name: "경상북도",
    latMin: 35.429565,
    latMax: 36.993076,
    lonMin: 128.456166,
    lonMax: 130.904471,
  },
  {
    name: "경상남도",
    latMin: 34.542581,
    latMax: 35.732788,
    lonMin: 127.425166,
    lonMax: 129.34143,
  },
  {
    name: "제주도",
    latMin: 33.11585,
    latMax: 33.550282,
    lonMin: 126.145264,
    lonMax: 126.987125,
  },
];
const KoreaCoordinate = [
  {
    id: 1,
    lat: 39.105648,
    lng: 129.293848,
  },

  {
    id: 2,
    lat: 37.472782,
    lng: 131.597259,
  },

  {
    id: 3,
    lat: 34.743466,
    lng: 129.259321,
  },

  {
    id: 4,
    lat: 33.810255,
    lng: 128.903499,
  },

  {
    id: 5,
    lat: 32.599185,
    lng: 125.157071,
  },

  {
    id: 6,
    lat: 34.458362,
    lng: 124.150105,
  },

  {
    id: 7,
    lat: 37.65974,
    lng: 124.972107,
  },
];
