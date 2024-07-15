export interface inputDataType {
  email: string;
  password: string;
  confirmPassword: string;
  authentication: string;
}

export interface contextDataType {
  pwdShow: boolean;
  handlePwd: () => void;
  inputData: inputDataType;
  handleInputData: (sort: string, value: string) => void;
  openModal: () => void;
  modal: boolean;
  handleComponent: () => void;
}
