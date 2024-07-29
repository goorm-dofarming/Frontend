import React, { useEffect, useRef, useState } from 'react';

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { pageState } from '@/src/atom/stats';

// types
import { logDataType, recommendsType } from '@/src/types/aboutLog';

// img
import Card from '../Common/Card';
import Logo from '@/src/_assets/icons/main_logo.jpg';

// apis
import { getLog, getLogData } from '@/pages/api/log';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=99910be829a7c9c364bbf190aaf02972&autoload=false&libraries=services`;

const Log = () => {
  // 위치 이동
  const [location, setLocation] = useState({
    latitude: 36.34, // default latitude
    longitude: 127.77, // default longitude
    level: 13,
  });
  // 페이지 이동 감지
  const page = useRecoilValue(pageState);
  // kakao map dom 컨트롤
  const containerRef = useRef<HTMLElement>(null);

  // 전체 로그 데이터
  const [logData, setLogData] = useState<logDataType[]>([
    {
      logId: 0,
      userId: 0,
      theme: '',
      address: '',
      latitude: '',
      longitude: '',
      createdAt: '',
      status: false,
    },
  ]);

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
    },
  ]);

  // 전체 로그 데이터 불러오기
  const getLogs = useQuery({
    queryKey: ['getLogs'],
    queryFn: async () => {
      const response = await getLog();

      // console.log('get logs', response.data);

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

  useEffect(() => {
    getLogs.refetch();
  }, [page]);

  useEffect(() => {
    document.cookie = 'username=dofarming; SameSite=Strict; Secure';
    const script = document.createElement('script');
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

        const imageSrc = 'http://54.180.126.49/images/pin/pin_location.png';
        const imageSize = new window.kakao.maps.Size(60, 80); // 마커이미지의 크기입니다
        const imageOption = {
          offset: new window.kakao.maps.Point(0, 0),
        }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        for (let i = 0; i < selectedLogData.length; i++) {
          let imageSize = new kakao.maps.Size(24, 35);

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

          // 마커 객체에 title 속성을 추가합니다
          marker.title = selectedLogData[i].title;

          const imageContent = selectedLogData[i].image
            ? selectedLogData[i].image
            : Logo;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:200px;height:200px;text-align:center;padding:6px 0;borderRadius:0.3rem;border:none;"><div>${selectedLogData[i].title.length > 15 ? selectedLogData[i].title.slice(0, 14) + '...' : selectedLogData[i].title}</div><div><img src=${imageContent} alt="사진" style="width:200px;height:190px;"/></div></div> `,
          });

          window.kakao.maps.event.addListener(
            marker,
            'mouseover',
            makeOverListener(map, marker, infowindow)
          );
          window.kakao.maps.event.addListener(
            marker,
            'mouseout',
            makeOutListener(infowindow)
          );
        }
      });

      function makeOverListener(
        map: kakao.maps.Map,
        marker: kakao.maps.Marker,
        infowindow: any
      ) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      function makeOutListener(infowindow: any) {
        return function () {
          infowindow.close();
        };
      }
    };
  }, [selectedLogData]);

  useEffect(() => {
    // console.log('selected log data: ', selectedLogData);
    console.log('selected log data: ', selectedLogData);
    console.log('logData : ', logData);
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
              <div className="logAddress">주소</div>
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
