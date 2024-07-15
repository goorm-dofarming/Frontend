'use client';
import styles from './home.module.scss';
import React, { createContext, useEffect, useState } from 'react';

// components
import NavBar from '@/app/_components/main/NavBar/page';
import { Map, Log, Likes, Chat } from '@/app/_components/main';

// types
import { contextDataType, inputDataType } from './types/aboutMain';
import Main from './_components/main/Main';

export const contextData = createContext<contextDataType>({
  pwdShow: false,
  handlePwd: () => {},
  inputData: {
    email: '',
    password: '',
    confirmPassword: '',
    authentication: '',
  },
  handleInputData: (sort: string, value: string) => {},
  openModal: () => {},
  modal: false,
  handleComponent: () => {},
});

const Home = ({ children }: { children: React.ReactNode }) => {
  // 로그인 회원가입 페이지 컨트롤
  const [pageState, setPageState] = useState(false);
  // dropdown 클릭 컨트롤
  const [dropdown, setDropdonw] = useState<boolean>(false);
  // 모달 컨트롤
  const [modal, setModal] = useState<boolean>(false);
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

  const showDropdown = () => setDropdonw(!dropdown);
  const openModal = () => setModal(!modal);
  const handlePwd = () => setPwdShow(!pwdShow);
  const handleComponent = () => setPageState(!pageState);

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
        {fold ? (
          <>{element}</>
        ) : (
          <contextData.Provider
            value={{
              pwdShow,
              handlePwd,
              inputData,
              handleInputData,
              openModal,
              modal,
              handleComponent,
            }}
          >
            <Main
              dropdown={dropdown}
              showDropdown={showDropdown}
              pageState={pageState}
            />
          </contextData.Provider>
        )}
      </section>
    </main>
  );
};

export default Home;
