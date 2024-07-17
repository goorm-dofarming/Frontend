import Card from '@/src/_components/Common/Card';
import styles from './map.module.scss';
// import Script from "next/script";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import pin_location from '@/src/_assets/main/map/pin_location.png';
import pin_activity from '@/src/_assets/main/map/pin_activity.svg';
import pin_cafe from '@/src/_assets/main/map/pin_cafe.svg';
import pin_food from '@/src/_assets/main/map/pin_food.svg';
import pin_ocean from '@/src/_assets/main/map/pin_ocean.png';
import pin_mountain from '@/src/_assets/main/map/pin_mountain.svg';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cf2b17f421b6bb8091a506fb2e0a675c&autoload=false&libraries=services`;
// const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=99910be829a7c9c364bbf190aaf02972&libraries=services`;
const data = {
  id: 1,
  imgUrl: '',
  name: '용용선생 선릉점',
  type: '음식점',
  location: '서울특별시 성동구 마조로3가길 15',
  phone: '02-1234-5678',
  // likes:
};
const recommend = [
  data,
  { ...data, id: 2 },
  { ...data, id: 3 },
  { ...data, id: 4 },
];

const Map = () => {
  // const { markerPositions, size } = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const container = useRef();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        const options = {
          center,
          level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);
        //setMapCenter(center);
        setKakaoMap(map);
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          '제주특별자치도 제주시 첨단로 242',
          function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              const imageSrc =
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
              // "http://localhost:4000/app/_assets/main/map/pin_location.png";
              // 마커이미지의 주소입니다
              const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
              const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

              const markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
              );
              // const markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new kakao.maps.Marker({
                map: map,
                position: coords,
                image: markerImage,
                //image: markerImage //마커이미지설정
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
      });
    };
  }, []);

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
  return (
    <main className={styles.main}>
      <section id="container" ref={container} className={styles.map}></section>
      <div className={styles.locations}>
        {recommend.map((location, index) => (
          <Card key={location.id} {...location} />
        ))}
      </div>
    </main>
  );
};

export default Map;
