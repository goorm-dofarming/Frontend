import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// types
import {
  locationType,
  logDataType,
  logTestDataType,
  recommendsType,
} from '@/src/types/aboutLog';

// img
import Card from '../Common/Card';
import Pin from '@/src/_assets/main/map/pin_location.svg';

// apis
import { getLog, getLogData } from '@/pages/api/log';

// constants
const Log = () => {
  const [location, setLocation] = useState<locationType>({
    latitude: 0,
    longitude: 0,
  });

  const { latitude, longitude } = location;
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

      console.log('get logs', response.data);

      if (response.status === 200) {
        setLogData(response.data);
      }
      return response.data;
    },
  });

  const getLogSubData = useMutation({
    mutationFn: async (logId: number) => {
      const response = await getLogData(logId);
      console.log('get log data', response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setSelectedLogData(data);
    },
  });

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

  useEffect(() => {
    console.log('selected log data: ', selectedLogData);
  }, [selectedLogData]);

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
              console.log(data);
              getLogSubData.mutate(data.logId);
              setLocation({
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
          mapboxAccessToken={process.env.NEXT_PUBLIC_REACT_MAP_GL_ACCESS_TOKEN}
          initialViewState={{
            longitude: 127.77,
            latitude: 36.34,
            zoom: 5,
          }}
          style={{ width: 400, height: 400 }}
          mapStyle="mapbox://styles/mapbox/light-v9"
          interactiveLayerIds={['data']}
        >
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
