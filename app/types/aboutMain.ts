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

export interface kakaoLoginDataType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}
