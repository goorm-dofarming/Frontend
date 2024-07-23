"use client";
import React, { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./randomPin.module.scss";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { getRandomCoord, decimalToDMS } from "./util";
import {
  getOceanRecommends,
  getRandomRecommends,
  getThemeRecommends,
} from "@/pages/api/map";
import { themes, Theme } from "@/src/types/aboutMap";
import { useRecoilState } from "recoil";
import { randomPinState } from "@/src/atom/stats";
import { RandomPinType } from "@/src/types/aboutMap";
const RandomPin = ({
  setFold,
  setPage,
  setPin,
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPin: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // const [theme, setTheme] = useState("random");
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const getResponse = async (theme: Theme) => {
    try {
      // const { lat, lng } = getRandomCoord();
      // const { latDMS, lngDMS } = decimalToDMS(lat, lng);
      let response: any;
      if (theme.id === "ocean") {
        response = await getOceanRecommends(theme.themes);
        const location = { ...response.data[0] };
        const lat = location.mapY;
        const lng = location.mapX;
        const { latDMS, lngDMS } = decimalToDMS(lat, lng);
        const recommendList = response.data.slice(1);
        setRandomPin((prev: RandomPinType) => ({
          ...prev,
          lat: location.mapY,
          lng: location.mapX,
          latDMS: latDMS,
          lngDMS: lngDMS,
          theme: theme,
          recommends: [...recommendList],
        }));
      } else {
          const { lat, lng } = getRandomCoord();
      const { latDMS, lngDMS } = decimalToDMS(lat, lng);
        if (theme.id === "random") {
          response = await getRandomRecommends(lng, lat);
        } else {
          response = await getThemeRecommends(lng, lat, theme.themes);
        }
        const recommendList = response.data;
        setRandomPin((prev: RandomPinType) => ({
          ...prev,
          lat: lat,
          lng: lng,
          latDMS: latDMS,
          lngDMS: lngDMS,
          theme: theme,
          recommends: [...recommendList],
        }));
      }

      console.log(response.data);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  const onClick = (theme: Theme) => {
    //랜덤핀 클릭시 api

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
      <BsFillCaretRightFill
        className={className}
        style={{ ...style, width: "40px", height: "40px" }}
        fontSize={"40px"}
        fill="white"
        onClick={onClick}
      />
    );
  };
  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <BsFillCaretLeftFill
        className={className}
        style={{ ...style, width: "40px", height: "40px" }}
        fill="white"
        onClick={onClick}
      />
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
  useEffect(() => {
    console.log(randomPin);
  }, [randomPin]);
  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {themes.map((theme: Theme) => (
          <button key={theme.id} className={styles.pin}>
            <span>{theme.title}</span>
            <Image
              onClick={() => onClick(theme)}
              src={theme.img}
              alt={theme.id}
              width={148}
              height={214}
            />
          </button>
        ))}
      </Slider>
    </div>
  );
};

export default RandomPin;
