import apiClient from "../apiClient";

//오픈 채팅방 검색(?) 
export const getChatRoomList = ()=>{
    return apiClient.get("/chatroom");
}

//NOTE: body {"title": "string",     "region": "SEOUL", "tagNames": ["string"]}
export const createChatRoom = (body:{})=>{
    return apiClient.post("/chatroom",body);
}

//채팅방 퇴장
export const leaveChatRoom = (roomId:number)=>{
    return apiClient.post(`/chatroom/${roomId}/leave`, );
}
//채팅방 입장
export const joinChatRoom = (roomId:number)=>{
    return apiClient.post(`/chatroom/${roomId}/join`, );
}

export const getMyChatRooms = ()=>{
    return apiClient.get("/chatroom/my");
}

export const deleteChatRoom= (roomId:number)=>{
    return apiClient.delete(`/chatroom/${roomId}`);
}

//NOTE:message

export const getMessage=()=>{
    return apiClient.get("/message");
}