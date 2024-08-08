import React, { MouseEventHandler, useState } from "react";
import Image from "next/image";
import styles from "./randomPin.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { getRandomCoord, decimalToDMS } from "./util";
import {
  getRandomGuest,
  getMountainRecommends,
  getOceanRecommends,
  getRandomRecommends,
  getThemeRecommends,
  getAddress,
} from "@/pages/api/map";
import { themes, Theme } from "@/src/types/aboutMap";
import { useRecoilState } from "recoil";
import { randomPinState, userState } from "@/src/atom/stats";
import { RandomPinType } from "@/src/types/aboutMap";
import { useCookies } from "react-cookie";
import cx from "classnames";
import Toast from "../../Common/Toast";
import useToggle from "@/src/hooks/Home/useToggle";

const RandomPin = ({
  setFold,
  setPage,
  setPin,
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPin: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [user, setUser] = useRecoilState(userState);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [showMsg, setShowMsg] = useState(false);

  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);

  const getResponseGuest = async () => {
    try {
      const { lat, lng } = getRandomCoord();
      const addressResponse = await getAddress(lng, lat);
      const fullAddress = addressResponse.data.documents[0].address;
      const address = [
        fullAddress.region_1depth_name,
        fullAddress.region_2depth_name,
        fullAddress.region_3depth_name,
      ].join(" ");
      const { latDMS, lngDMS } = decimalToDMS(lat, lng);
      const response = await getRandomGuest(lng, lat, address);
      const logData = response.data.logResponse;
      const recommendList = response.data.recommendations;
      setRandomPin((prev: RandomPinType) => ({
        theme: "Random",
        logId: 0,
        address: logData.address,
        lat: logData.latitude,
        lng: logData.longitude,
        latDMS: latDMS,
        lngDMS: lngDMS,
        recommends: [...recommendList],
      }));
    } catch (err) {}
  };
  const getResponse = async (theme: Theme) => {
    try {
      let response: any;
      if (theme.id === "Ocean" || theme.id === "Mountain") {
        response =
          theme.id === "Ocean"
            ? await getOceanRecommends()
            : await getMountainRecommends();
        const location = { ...response.data.recommendations[0] };
        const lat = location.mapY;
        const lng = location.mapX;
        const { latDMS, lngDMS } = decimalToDMS(lat, lng);
        console.log(response);
        const logData = response.data.logResponse;
        const recommendList = response.data.recommendations;
        setRandomPin((prev: RandomPinType) => ({
          address: logData.address,
          logId: logData.logId,
          lat: logData.latitude,
          lng: logData.longitude,
          latDMS: latDMS,
          lngDMS: lngDMS,
          theme: logData.theme,
          recommends: [...recommendList],
        }));
      } else {
        const { lat, lng } = getRandomCoord();
        const addressResponse = await getAddress(lng, lat);
        const fullAddress = addressResponse.data.documents[0].address;
        const address = [
          fullAddress.region_1depth_name,
          fullAddress.region_2depth_name,
          fullAddress.region_3depth_name,
        ].join(" ");
        console.log(address);
        const { latDMS, lngDMS } = decimalToDMS(lat, lng);

        if (theme.id === "Random") {
          response = await getRandomRecommends(lng, lat, address);
        } else {
          response = await getThemeRecommends(lng, lat, theme.themeId, address);
        }
        console.log(response);
        if (response.status === 200) {
          const logData = response.data.logResponse;
          const recommendList = response.data.recommendations;
          setRandomPin((prev: RandomPinType) => ({
            address: logData.address,
            logId: logData.logId,
            lat: logData.latitude,
            lng: logData.longitude,
            latDMS: latDMS,
            lngDMS: lngDMS,
            theme: logData.theme,
            recommends: [...recommendList],
          }));
        }
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>, theme: Theme) => {
    e.stopPropagation();
   setTimeout(()=>{
    setPin("pin_show");
   },1500);
    setPage("map");
    setTimeout(() => {
      setPin("pin_hide");
    }, 4500);
    if (user.userId>0) {
      // console.log("user");
      getResponse(theme);
    } else {
      // console.log("guest");
      getResponseGuest();
    }

    setTimeout(() => {
      setFold(true);
    }, 4000);
  };

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <>
        <BsFillCaretRightFill
          className={className}
          style={{ ...style, width: "40px", height: "40px", zIndex: "1" }}
          fontSize={"40px"}
          fill="white"
          onClick={user.userId>0 ? onClick : openToast}
        />
      </>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <>
        <BsFillCaretLeftFill
          className={className}
          style={{ ...style, width: "40px", height: "40px" }}
          fontSize={"40px"}
          fill="white"
          onClick={user.userId>0 ? onClick : openToast}
        />
      </>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.container} draggable="false">
      <Slider {...settings}>
        {themes.map((theme: Theme) => (
          <button key={theme.id} className={styles.pin} draggable="false">
            <span>{theme.title}</span>
            <Image
              src={theme.img}
              alt={theme.id}
              width={148}
              height={214}
              onClick={(e) => onClick(e, theme)}
              draggable="false"
            />
          </button>
        ))}
      </Slider>
      {user.userId===0 && (
        <Toast
          content={"로그인하여 더 많은 테마를 이용해 보세요 !"}
          toast={toast}
          openToast={openToast}
        />
      )}
    </div>
  );
};

export default RandomPin;
