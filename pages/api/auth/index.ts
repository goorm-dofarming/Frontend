import apiClient from "../apiClient";
import basicClient from "../basicClient";

//NOTE:body {"email": "user@example.com","password": "userpassword","confirmPassword": "userpassword"}
export const signup = (body:{})=>{
    return basicClient.post(`/signup`,body)
}

//NOTE:body {"socialType": "string","data": {"additionalProp1": {},"additionalProp2": {},"additionalProp3": {}}}
export const oauth = (body:{})=>{
    return basicClient.post(`/oauth`,body);
}

//NOTE:body{ "email": "user@example.com","password": "userpassword"}
export const login = (body:{})=>{
    return basicClient.post(`/login`,body);
}

export const sendEmail=()=>{
    return apiClient.post(`/email/send`);
}
export const checkEmail=()=>{
    return apiClient.post(`/email/check`);
}