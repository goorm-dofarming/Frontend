import Card from '@/src/_components/Common/Card';
import styles from './map.module.scss';
import { useEffect, useRef, useState } from 'react';
import { pageState, randomPinState, userState } from '@/src/atom/stats';
import { useRecoilState } from 'recoil';
import { DataType, Recommend, RandomPinType } from '@/src/types/aboutMap';
import { makeCustomOverlay, makeInfoWindow } from './utils';
import Modal from '../../Common/Modal';
import PlaceInfo from '../modal/review/PlaceInfo';
import useToggle from '@/src/hooks/Home/useToggle';
import Toast from '@/src/_components/Common/Toast';
import { getLog, getLogData } from '@/pages/api/log';
import { decimalToDMS } from '../RandomPin/util';
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_SDK}&autoload=false&libraries=services`;

const Map = () => {
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
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);
  const container = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
  const [user, setUser] = useRecoilState(userState);
  const [selectedLocation, setSelectedLocation] = useState<Recommend | null>(
    null
  );

  const refetch = async () => {
    //after like button click
    const logResponse = await getLogData(randomPin.logId);
    if (logResponse.status === 200) {
      setRandomPin((prev) => ({
        ...prev,
        recommends: [...logResponse.data.recommendations],
      }));
    }
  };
  const onClickShareBtn = () => {
    if (user.userId === 0) {
      openToast();
      return;
    }
    navigator.clipboard.writeText(`${window.location}tours/${randomPin.logId}`);
    openToast();
  };
  const onClickCard = (recommend: Recommend) => {
    setFocusPin(recommend);
    setSelectedLocation(recommend);
    setTimeout(() => {
      openModal();
    }, 1000);
  };
  const setInitial = async () => {
    const response = await getLog();
    // console.log("get logs", response.data);
    if (response.status === 200) {
      const data = response.data;
      if (!data.length) {
        return;
      }
      const logResponse = await getLogData(data[0].logId);
      if (logResponse.status === 200) {
        const logData = logResponse.data.logResponse;
        let recommendList = logResponse.data.recommendations;
        if (logData.theme === 'ocean' || logData.theme === 'mountain') {
          recommendList = recommendList.slice(1);
        }
        const { latDMS, lngDMS } = decimalToDMS(
          logData.latitude,
          logData.longitude
        );
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
  };

  useEffect(() => {
    if (user.userId > 0 && randomPin.logId === 0) {
      setInitial();
    }
  }, [randomPin]);
  useEffect(() => {
    document.cookie = 'username=dofarming; SameSite=Strict; Secure';
    const script = document.createElement('script');
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

        const content = document.createElement('div');
        content.innerHTML = makeCustomOverlay(randomPin);

        content
          .querySelector('#share-link')
          ?.addEventListener('click', onClickShareBtn);
        content
          .querySelector('#share-kakaotalk')
          ?.addEventListener('click', onClickShareBtn);

        const customOverlay = new window.kakao.maps.CustomOverlay({
          // map: map,
          position: center,
          content: content,
          yAnchor: 1.4,
          xAnchor: -0.2,
        });
        setCustomOverlay(customOverlay as any);
        window.kakao.maps.event.addListener(marker, 'click', function () {
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

          window.kakao.maps.event.addListener(pin, 'click', function () {
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
            key={recommend.locationId + index}
            recommend={recommend}
            refetch={refetch}
            onClick={() => onClickCard(recommend)}
          />
        ))}
      </div>
      <Modal openModal={openModal} modal={modal} width="51rem" height="46rem">
        <PlaceInfo
          openModal={openModal}
          locationId={
            selectedLocation?.locationId ? selectedLocation?.locationId : 0
          }
          refetch={refetch}
        />
      </Modal>
      {user.userId === 0 && (
        <Toast
          content={'로그인하여 더 많은 기능을 이용해 보세요 !'}
          toast={toast}
          openToast={openToast}
        />
      )}
      {user.userId > 0 && (
        <Toast
          content={'링크가 클립보드에 복사되었습니다. 친구와 쉽게 공유하세요!'}
          toast={toast}
          openToast={openToast}
          toastType="success"
        />
      )}
    </main>
  );
};

export default Map;
