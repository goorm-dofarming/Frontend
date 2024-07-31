import React, { useEffect, useRef, useState } from "react";

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logEntireData, pageState } from '@/src/atom/stats';


// types
import { logDataType, recommendsType } from "@/src/types/aboutLog";

// img
import Card from '../Common/Card';

// apis
import { getLog, getLogData } from '@/pages/api/log';
import { StaticImageData } from 'next/image';
import { pinType } from '@/src/constatns/PinSort';
import { makeInfoWindow } from './Map/utils';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=99910be829a7c9c364bbf190aaf02972&autoload=false&libraries=services,clusterer`;


const Log = () => {
  // 위치 이동
  const [location, setLocation] = useState({
    latitude: 35.95, // default latitude
    longitude: 128.25, // default longitude
    level: 13, // 14 레벨부터 지도가 끊김
  });
  // 페이지 이동 감지
  const page = useRecoilValue(pageState);
  // kakao map dom 컨트롤
  const containerRef = useRef<HTMLElement>(null);

  // 전체 로그 데이터
  const [logData, setLogData] = useRecoilState<logDataType[]>(logEntireData);

  // 선택된 로그 데이터들
  const [selectedLogData, setSelectedLogData] = useState<recommendsType[]>([
    {
      id: 0,
      title: '',
      addr: '',
      dataType: 1,
      tel: '',
      image: '',
      mapX: 0,
      mapY: 0,
      countLikes: 0,
      liked: false,
    },
  ]);

  // 전체 로그 데이터 불러오기
  const getLogs = useQuery({
    queryKey: ['getLogs'],
    queryFn: async () => {
      const response = await getLog();

      console.log('get logs', response.data);

      if (response.status === 200) {
        setLogData(response.data);
      }
      return response.data;
    },
  });

  // 로그 하위 데이터 불러오기
  const getLogSubData = useMutation({
    mutationFn: async (logId: number) => {
      const response = await getLogData(logId);
      // console.log('get log data', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setSelectedLogData(data);
    },
  });

  // 이미지 URL을 문자열로 변환하는 함수
  const getImageSrc = (img: StaticImageData | string): string => {
    if (typeof img === "string") {
      return img;
    } else {
      return img.src;
    }
  };

  // 종류에 따른 핀 설정
  const sortingPins = (dataType: number): string => {
    const pin = pinType.find((type) => type.dataType === dataType);
    return pin ? getImageSrc(pin.img) : "null";
  };

  useEffect(() => {
    getLogs.refetch();
  }, []);

  useEffect(() => {
    document.cookie = "username=dofarming; SameSite=Strict; Secure";
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude
        );
        const options = {
          center,
          level: location.level,
        };
        const map = new window.kakao.maps.Map(containerRef.current, options);

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 5, // 클러스터 할 최소 지도 레벨
        });

        const imageSrc = `http://${process.env.NEXT_PUBLIC_DEPLOY}/images/pin/pin_location.png`;
        const imageSize = new window.kakao.maps.Size(24, 32); // 마커이미지의 크기입니다
        const imageOption = {
          offset: new window.kakao.maps.Point(0, 0),
        }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const markers = [];

        for (let i = 0; i < logData.length; i++) {
          let marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(
              Number(logData[i].latitude),
              Number(logData[i].longitude)
            ), // 마커를 표시할 위치
            image: markerImage, // 마커 이미지
          });

          markers.push(marker);

          window.kakao.maps.event.addListener(
            marker,
            "click",
            makeClickListener(logData[i])
          );
        }

        // 지도의 확대/축소 레벨을 제한하는 함수 추가
        window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
          var level = map.getLevel();
          if (level > 13) {
            map.setLevel(13);
            setLocation((prev) => ({
              ...prev,
              latitude: 35.95, // default latitude
              longitude: 128.25, // default longitude
            }));
          }
        });

        for (let i = 0; i < selectedLogData.length; i++) {
          let imageSize = new kakao.maps.Size(24, 35);

          let imageSrc = sortingPins(selectedLogData[i].dataType);

          // 마커 이미지를 생성합니다
          let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          // 마커를 생성합니다
          let marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(
              selectedLogData[i].mapY,
              selectedLogData[i].mapX
            ), // 마커를 표시할 위치
            image: markerImage, // 마커 이미지
          });

          const latlng = new kakao.maps.LatLng(
            selectedLogData[i].mapY,
            selectedLogData[i].mapX
          );

          // 마커 객체에 title 속성을 추가합니다
          marker.title = selectedLogData[i].title;

          const infowindowContent = makeInfoWindow(selectedLogData[i].title);

          const infowindow = new window.kakao.maps.CustomOverlay({
            map: null, // 초기에는 null로 설정하여 오버레이를 숨깁니다
            clickable: true,
            position: latlng,
            content: infowindowContent,
            yAnchor: 2.15,
            xAnchor: 0.5,
          });

          let infowindowVisible = false; // 인포윈도우 표시 상태를 추적하는 변수

          window.kakao.maps.event.addListener(marker, 'click', () => {
            if (infowindowVisible) {
              infowindow.setMap(null); // 인포윈도우 숨기기
              infowindowVisible = false;
            } else {
              infowindow.setMap(map); // 인포윈도우 표시하기
              infowindowVisible = true;
            }
          });
        }
        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);
      });

      function makeClickListener(data: logDataType) {
        return function () {
          const logData = getLogSubData.mutate(data.logId);
          setLocation({
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            level: 8,
          });
        };
      }
    };
  }, [selectedLogData, logData, location]);

  useEffect(() => {
    // console.log('selected log data: ', selectedLogData);
    console.log("selected log data: ", selectedLogData);
    console.log("logData : ", logData);
  }, [logData, selectedLogData]);

  return (
    <LogContainer>
      <div className="logContainer">
        <h3>
          <span>전체 기록</span>
        </h3>
        {logData.map((data, i) => (
          <div
            key={i}
            style={{ marginBottom: '0.4rem' }}
            onClick={() => {
              getLogSubData.mutate(data.logId);
              setLocation({
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                level: 8,
              });
            }}
          >
            <div className="log">
              <div className="logDate">{data.createdAt.split('T')[0]}</div>
              <div className="logAddress">{data.address}</div>
              <div className="logTheme">{data.theme}</div>
            </div>
            {/* 색상 좀 연하게 + border-bottom로 변경 */}
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <div className="logContent">
        <section id="container" ref={containerRef} className="kakaoMap" />
      </div>
      <div className="logSideContent">
        <header></header>
        <main>
          {selectedLogData.length > 0 &&
            selectedLogData.map((recommend, i) => (
              <div key={i} className="Container">
                <Card recommend={recommend} />
              </div>
            ))}
        </main>
      </div>
    </LogContainer>
  );
};

export default Log;
