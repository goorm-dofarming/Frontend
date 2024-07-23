import axios from 'axios';
import apiClient from '../apiClient';
import basicClient from '../basicClient';

//NOTE:body {"email": "user@example.com","password": "userpassword","confirmPassword": "userpassword"}
export const signUp = (body: {}) => {
  return basicClient.post(`/signup`, body);
};

//NOTE:body {"socialType": "string","data": {"additionalProp1": {},"additionalProp2": {},"additionalProp3": {}}}
export const oauth = (body: {}) => {
  return basicClient.post(`/oauth`, body);
};

//NOTE:body{ "email": "user@example.com","password": "userpassword"}
export const login = (body: {}) => {
  return basicClient.post(`/login`, body);
};

export const sendEmail = (body: {}) => {
  return apiClient.post(`/email/send`, body);
};
export const checkEmail = (body: {}) => {
  return apiClient.post(`/email/check`, body);
};

export const getKakaoAccessToken = (body: {}, headers = {}) => {
  return axios.post('https://kauth.kakao.com/oauth/token', body, { headers });
};

export const getKaKaoUserData = (headers = {}) => {
  return axios.get('https://kapi.kakao.com/v2/user/me', { headers });
};

export const signupSocialLogin = (body: {}) => {
  return basicClient.post(
    `${process.env.NEXT_PUBLIC_DEPLOY_API_ADDRESS}/oauth`,
    body
  );
};

export const getNaverUserData = (params = {}) => {
  return axios.get('/api/callback', { params });
};

export const getGoogleUserData = (headers = {}) => {
  return axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers,
  });
};
