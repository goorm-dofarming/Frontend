import styles from '@/src/home.module.scss';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { useRecoilState } from 'recoil';
import { alarmState, userState } from '@/src/atom/stats';
import { pageState } from '@/src/atom/stats';

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

  useEffect(() => {
    setElement(menu[page]);
    console.log('page', page);
  }, [page]);

  const { data: userInfo, refetch: refetchUser } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: false,
  });

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
      console.log('set user', userInfo);
    }
  }, [userInfo, refetchUser]);

  useEffect(() => {
    if (cookies.token) {
      refetchUser();
    }
  }, [cookies]);

  // SSE 연결
  useEffect(() => {
    if (user === undefined || user.email === '') return;
    console.log('user: ', user);
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

    // if (!alarm) {
    eventSource.onmessage = (event) => {
      const { data: receivedData } = event;
      console.log('ReceivedData: ', receivedData);
      console.log('event: ', event);
      if (receivedData === 'alarm') {
        setAlarm(true);
        console.log('alarm on', page);
      }
    };
    // }

    return () => {
      eventSource.close();
      console.log('SSE CLOSED');
    };
  }, [user]);

  useEffect(() => {
    if (page === 'chat') {
      setAlarm(false);
    }
  }, [page, alarm]);

  return (
    <main className={styles.main}>
      <div id="modal-container"></div>
      {cookies.token && (
        <ProfileDropdown
          setFold={setFold}
          setPage={setPage}
          refetchUser={refetchUser}
        />
      )}
      <section className={fold ? styles.navBar : styles.pinSection}>
        {fold ? (
          <NavBar className={styles.navbar} setInitial={setFold} />
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
    </main>
  );
};

export default Home;
