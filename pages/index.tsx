import styles from '@/src/home.module.scss';
import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useCookies } from 'react-cookie';

// components
import NavBar from '@/src/_components/main/NavBar';
import { Map, Log, Likes, Chat } from '@/src/_components/main';
import Main from '@/src/_components/main/Main';
import RandomPin from '@/src/_components/main/RandomPin';
import ProfileDropdown from '@/src/_components/main/ProfileDropdown';

// api
import { useQuery } from '@tanstack/react-query';
import { getMe } from './api/user';

// atoms
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  alarmState,
  messageAlarmState,
  userState,
  randomPinState,
} from '@/src/atom/stats';
import { pageState } from '@/src/atom/stats';

// types
import { Alarm } from '@/src/types/aboutChat';
import Toast from '@/src/_components/Common/Toast';
import useToggle from '@/src/hooks/Home/useToggle';
import { getLog, getLogData } from './api/log';
import { decimalToDMS } from '@/src/_components/main/RandomPin/util';
import { RandomPinType } from '@/src/types/aboutMap';

const menu: { [key: string]: JSX.Element | null } = {
  home: <div></div>,
  map: <Map />,
  log: <Log />,
  likes: <Likes />,
  chat: <Chat />,
};

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  const [cookies, setCookies] = useCookies(['token']);
  const [fold, setFold] = useState<boolean>(false);
  const [page, setPage] = useRecoilState(pageState);
  const [element, setElement] = useState<React.JSX.Element | null>(menu[page]);
  const [pin, setPin] = useState<string>('pin_hide');
  const [alarm, setAlarm] = useRecoilState(alarmState);
  const setMessageAlarm = useSetRecoilState(messageAlarmState);
  const [randomPin, setRandomPin] = useRecoilState(randomPinState);
  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);
  useEffect(() => {
    setElement(menu[page]);
  }, [page]);

  const { data: userInfo, refetch: refetchUser } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: false,
    refetchInterval: 1000,
  });

  useEffect(() => {
    setIsClient(true); // 클라이언트 렌더링 시점에 상태 업데이트
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
      setInitial();
    }
  }, [isClient, userInfo, refetchUser]);

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
    if (cookies.token) {
      refetchUser();
    }
  }, [isClient, cookies]);

  // SSE 연결
  useEffect(() => {
    if (!isClient || user === undefined || user.email === '') return;
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const userId = user.userId;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_DEPLOY_SSE_ADDRESS}?userId=${userId}`,
      {
        headers: {
          Connection: 'keep-alive',
          Accept: 'text/event-stream',
        },
        heartbeatTimeout: 86400000, // 24시간
      }
    );

    if (!alarm) {
      eventSource.onmessage = (event) => {
        const { data: receivedData } = event;
        // console.log('event: ', event);

        if (
          receivedData.includes('roomId') &&
          receivedData.includes('content')
        ) {
          const alarmData: Alarm = JSON.parse(receivedData);
          setMessageAlarm(alarmData);
        }
        if (
          receivedData.includes('roomId') &&
          receivedData.includes('content') &&
          page !== 'chat'
        ) {
          setAlarm(true);
        }
      };
    }

    return () => {
      eventSource.close();
      // console.log('SSE CLOSED');
    };
  }, [isClient, user]);

  useEffect(() => {
    if (page === 'chat') {
      setAlarm(false);
    }
  }, [page, alarm]);

  return (
    <main className={styles.main}>
      <div id="modal-container"></div>
      {isClient &&
        user.userId > 0 && ( // 클라이언트 렌더링 시점에 쿠키를 확인
          <ProfileDropdown
            setFold={setFold}
            setPage={setPage}
            refetchUser={refetchUser}
            openToast={openToast}
          />
        )}
      <section className={fold ? styles.navBar : styles.pinSection}>
        {fold ? (
          <NavBar className={styles.navbar} setFold={setFold} />
        ) : (
          <div className={styles.sliderSection}>
            <div className={styles.slider}>
              <RandomPin setFold={setFold} setPage={setPage} setPin={setPin} />
            </div>
            <div className={styles.description}>
              <p className={styles.eng}>Tap for a Random Adventure</p>
              <p className={styles.kor}>
                원하는 테마를 골라 즐거운 여행을 경험해보세요!
              </p>
            </div>
          </div>
        )}
      </section>
      <section className={fold ? styles.page : styles.home}>
        {fold ? <>{element}</> : <Main pin={pin} />}
      </section>
      {user.userId > 0 && (
        <Toast
          content={'랜덤핀을 던져보세요!'}
          toast={toast}
          openToast={openToast}
          toastType="warning"
        />
      )}
    </main>
  );
};

export default Home;
