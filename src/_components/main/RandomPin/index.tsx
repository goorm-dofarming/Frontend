import React, { MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import styles from './randomPin.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { getRandomCoord, decimalToDMS } from './util';
import {
  getMountainRecommends,
  getOceanRecommends,
  getRandomRecommends,
  getThemeRecommends,
} from '@/pages/api/map';
import { themes, Theme } from '@/src/types/aboutMap';
import { useRecoilState } from 'recoil';
import { randomPinState } from '@/src/atom/stats';
import { RandomPinType } from '@/src/types/aboutMap';
import { useCookies } from 'react-cookie';
import cx from 'classnames';
import Toast from '../../Common/Toast';
import useToggle from '@/src/hooks/Home/useToggle';

const RandomPin = ({
  setFold,
  setPage,
  setPin,
}: {
  setFold: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPin: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [cookies] = useCookies(['token']);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [showMsg, setShowMsg] = useState(false);

  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);

  const getResponse = async (theme: Theme) => {
    try {
      let response: any;
      if (theme.id === 'Ocean' || theme.id === 'Mountain') {
        response =
          theme.id === 'Ocean'
            ? await getOceanRecommends()
            : await getMountainRecommends();
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
        if (theme.id === 'Random') {
          response = await getRandomRecommends(lng, lat);
        } else {
          response = await getThemeRecommends(lng, lat, theme.themeId);
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
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>, theme: Theme) => {
    e.stopPropagation();
    setPin('pin_show');
    setPage('map');
    setTimeout(() => {
      setPin('pin_hide');
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
          style={{ ...style, width: '40px', height: '40px', zIndex: '1' }}
          fontSize={'40px'}
          fill="white"
          onClick={cookies.token ? onClick : openToast}
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
          style={{ ...style, width: '40px', height: '40px' }}
          fontSize={'40px'}
          fill="white"
          onClick={cookies.token ? onClick : openToast}
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
      {!cookies.token && (
        <Toast
          content={'로그인하여 더 많은 테마를 이용해 보세요 !'}
          toast={toast}
          openToast={openToast}
        />
      )}
    </div>
  );
};

export default RandomPin;
