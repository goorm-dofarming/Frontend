import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import Map, {
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// types
import {
  locationType,
  logDataType,
  onSelectCityType,
  recommendsType,
} from '@/src/types/aboutLog';

// img
import Card from '../Common/Card';
import Pin from '@/src/_assets/main/map/pin_location.svg';

// apis
import { getLog, getLogData } from '@/pages/api/log';

// constants
const Log = () => {
  // Map DOM 컨트롤
  const mapRef = useRef<MapRef>(null);

  // 변경된 위치
  const [location, setLocation] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });

  // 초기 상태
  const [viewState, setViewState] = useState({
    latitude: 36.34,
    longitude: 127.77,
    zoom: 5,
  });

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

  // test log data
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

  // 지도 핀
  const Pins = () => (
    <>
      {selectedLogData.map((data, i) => (
        <Marker
          key={i}
          latitude={data.mapY}
          longitude={data.mapX}
          anchor="bottom"
          onClick={() => console.log(data)}
        >
          <Image src={Pin} alt="핀" width={20} height={20} />
        </Marker>
      ))}
    </>
  );

  // 맵 위치 이동
  const onSelectCity = useCallback(
    ({ longitude, latitude }: onSelectCityType) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 9,
      });
    },
    []
  );

  useEffect(() => {
    console.log('selected log data: ', selectedLogData);
    console.log('logData : ', logData);
    console.log('viewState : ', viewState);
  }, [selectedLogData, logData, viewState]);

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
              onSelectCity({
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
              });
            }}
          >
            <div className="log">
              <div className="logDate">{data.createdAt}</div>
              <div className="logAddress">주소</div>
              <div className="logTheme">{data.theme}</div>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <div className="logContent">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_REACT_MAP_GL_ACCESS_TOKEN}
          initialViewState={{
            longitude: viewState.longitude,
            latitude: viewState.latitude,
            zoom: viewState.zoom,
          }}
          style={{ width: 600, height: 600 }}
          mapStyle="mapbox://styles/mapbox/light-v9"
          interactiveLayerIds={['data']}
        >
          <GeolocateControl position="top-left" />
          <NavigationControl position="top-left" />
          <Pins />
        </Map>
      </div>
      <div className="logSideContent">
        <header></header>
        <main>
          {selectedLogData.length > 0 &&
            selectedLogData.map((recommend, i) => (
              <div key={i} className="Container">
                <Card
                  // id={recommend.id}
                  // imgUrl={require('@/src/_assets/main/log/log_img.svg')}
                  // name={recommend.storeName}
                  // type={recommend.sorts}
                  // location={recommend.address}
                  // phone={recommend.phone}
                  recommend={recommend}
                />
              </div>
            ))}
        </main>
      </div>
    </LogContainer>
  );
};

export default Log;
