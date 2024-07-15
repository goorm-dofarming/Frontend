import React, { useContext, useState } from 'react';
import Image from 'next/image';

// img
import CloseBtn from '@/app/_assets/main/close.svg';

// contestAPI
import { contextData } from '@/app/page';
import { ModalContainer } from '@/app/_styles/common/modalStyles';
interface MainModalType {
  children: React.ReactNode;
  width: string;
  height: string;
}

const Modal: React.FC<MainModalType> = ({ children, width, height }) => {
  const { openModal, modal } = useContext(contextData);
  return (
    <ModalContainer $modal={modal} width={width} height={height}>
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
      {children}
      {/*  */}
    </ModalContainer>
  );
};

export default Modal;
