export const getRandomCoord = () => {
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
    latMax: 35.204244,
    lonMin: 128.956817,
    lonMax: 129.172479,
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
    lonMin: 126.624388,
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
    latMax: 35.551617,
    lonMin: 129.141148,
    lonMax: 129.330826,
  },
  {
    name: "경기도",
    latMin: 36.966667,
    latMax: 38.291668,
    lonMin: 126.626678,
    lonMax: 127.862777,
  },
  {
    name: "강원도",
    latMin: 37.068828,
    latMax: 38.303202,
    lonMin: 127.788858,
    lonMax: 128.789051,
  },
  {
    name: "충청북도", // 수정: 중복된 충청남도를 충청북도로 변경
    latMin: 36.445778,
    latMax: 37.004681,
    lonMin: 127.285877,
    lonMax: 128.075165,
  },
  {
    name: "충청남도",
    latMin: 36.109056,
    latMax: 36.96107,
    lonMin: 126.680133,
    lonMax: 127.549065,
  },
  {
    name: "전라북도",
    latMin: 35.581078,
    latMax: 36.272618,
    lonMin: 126.705144,
    lonMax: 127.683582,
  },
  {
    name: "전라남도",
    latMin: 34.626394,
    latMax: 35.482293,
    lonMin: 126.701122,
    lonMax: 127.706107,
  },
  {
    name: "경상남도",
    latMin: 35.018438,
    latMax: 35.732788,
    lonMin: 127.799743,
    lonMax: 129.064406,
  },
  {
    name: "제주도",
    latMin: 33.304844,
    latMax: 33.550282,
    lonMin: 126.352924,
    lonMax: 126.737836,
  },
  {
    name: "경상북도",
    latMin: 35.429565,
    latMax: 36.993076,
    lonMin: 128.456166,
    lonMax: 129.230582,
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

export function decimalToDMS(latitude: number, longitude: number) {
  // 소수점 좌표를 도, 분, 초 형식으로 변환하는 함수
  function convert(coordinate: number) {
    const degrees = Math.floor(coordinate);
    const minutesFull = (coordinate - degrees) * 60;
    const minutes = Math.floor(minutesFull);
    const seconds = (minutesFull - minutes) * 60;
    return {
      degrees,
      minutes,
      seconds,
    };
  }

  // 위도 변환
  const lat = convert(Math.abs(latitude));
  const latDirection = latitude >= 0 ? "N" : "S";

  // 경도 변환
  const lng = convert(Math.abs(longitude));
  const lngDirection = longitude >= 0 ? "E" : "W";

  // 변환된 결과 문자열 생성
  const latDMS = `${lat.degrees}˚${lat.minutes}'${lat.seconds.toFixed(2)}"${latDirection}`;
  const lngDMS = `${lng.degrees}˚${lng.minutes}'${lng.seconds.toFixed(2)}"${lngDirection}`;

  return {
    latDMS: latDMS,
    lngDMS: lngDMS,
  };
}
