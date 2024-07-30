import React, { MouseEventHandler, useState } from "react";
import Image from "next/image";
import styles from "./randomPin.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { getRandomCoord, decimalToDMS } from "./util";
import {
  getMountainRecommends,
  getOceanRecommends,
  getRandomRecommends,
  getThemeRecommends,
  getAddress,
} from "@/pages/api/map";
import { themes, Theme } from "@/src/types/aboutMap";
import { useRecoilState } from "recoil";
import { randomPinState } from "@/src/atom/stats";
import { RandomPinType } from "@/src/types/aboutMap";
import { useCookies } from "react-cookie";
import cx from "classnames";

const RandomPin = ({
  setFold,
  setPage,
  setPin,
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPin: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [cookies] = useCookies(["token"]);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [showMsg, setShowMsg] = useState(false);

  const onClickBtn: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    setShowMsg(true);
    console.log("slider Btn");
    console.log("showMsg:", showMsg);
    setTimeout(() => {
      setShowMsg(false);
    }, 4000);
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
        const recommendList = response.data.recommendations.slice(1);
        setRandomPin((prev: RandomPinType) => ({
          address: response.data.address,
          logId: response.data.logId,
          lat: lat,
          lng: lng,
          latDMS: latDMS,
          lngDMS: lngDMS,
          theme: theme.id,
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
        const { latDMS, lngDMS } = decimalToDMS(lat, lng);
        if (theme.id === "Random") {
          response = await getRandomRecommends(lng, lat, address);
        } else {
          response = await getThemeRecommends(lng, lat, theme.themeId, address);
        }
        const recommendList = response.data.recommendations;
        setRandomPin((prev: RandomPinType) => ({
          address: response.data.address,
          logId: response.data.logId,
          lat: lat,
          lng: lng,
          latDMS: latDMS,
          lngDMS: lngDMS,
          theme: theme.id,
          recommends: [...recommendList],
        }));
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>, theme: Theme) => {
    e.stopPropagation();
    setPin("pin_show");
    setPage("map");
    setTimeout(() => {
      setPin("pin_hide");
    }, 1600);
    getResponse(theme);
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
          onClick={cookies.token ? onClick : onClickBtn}
        />
        {!cookies.token && (
          <span className={cx(styles.msg, { [styles.showMsg]: showMsg })}>
            {`로그인하여 더 많은 \n테마를 이용해 보세요~!`}
          </span>
        )}
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
          onClick={cookies.token ? onClick : onClickBtn}
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
    <div className={styles.container}>
      <Slider {...settings}>
        {themes.map((theme: Theme) => (
          <button key={theme.id} className={styles.pin}>
            <span>{theme.title}</span>
            <Image
              src={theme.img}
              alt={theme.id}
              width={148}
              height={214}
              onClick={(e) => onClick(e, theme)}
            />
          </button>
        ))}
      </Slider>
    </div>
  );
};

export default RandomPin;
