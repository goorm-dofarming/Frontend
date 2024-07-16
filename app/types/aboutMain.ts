export interface inputDataType {
  email: string;
  password: string;
  confirmPassword: string;
  authentication: string;
}

export interface contextDataType {
  openModal: () => void;
  modal: boolean;
}
