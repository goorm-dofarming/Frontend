import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MdInfo, MdCheckCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

// contestAPI
import { ToastContainer } from "@/src/_styles/common/toastStyles";
type toastType = "success" | "failure" | "warning";
interface MainToastType {
  content: string;
  toast: boolean;
  openToast: () => void;
  toastType?: toastType;
}
const icons = {
  warning: <MdInfo size="1.5em" color="ED4A51" />,
  success: <MdCheckCircle size="1.5em" color="64c945" />,
  failure: <IoMdCloseCircle size="1.5em" color="ED4A51" />,
};
const Toast: React.FC<MainToastType> = ({
  content,
  openToast,
  toast,
  toastType = "warning",
}) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector(
      "#modal-container"
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
        {/* <MdInfo size="1.5em" color="ED4A51" /> */}
        {icons[toastType]}
        <div className="content">{content}</div>
      </div>
    </ToastContainer>,
    modalRoot
  );
};

export default Toast;
