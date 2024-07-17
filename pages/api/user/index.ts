import apiClient from "../apiClient";


export const getMe = ()=>{
    return apiClient.get(`/me`);
}

//NOTE:body { "multipartFile": "string","userModifyRequest": {"nickname": "usernickname",    "password": "userpassword"}}

export const modifyUser = (body:{})=>{
    return apiClient.put(`/users`,body);
}

export const getUser = (userId:number)=>{
    return apiClient.get(`/users/${userId}`);
}

export const deleteUser = (userId:number)=>{
    return apiClient.delete(`/users/${userId}`);
}