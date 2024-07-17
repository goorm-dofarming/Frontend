import Card from "@/app/_components/Common/Card";
import styles from "./map.module.scss";
import Script from "next/script";
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
const KakaoMap = () => {
  // const { markerPositions, size } = props;
  return (
    <main className={styles.main}>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
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

export default KakaoMap;
