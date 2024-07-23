import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// types
import {
  locationType,
  logDataType,
  logTestDataType,
} from '@/src/types/aboutLog';

// img
import Profile from '@/src/_assets/main/userProfile.svg';
import Card from '../Common/Card';
import Pin from '@/src/_assets/main/map/pin_location.svg';

// constants
import { pinData } from '@/src/constatns/pinEamplet';

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
      createAt: '',
      status: false,
    },
  ]);
  // 테스트 전체 로그 데이터
  const [testLogData, setTestLogData] = useState<logTestDataType[]>([
    {
      address: '',
      createAt: '',
      recommends: [
        {
          address: '',
          id: 0,
          location: '',
          latitude: 0,
          longitude: 0,
          sorts: '',
          storeName: '',
          phone: '',
        },
      ],
      theme: '',
    },
  ]);

  // test log data
  const [selectedLogData, setSelectedLogData] = useState<logTestDataType>({
    address: '',
    createAt: '',
    recommends: [
      {
        address: '',
        id: 0,
        location: '',
        latitude: 0,
        longitude: 0,
        sorts: '',
        storeName: '',
        phone: '',
      },
    ],
    theme: '',
  });

  const getLogs = useQuery({
    queryKey: ['getLogs'],
    queryFn: async () => {
      const response = await axios.get('/logs');

      console.log('get logs', response);

      if (response.status === 200) {
        setTestLogData(response.data);
      }
      return response.data;
    },
  });

  const Pins = () => (
    <>
      {selectedLogData.recommends.map((data, i) => (
        <Marker
          key={i}
          latitude={data.latitude}
          longitude={data.longitude}
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
        {testLogData.map((data, i) => (
          <div
            key={i}
            style={{ marginBottom: '0.4rem' }}
            onClick={() => setSelectedLogData(data)}
          >
            <div className="log">
              <div className="logDate">{data.createAt}</div>
              <div className="logAddress">{data.address}</div>
              <div className="logTheme">{data.theme}</div>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <div className="logContent">
        1
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
        <header>
          <div className="logoContainer">
            <Image src={Profile} alt="프로필" width={35} height={35} />
          </div>
        </header>
        <main>
          {selectedLogData.recommends.length > 0 &&
            selectedLogData.recommends.map((recommend, i) => (
              <div key={i} className="Container">
                <Card
                  id={recommend.id}
                  imgUrl={require('@/src/_assets/main/log/log_img.svg')}
                  name={recommend.storeName}
                  type={recommend.sorts}
                  location={recommend.address}
                  phone={recommend.phone}
                />
              </div>
            ))}
        </main>
      </div>
    </LogContainer>
  );
};

export default Log;
