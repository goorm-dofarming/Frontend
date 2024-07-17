import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';

// img
import CloseBtn from '@/src/_assets/main/close.svg';

// contestAPI
import { ModalContainer } from '@/src/_styles/common/modalStyles';
interface MainModalType {
  children: React.ReactNode;
  width: string;
  height: string;
  modal: boolean;
  openModal: () => void;
}

const Modal: React.FC<MainModalType> = ({
  children,
  width,
  height,
  openModal,
  modal,
}) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector(
      '#modal-container'
    ) as HTMLElement | null;
    setModalRoot(root);
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer $modal={modal} width={width} height={height}>
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
        {children}
        {/*  */}
      </div>
    </ModalContainer>,
    modalRoot
  );
};

export default Modal;
