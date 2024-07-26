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
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRecoilValue } from 'recoil';
import { pageState } from '@/src/atom/stats';

// types
import {
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
  // 페이지 이동 감지
  const page = useRecoilValue(pageState);
  // Map DOM 컨트롤
  const mapRef = useRef<MapRef>(null);

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
  }, [selectedLogData, logData]);

  useEffect(() => {
    getLogs.refetch();
  }, [page]);

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
              <div className="logDate">{data.createdAt.split('T')[0]}</div>
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
            latitude: 36.34,
            longitude: 127.77,
            zoom: 5,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/light-v9"
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
                <Card recommend={recommend} />
              </div>
            ))}
        </main>
      </div>
    </LogContainer>
  );
};

export default Log;
