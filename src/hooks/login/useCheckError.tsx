import { inputDataType } from '@/src/types/aboutMain';

export interface useCheckErrorType {
  setSignupToast: React.Dispatch<React.SetStateAction<string>>;
  setSignupToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  e: any;
  inputData: inputDataType;
}

const useCheckError = ({
  setSignupToast,
  setSignupToastOpen,
  e,
  inputData,
}: useCheckErrorType) => {
  function checkError() {
    setSignupToastOpen(true);
    if (e.response.data.message === 'Password Not Match.') {
      setSignupToast('비밀번호가 일치하지 않습니다!');
    } else if (e.response.data.message === 'User not found.') {
      setSignupToast('존재하지 않는 이메일 입니다!');
    } else if (inputData.email === '' || inputData.password === '') {
      setSignupToast('이메일 혹은 비밀번호가 빈칸입니다!');
    } else if (!inputData.email.includes('@')) {
      setSignupToast('이메일 형식을 지켜주세요!');
    }
  }

  return checkError;
};

export default useCheckError;
