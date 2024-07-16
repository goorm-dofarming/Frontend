"use client";
import React, { SetStateAction, useState } from "react";
import Image from "next/image";
import styles from "./randomPin.module.scss";

import pin_random from "@/app/_assets/main/map/pin_random.svg";
import pin_food from "@/app/_assets/main/map/pin_food.svg";
import pin_cafe from "@/app/_assets/main/map/pin_cafe.svg";
import pin_tour from "@/app/_assets/main/map/pin_tour.svg";
import pin_mountain from "@/app/_assets/main/map/pin_mountain.svg";
import pin_ocean from "@/app/_assets/main/map/pin_ocean.png";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";

const themes = [
  { id: "random", img: pin_random, title: "랜덤" },
  { id: "food", img: pin_food, title: "식도락" },
  { id: "cafe", img: pin_cafe, title: "카페 투어" },
  { id: "tour", img: pin_tour, title: "관광지" },
  { id: "ocean", img: pin_ocean, title: "바다" },
  { id: "mountain", img: pin_mountain, title: "산" },
];
const RandomPin = ({
  setFold,
  setPage,
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [theme, setTheme] = useState("random");
  const onClick = () => {
    //랜덤핀 클릭시 api
    setFold(true);
    setPage("map");
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

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {themes.map((theme) => (
          <button key={theme.id} className={styles.pin}>
            <span>{theme.title}</span>
            <Image
              onClick={onClick}
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
