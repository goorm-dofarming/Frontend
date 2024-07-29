import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

// styles
import { LogContainer } from '@/src/_styles/main/logStyles';

// libraries
import { useMutation, useQuery } from '@tanstack/react-query';
import Map, {
  GeolocateControl,
  Layer,
  MapRef,
  GeoJSONSource,
  Marker,
  NavigationControl,
  Source,
  MapMouseEvent,
  Popup,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRecoilValue } from 'recoil';
import { pageState } from '@/src/atom/stats';
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from './log/cluster';

// types
import {
  GeoJsonData,
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
import { pinType } from '@/src/constatns/PinSort';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=99910be829a7c9c364bbf190aaf02972&autoload=false&libraries=services`;

const Log = () => {
  // geoJson data
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData>({
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
      },
    },
    features: [
      {
        type: 'Feature',
        properties: {
          id: 0,
          mag: 2.3,
          time: '',
          felt: null,
          tsunami: 0,
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
      },
    ],
  });
  // 페이지 이동 감지
  const page = useRecoilValue(pageState);
  // Map DOM 컨트롤
  const mapRef = useRef<MapRef>(null);
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

  // 선택된 로그 데이터
  const [selectedPinData, setSelectedPinData] = useState<number>(0);

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

  // 종류에 따른 핀 설정
  const sortingPins = (dataType: number): StaticImageData | string => {
    const pin = pinType.find((type) => type.dataType === dataType);
    return pin ? pin.img : 'null';
  };

  // 지도 핀
  const Pins = () => (
    <>
      {selectedLogData.map((data, i) => (
        <Marker
          key={i}
          latitude={data.mapY}
          longitude={data.mapX}
          anchor="bottom"
          onClick={() => {
            console.log(data);
            setSelectedPinData(data.id);
          }}
        >
          <Image
            src={sortingPins(data.dataType)}
            alt="핀"
            width={35}
            height={35}
          />
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

  // 단일 개체 클릭 시 정보 불러오기
  const showSingleCluster = (event: MapMouseEvent) => {
    console.log('event: ', event);

    if (!event.features) {
      return;
    }

    const feature = event.features[0];
    console.log('단일 개체 조회 성공: ', feature);

    if (feature !== undefined) {
      const clusterId = feature.properties?.id;
      console.log('clusterId: ', clusterId);

      if (!isNaN(clusterId)) {
        getLogSubData.mutate(clusterId);
      }
    }
  };

  // 클러스터 줌인
  const zoomInCluster = (event: MapMouseEvent) => {
    console.log('event: ', event);

    if (!event.features) {
      return;
    }

    const feature = event.features[0];
    if (feature.id !== undefined) {
      console.log('feature: ', feature);

      const clusterId = feature.properties?.cluster_id;

      const mapboxSource = mapRef.current?.getSource(
        'earthquakes'
      ) as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || zoom === null) {
          return;
        }

        if (!feature.geometry || !('coordinates' in feature.geometry)) {
          return;
        }

        mapRef.current?.easeTo({
          center: feature.geometry.coordinates as [number, number],
          zoom,
          duration: 500,
        });
      });
    }
  };

  useEffect(() => {
    getLogs.refetch();
  }, [page]);

  // geoJson Data
  useEffect(() => {
    if (logData.length > 0) {
      const geoJsonData = {
        type: 'FeatureCollection',
        crs: {
          type: 'name',
          properties: {
            name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
          },
        },
        features: logData.map((data) => ({
          type: 'Feature',
          properties: {
            id: data.logId,
            time: data.createdAt,
            mag: 0,
            felt: null,
            tsunami: 0,
          },
          geometry: {
            type: 'Point',
            coordinates: [Number(data.longitude), Number(data.latitude)],
          },
        })),
      };
      setGeoJsonData(geoJsonData);
    }
  }, [logData]);

  // 현재 위치의 클러스터 아이디 get
  const handleMapClick = (event: any) => {
    const map = mapRef.current?.getMap();
    const features = map?.queryRenderedFeatures(event.point, {
      layers: ['clusters', 'unclustered-point'], // 클릭 이벤트를 처리할 레이어 ID
    });

    if (features && features[0]?.id !== undefined) {
      console.log('여러 개체가 있을 때 클릭 이벤트: ', features);
      zoomInCluster({ ...event, features });
    } else {
      const feature = map?.queryRenderedFeatures(event.point, {
        layers: ['clusters', 'unclustered-point'],
      });
      console.log('단일 개체만 있을 때 클릭 이벤트: ', feature);
      showSingleCluster({ ...event, features: feature });
    }
  };

  useEffect(() => {
    document.cookie = 'username=dofarming; SameSite=Strict; Secure';
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(36.34, 127.77);
        const options = {
          center,
          level: 13,
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

        // const marker = new window.kakao.maps.Marker({
        //   map: map,
        //   position: center,
        //   image: markerImage,
        // });

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
            title: selectedLogData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${selectedLogData[i].title}</div>`,
          });
        }
      });
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
