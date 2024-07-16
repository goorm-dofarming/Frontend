'use client';
import styles from './home.module.scss';
import React, { useEffect, useState } from 'react';

// components
import NavBar from '@/app/_components/main/NavBar/page';
import { Map, Log, Likes, Chat } from '@/app/_components/main';

// types
import { inputDataType } from './types/aboutMain';
import Main from './_components/main/Main';
import useToggle from './hooks/Home/useToggle';

const Home = ({ children }: { children: React.ReactNode }) => {
  // 로그인 회원가입 페이지 컨트롤
  const [pageState, setPageState] = useState(false);
  // dropdown 클릭 컨트롤
  const [dropdown, setDropdown] = useState<boolean>(false);
  // 비밀번호 show
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  // input data
  const [inputData, setInputData] = useState<inputDataType>({
    email: '',
    password: '',
    confirmPassword: '',
    authentication: '',
  });
  const [fold, setFold] = useState<boolean>(false);
  const [page, setPage] = useState<string>('');
  const [element, setElement] = useState<React.JSX.Element>(Map);

  useEffect(() => {
    switch (page) {
      case '':
        setElement(Map);
        break;
      case 'log':
        setElement(Log);
        break;
      case 'likes':
        setElement(Likes);
        break;
      case 'chat':
        setElement(Chat);
        break;
      default:
        setElement(Map);
    }
  }, [page]);

  const showDropdown = useToggle(dropdown, setDropdown);
  const handlePwd = useToggle(pwdShow, setPwdShow);
  const handleComponent = useToggle(pageState, setPageState);

  const handleInputData = (sort: string, value: string) => {
    setInputData((prev) => ({
      ...prev,
      [sort]: value,
    }));
  };

  useEffect(() => {
    console.log('inputData: ', inputData);
  }, [inputData]);

  return (
    <main className={styles.main}>
      <section className={fold ? styles.navBar : styles.pinSection}>
        {fold ? (
          <NavBar
            onClick={setPage}
            className={styles.navbar}
            setInitial={setFold}
          />
        ) : (
          <>
            <div>
              <button onClick={() => setFold(true)}>임시버튼</button>
            </div>
            <div className={styles.description}>
              <p>Tap for a Random Adventure</p>
              <p>원하는 테마를 골라 즐거운 여행을 경험해보세요!</p>
            </div>
          </>
        )}
      </section>
      <section className={fold ? styles.page : styles.home}>
        {fold ? <>{element}</> : <Main />}
      </section>
    </main>
  );
};

export default Home;
