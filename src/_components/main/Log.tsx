import React, { useEffect, useRef, useState } from 'react';

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { logEntireData, pageState ,logMapState} from '@/src/atom/stats';

// types
import { logDataType, recommendsType } from '@/src/types/aboutLog';

// img
import Card from '../Common/Card';

// apis
import { getLog, getLogData } from '@/pages/api/log';
import { StaticImageData } from 'next/image';
import { pinType } from '@/src/constatns/PinSort';
import { makeInfoWindow } from './Map/utils';
import useToggle from '@/src/hooks/Home/useToggle';
import Modal from '../Common/Modal';
import PlaceInfo from './modal/review/PlaceInfo';
import { DataType } from '@/src/types/aboutMap';
import { clustererStyle } from './log/cluster';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_SDK}&autoload=false&libraries=clusterer`;

const Log = () => {
  // const [kakaoMap, setKakaoMap] = useRecoilState<kakao.maps.Map | null>(logMapState);
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null);
  // 위치 이동
  const [location, setLocation] = useState({
    latitude: 35.95, // default latitude
    longitude: 128.25, // default longitude
    level: 13, // 14 레벨부터 지도가 끊김
  });

  // 클릭된 로그 판별
  const [selectedLogIndex, setSelectedLogIndex] = useState<number | null>(null);

  // kakao map dom 컨트롤
  const containerRef = useRef<HTMLElement>(null);

  // 전체 로그 데이터
  const [logData, setLogData] = useRecoilState<logDataType[]>(logEntireData);

  // 선택된 로그 데이터들
  const [selectedLogData, setSelectedLogData] = useState<recommendsType[]>([
  ]);
  const [pins, setPins] = useState<any[]>([]);
  const [infoWindows, setInfoWindows] = useState<any[]>([]);
  const [markers,setMarkers] = useState<any[]>([]);
  // 로그 아이디
  const [logId, setLogId] = useState<number>(0);

  // 카드 클릭 시 정보 모달
  const [modal, setModal] = useState<boolean>(false);
  const openModal = useToggle(modal, setModal);
  const [selectedLocationId, setSelectedLocationId] = useState<number>(0);

  // 전체 로그 데이터 불러오기

  const getLogs = async()=>{
    const response = await getLog();
    // console.log("get logs", response.data);
    const data= response.data;
    if (response.status === 200) {
      setLogData(data);
    }
  }
  // const getLogs = useQuery({
  //   queryKey: ['getLogs'],
  //   queryFn: async () => {
  //     const response = await getLog();
  //     // console.log("get logs", response.data);
  //     const data= response.data;
  //     if (response.status === 200) {
  //       setLogData(data);
  //     }
  //     return response.data;
  //   },
  // });

  useEffect(() => {
    // getLogs.refetch();
    getLogs();
  },[]);

  useEffect(()=>{
    if(logData.length>0){
      getLogSubData.mutate(logData[0].logId);
      setSelectedLogIndex(logData[0].logId);
    }
  },[logData])
  
  // 로그 하위 데이터 불러오기
  const getLogSubData = useMutation({
    mutationFn: async (logId: number) => {
      if(logId===0){ return [];}
      const response = await getLogData(logId);
      console.log("hi", logId);
      // console.log('get log data!!', response.data);
      // console.log(response);
      
      return response.data.recommendations;
    },
    onSuccess: (data) => {
      setSelectedLogData(data);
      ;
    },
    onError:()=>{
      console.log("get log data error");
    }
  });

  // 이미지 URL을 문자열로 변환하는 함수
  const getImageSrc = (img: StaticImageData | string): string => {
    if (typeof img === 'string') {
      return img;
    } else {
      return img.src;
    }
  };


  // 카드 클릭 시 정보 모달
  const onClickCard = (locationId: number) => {
    setSelectedLocationId(locationId);
    openModal();
  };



  useEffect(() => {
    if(selectedLogData.length===0){
      return;
    }
    // document.cookie = 'username=dofarming; SameSite=Strict; Secure';
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    // script.async = true;
    script.id = 'kakao_sdk_script';

    const prev=document.getElementById('kakao_sdk_script');
    if (prev===null) {
      document.head.appendChild(script);
    }else{
      document.head.removeChild(prev);
      document.head.appendChild(script);
    }
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(
          // location.latitude,
          // location.longitude
          35.95, 128.125
        );
        const options = {
          center,
          level: 13,
        };
        let map:any;

        if ( containerRef.current !== null && kakaoMap === null) {
          console.log("null!!!!!!!");
          const mapContainer = document.getElementById('logMapContainer');
          map = new window.kakao.maps.Map(mapContainer, options);
          map.setMaxLevel(13);
          
        }else{
          map=kakaoMap;
          console.log("nullXXXXXXXX!!!!!!!");
        }
        
        if (!window.kakao.maps.MarkerClusterer) {
          console.log('MarkerClusterer 로드 실패');
          // return;
        }
        if(markers.length===0){
        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel: 5, // 클러스터 할 최소 지도 레벨
          ...clustererStyle,
          
        });

        const imageSrc = `http://${process.env.NEXT_PUBLIC_DEPLOY}/images/pin/pin_location.png`;
        const imageSize = new window.kakao.maps.Size(36, 48); // 마커이미지의 크기입니다
        const imageOption = {
          offset: new window.kakao.maps.Point(0, 0),
        }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          // imageOption
        );

        const new_markers = [];

        for (let i = 0; i < logData.length; i++) {
          let marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(
              Number(logData[i].latitude),
              Number(logData[i].longitude)
            ), // 마커를 표시할 위치
            image: markerImage, // 마커 이미지
          });

          new_markers.push(marker);

          window.kakao.maps.event.addListener(
            marker,
            'click',
            makeClickListener(logData[i])
          );
        }
        clusterer.addMarkers(new_markers);
        setMarkers([...new_markers]);
      }

        if(pins.length > 0 && infoWindows.length>0){
          for(let i=0;i<pins.length;i++){
            pins[i].setMap(null);
            infoWindows[i].setMap(null);
          }
        }
        const new_pins = [];
        const new_infoWindows = [];
        for (let i = 0; i < selectedLogData.length; i++) {
          let imageSize = new kakao.maps.Size(36, 48);

          let imageSrc =DataType[selectedLogData[i].dataType].img
          
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
          new_pins.push(marker);
          new_infoWindows.push(infowindow);
        }
        setPins([...new_pins]);
        setInfoWindows([...new_infoWindows]);
        
        // 클러스터러에 마커들을 추가합니다
        
        setKakaoMap(map);
      });

      function makeClickListener(data: logDataType) {
        return function () {
          const logData = getLogSubData.mutate(data.logId);
          setSelectedLogIndex(data.logId);
          setLocation({
            level: 8,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          });
          
        };
      }
      
    };
    script.addEventListener('load', onLoadKakaoMap);


  }, [selectedLogData]);
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    if( location.latitude ===35.95 && location.longitude=== 128.25){
        return;
      }
    const center = new window.kakao.maps.LatLng(location.latitude, location.longitude);
    console.log("kakaoMap",kakaoMap);
    kakaoMap.setLevel(6);
    kakaoMap.setCenter(center);
    kakaoMap.relayout();
  }, [kakaoMap,location]);
  return (
    <LogContainer>
      <div className="logContainer">
        <h3>
          <span>전체 기록</span>
        </h3>
        {logData.map((data, i) => (
          <div
            key={data.logId}
            style={{ marginBottom: '0.4rem' }}
            onClick={() => {
              getLogSubData.mutate(data.logId);
              setLocation({
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                level: 8,
              });
              setSelectedLogIndex(data.logId);
              setLogId(data.logId);
            }}
          >
            <div
              className={`${selectedLogIndex ===  data.logId? 'log_selected' : 'log'}`}
            >
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
        <section id="logMapContainer" ref={containerRef} className="kakaoMap" />
      </div>
      <div className="logSideContent">
        <header></header>
        <main>
          {selectedLogData.length > 0 &&
            selectedLogData.map((recommend, i) => (
              <div key={i} className="Container">
                <Card
                  recommend={recommend}
                  refetch={() => getLogSubData.mutate(logId)}
                  onClick={() => onClickCard(recommend.locationId)}
                />
              </div>
            ))}
        </main>
      </div>
      <Modal openModal={openModal} modal={modal} width="51rem" height="46rem">
        <PlaceInfo
          openModal={openModal}
          locationId={selectedLocationId}
          refetch={() => getLogSubData.mutate(logId)}
        />
      </Modal>
    </LogContainer>
  );
};

export default Log;
