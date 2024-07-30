import Card from "@/src/_components/Common/Card";
import styles from "./map.module.scss";
import { useEffect, useRef, useState } from "react";
import { pageState, randomPinState } from "@/src/atom/stats";
import { useRecoilState } from "recoil";
import { DataType, Recommend } from "@/src/types/aboutMap";
import { makeCustomOverlay, makeInfoWindow } from "./utils";
import { useCookies } from "react-cookie";
import { FaLessThanEqual } from "react-icons/fa";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_SDK}&autoload=false&libraries=services`;

const Map = () => {
  const [cookies] = useCookies(["token"]);
  const [page, setPage] = useRecoilState(pageState);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);
  const [focusPin, setFocusPin] = useState<Recommend | null>(null);
  const [customOverlay, setCustomOverlay] = useState<any>(null);
  const [showCustomOverlay, setShowCustomOverlay] = useState<boolean>(true);
  const [showPinInfo, setShowPinInfo] = useState<boolean[]>(
    new Array<boolean>(randomPin.recommends.length)
  );
  const [pinInfo, setPinInfo] = useState<any[]>([]);
  const container = useRef<HTMLElement>(null);
  console.log(randomPin.logId);
  const onClickShareBtn = () => {
    if (!cookies.token) {
      alert("로그인인 필요합니다.");
      return;
    }
    alert("share button click");
    console.log("share button click");
  };
  useEffect(() => {
    document.cookie = "username=dofarming; SameSite=Strict; Secure";
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
        const imageSrc = `http://${process.env.NEXT_PUBLIC_DEPLOY}/images/pin/pin_location.png`;
        const imageSize = new window.kakao.maps.Size(60, 80); // 마커이미지의 크기입니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: center,
          image: markerImage,
        });

        const content = document.createElement("div");
        content.innerHTML = makeCustomOverlay(randomPin);

        content
          .querySelector("#share-link")
          ?.addEventListener("click", onClickShareBtn);
        content
          .querySelector("#share-kakaotalk")
          ?.addEventListener("click", onClickShareBtn);

        const customOverlay = new window.kakao.maps.CustomOverlay({
          // map: map,
          position: center,
          content: content,
          yAnchor: 1.4,
          xAnchor: -0.2,
        });
        setCustomOverlay(customOverlay as any);
        window.kakao.maps.event.addListener(marker, "click", function () {
          setShowCustomOverlay((prev: boolean) => !prev);
        });

        let arr = new Array<boolean>(randomPin.recommends.length);
        arr.fill(false);
        setShowPinInfo([...arr]);
        const infoWindows: any[] = [];
        for (let i = 0; i < randomPin.recommends.length; i++) {
          const curr = randomPin.recommends[i];
          const pinSize = new kakao.maps.Size(48, 60);
          const pinImg = DataType[curr.dataType].img;
          const newMarkerImg = new kakao.maps.MarkerImage(pinImg, pinSize);
          const latlng = new kakao.maps.LatLng(curr.mapY, curr.mapX);
          // 마커를 생성합니다
          const pin = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: latlng, // 마커를 표시할 위치
            image: newMarkerImg, // 마커 이미지
          });
          const infowindowContent = makeInfoWindow(curr.title);
          const infowindow = new window.kakao.maps.CustomOverlay({
            map: map,
            clickable: true,
            position: latlng,
            content: infowindowContent,
            yAnchor: 3.15,
            xAnchor: 0.5,
          });
          infoWindows.push(infowindow);

          window.kakao.maps.event.addListener(pin, "click", function () {
            setShowPinInfo((prev) => {
              const newInfos = [...prev];
              const tmp = newInfos[i];
              newInfos[i] = !tmp;
              return newInfos;
            });
          });
        }
        setPinInfo([...infoWindows]);
        setKakaoMap(map);
      });
    };
  }, [randomPin.lng, randomPin.lat, randomPin.recommends, randomPin.address]);
  useEffect(() => {
    if (kakaoMap && pinInfo.length > 0) {
      for (let i = 0; i < showPinInfo.length; i++) {
        if (showPinInfo[i]) {
          pinInfo[i].setMap(kakaoMap);
        } else {
          pinInfo[i].setMap(null);
        }
      }
    }
  }, [showPinInfo]);
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const center = new window.kakao.maps.LatLng(randomPin.lat, randomPin.lng);
    kakaoMap.setCenter(center);
    kakaoMap.relayout();
  }, [kakaoMap]);

  useEffect(() => {
    if (customOverlay && kakaoMap) {
      if (showCustomOverlay) {
        customOverlay.setMap(kakaoMap);
      } else {
        customOverlay.setMap(null);
      }
    }
  }, [showCustomOverlay, customOverlay, kakaoMap]);
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    const center = new window.kakao.maps.LatLng(randomPin.lat, randomPin.lng);
    kakaoMap.setCenter(center);
    kakaoMap.relayout();
  }, [page]);
  useEffect(() => {
    if (kakaoMap === null || container.current === null) {
      return;
    }
    let center;
    if (focusPin !== null) {
      center = new window.kakao.maps.LatLng(focusPin?.mapY, focusPin?.mapX);
    } else {
      center = new window.kakao.maps.LatLng(randomPin.lat, randomPin.lng);
    }
    kakaoMap.setCenter(center);
    kakaoMap.relayout();
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
            key={recommend.id + index}
            recommend={recommend}
            onClick={setFocusPin}
          />
        ))}
      </div>
    </main>
  );
};

export default Map;
