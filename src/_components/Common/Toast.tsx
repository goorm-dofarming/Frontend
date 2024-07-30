import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { MdInfo } from 'react-icons/md';

// contestAPI
import { ToastContainer } from '@/src/_styles/common/toastStyles';
interface MainToastType {
  content: string;
  toast: boolean;
  openToast: () => void;
}

const Toast: React.FC<MainToastType> = ({ content, openToast, toast }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector(
      '#modal-container'
    ) as HTMLElement | null;
    setModalRoot(root);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        openToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ToastContainer toast={toast.toString()}>
      <div className="toast">
        <MdInfo size="1.5em" color="ED4A51" />
        <div className="content">{content}</div>
      </div>
    </ToastContainer>,
    modalRoot
  );
};

export default Toast;
