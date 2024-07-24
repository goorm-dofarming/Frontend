import Card from "@/src/_components/Common/Card";
import styles from "./map.module.scss";
// import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { randomPinState } from "@/src/atom/stats";
import { useRecoilState } from "recoil";
import { DataType, Recommend } from "@/src/types/aboutMap";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cf2b17f421b6bb8091a506fb2e0a675c&autoload=false&libraries=services`;
// const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=99910be829a7c9c364bbf190aaf02972&autoload=false&libraries=services`;

const Map = () => {
  // const { markerPositions, size } = props;
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);
  const [focusPin, setFocusPin] = useState<Recommend | null>(null);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(
          randomPin.lat,
          randomPin.lng
        );
        const options = {
          center,
          level: 3,
        };
        const map = new window.kakao.maps.Map(container.current, options);
        // setMapCenter(center);
        setKakaoMap(map);
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(
          center.getLng(),
          center.getLat(),
          (result: any, status: any) => {
            if (status === kakao.maps.services.Status.OK) {
              for (let i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === "H") {
                  setRandomPin((prev) => ({
                    ...prev,
                    address: result[i].address_name,
                  }));
                  break;
                }
              }
            } else {
              console.log("error");
            }
          }
        );
        const imageSrc = "http://54.180.126.49/images/pin/pin_location.png";
        const imageSize = new window.kakao.maps.Size(60, 80); // 마커이미지의 크기입니다
        const imageOption = {
          offset: new window.kakao.maps.Point(27, 69),
        }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const marker = new kakao.maps.Marker({
          map: map,
          position: center,
          image: markerImage,
        });

        // infowindow.open(map, marker);
        for (let i = 0; i < randomPin.recommends.length; i++) {
          const curr = randomPin.recommends[i];
          const pinSize = new window.kakao.maps.Size(48, 60); // 마커이미지의
          const pinImg = DataType[curr.dataType].img;
          const newMarkerImg = new kakao.maps.MarkerImage(pinImg, pinSize);
          const latlng = new kakao.maps.LatLng(curr.mapY, curr.mapX);
          // 마커를 생성합니다
          const pin = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            image: newMarkerImg, // 마커 이미지
          });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${curr.title}</div>`,
          });
          // 마커에 마우스오버 이벤트를 등록합니다
          window.kakao.maps.event.addListener(pin, "mouseover", function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, pin);
          });

          window.kakao.maps.event.addListener(pin, "mouseout", function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          });
        }
      });
    };
  }, [randomPin.lng, randomPin.lat, randomPin.recommends]);

  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // change viewport size
    // const [width, height] = size;
    // container.current.style.width = `100%`;
    // container.current.style.height = `100%`;

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
  }, [kakaoMap]);
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    let center;
    if (focusPin !== null) {
      center = new window.kakao.maps.LatLng(focusPin?.mapY, focusPin?.mapX);
    } else {
      center = new window.kakao.maps.LatLng(randomPin.lat, randomPin.lng);
    }
    kakaoMap.relayout();
    kakaoMap.setCenter(center);
  }, [focusPin]);
  return (
    <main className={styles.main}>
      <section id="container" ref={container} className={styles.map}>
        <div className={styles.info} onClick={() => setFocusPin(null)}>
          <p>{randomPin?.address}</p>
          <span> {`${randomPin?.latDMS} ${randomPin?.lngDMS}`}</span>
        </div>
      </section>
      <div className={styles.locations}>
        {randomPin.recommends.map((recommend, index) => (
          <Card
            key={recommend.id}
            recommend={recommend}
            onClick={setFocusPin}
          />
        ))}
      </div>
    </main>
  );
};

export default Map;
