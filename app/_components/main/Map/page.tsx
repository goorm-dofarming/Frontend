"use client";
import Card from "@/app/_components/Common/Card";
import styles from "./map.module.scss";
// import Script from "next/script";
import { useEffect } from "react";
import axios from "axios";
// import { Map } from "react-kakao-maps-sdk";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cf2b17f421b6bb8091a506fb2e0a675c&libraries=services`;
const data = {
  id: 1,
  imgUrl: "",
  name: "용용선생 선릉점",
  type: "요리주점",
  location: "서울특별시 성동구 마조로3가길 15",
  phone: "02-1234-5678",
  // likes:
};
const recommend = [
  data,
  { ...data, id: 2 },
  { ...data, id: 3 },
  { ...data, id: 4 },
];

const Map = () => {
  // const getMapping = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=qR6tI%2BnsyPolriwrrMXbxu3BMliH02gg9FVLp%2F09CsteVUoKGJ5a5PUydtAlvVkSXaalt9mHaOIi51LGXB1iug%3D%3D&numOfRows=10&pageNo=1&MobileApp=TestApp&MobileOS=ETC&arrange=A&contentTypeId=39&mapX=127.024612&mapY=37.532600&radius=1000&_type=json"
  //     );
  //     console.log(response.data);
  //   } catch (err) {}
  // };
  // useEffect(() => {
  //   getMapping();
  // }, []);
  // const { markerPositions, size } = props;
  return (
    <main className={styles.main}>
      {/* <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" /> */}
      {/* <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
        // className={styles.map}
      ></Map> */}
      <div className={styles.locations}>
        {recommend.map((location, index) => (
          <Card key={location.id} {...location} />
        ))}
      </div>
    </main>
  );
};

export default Map;
