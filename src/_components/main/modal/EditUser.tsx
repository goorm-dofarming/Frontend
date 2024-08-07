import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// styles
import cx from 'classnames';
import styles from '@/src/_components/main/modal/edituser.module.scss';

// images
import ShowPwd from '@/src/_assets/main/eye.svg';
import HidePwd from '@/src/_assets/main/eye-closed.svg';

// atom
import { useRecoilValue } from 'recoil';
import { userState } from '@/src/atom/stats';

// hooks
import useToggle from '@/src/hooks/Home/useToggle';
import Toast from '../../Common/Toast';

interface EditUserProps {
  openModal: () => void;
  onEditUser: (
    image: File | null,
    changeImg: boolean,
    nickname: string,
    password: string
  ) => void;
  getImageUrl: (url: string) => string;
}

const EditUser: React.FC<EditUserProps> = ({
  openModal,
  onEditUser,
  getImageUrl,
}) => {
  // user
  const user = useRecoilValue(userState);

  // image 관련
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>('');

  // 입력값
  const [changeName, setChangeName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPwd, setCheckPwd] = useState<string>('');

  // 비밀번호 관련
  const [isSame, setIsSame] = useState<boolean>(true);
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  const handlePwd = useToggle(pwdShow, setPwdShow);
  const [isFocused, setIsFocused] = useState(false);
  const [pwdState, setPwdState] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 토스트
  const [toast, setToast] = useState<boolean>(false);
  const openToast = useToggle(toast, setToast);

  useEffect(() => {
    setChangeName(user.nickname);
    setSelectedImage(getImageUrl(user.imageUrl));
  }, [user, openModal]);

  const handleFocus = () => {
    setPwdState(true);
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!password) {
      setPwdState(false);
    }
  };

  // base64
  const handleimageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxSizeInBytes = 1 * 1024 * 1024; // 1MB 제한
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        if (file.size > maxSizeInBytes) {
          openToast();
          return;
        }
        setImage(file);
      }

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setSelectedImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const deleteImage = () => {
    setSelectedImage(null);
    setImage(null);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCheckPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPwd(e.target.value);
  };

  useEffect(() => {
    if (password === checkPwd) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [password, checkPwd]);

  const handleEditUser = () => {
    if (!isSame) return;
    let changeImg = true;
    let finalNickname = changeName;
    if (finalNickname === '') {
      finalNickname = user.nickname;
    }
    if (selectedImage === getImageUrl(user.imageUrl)) {
      changeImg = false;
    }
    if (password === '' && finalNickname === user.nickname && !changeImg) {
      openModal();
    } else {
      onEditUser(image, changeImg, finalNickname, password);
      setChangeName('');
      setPassword('');
      setCheckPwd('');
      setImage(null);
      openModal();
    }
  };

  // 비밀번호 div 밖 클릭 시 반투명화
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      if (!password) {
        setPwdState(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [password]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>프로필 수정</div>
      <div className={styles.editImage}>
        <input
          type="file"
          id="imageInput"
          onChange={handleimageChange}
          className={styles.fake}
          accept="image/*"
        />
        <div className={styles.imageContainer}>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="image Preview"
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className={styles.noImage}></div>
          )}
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.imageBtn} htmlFor="imageInput">
            프로필 사진 업로드
          </label>
          {selectedImage && (
            <div className={styles.imageBtn} onClick={deleteImage}>
              이미지 삭제
            </div>
          )}
        </div>
      </div>
      <div className={styles.editArea}>
        <span className={styles.text}>닉네임</span>
        <input
          type="text"
          className={styles.textInput}
          value={changeName}
          onChange={handleNicknameChange}
        />
      </div>
      {user.role === 'DOFARMING' && (
        <div
          className={cx(pwdState ? styles.show : styles.hide)}
          onClick={() => setPwdState(true)}
          ref={containerRef}
        >
          <div className={styles.editArea}>
            <span className={styles.text}>변경할 비밀번호</span>
            <div
              className={cx(styles.textInput, { [styles.focused]: isFocused })}
            >
              <input
                type={pwdShow === true ? 'text' : 'password'}
                className={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={password}
                onChange={handlePasswordChange}
              />
              <Image
                src={pwdShow === true ?  ShowPwd:HidePwd}
                alt="비밀번호 확인"
                width={25}
                height={25}
                onClick={handlePwd}
                className={styles.pwdEye}
              />
            </div>
          </div>
          <div className={styles.editArea}>
            <span className={styles.text}>비밀번호 확인</span>
            <input
              type={pwdShow === true ? 'text' : 'password'}
              className={styles.textInput}
              value={checkPwd}
              onChange={handleCheckPwdChange}
            />
          </div>
        </div>
      )}
      <div className={cx(styles.warningMsg, { [styles.visible]: !isSame })}>
        비밀번호를 알맞게 입력해주세요.
      </div>
      <button className={styles.yesBtn} onClick={handleEditUser}>
        저장
      </button>
      <Toast
        content={'이미지 크기는 1MB 이하만 가능합니다.'}
        toast={toast}
        openToast={openToast}
        toastType="warning"
      />
    </div>
  );
};

export default EditUser;
