import React, { useState } from 'react';
import Image from 'next/image';

// img
import CloseBtn from '@/app/_assets/main/close.svg';
import Login from './modal/Login';
import Signup from './modal/Signup';

interface MainModalType {
  openModal: () => void;
  pwdShow: boolean;
  handlePwd: () => void;
}
const MainModal = ({ openModal, pwdShow, handlePwd }: MainModalType) => {
  const [pageState, setPageState] = useState(false);

  const handleComponent = () => setPageState(!pageState);
  return (
    <div className="modal">
      {/* 모달 헤더 */}
      <div className="modalHeader">
        <Image
          className="logo"
          src={CloseBtn}
          alt="닫기"
          width={30}
          height={30}
          onClick={openModal}
        />
      </div>
      {/* 모달 컨텐츠 부분 */}
      {pageState === true ? (
        <Signup handleComponent={handleComponent} />
      ) : (
        <Login handleComponent={handleComponent} />
      )}

      {/*  */}
    </div>
  );
};

export default MainModal;
