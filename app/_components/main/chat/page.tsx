"use client";
import React from "react";

// styles
import { ChatContainer } from "@/app/_styles/main/chatStyles";

// components
import ChatList from "./chatList/ChatList";
import ChatSpace from "./chatSpace/ChatSpace";

const Chat = () => {
  return (
    <ChatContainer>
      <ChatList />
      <ChatSpace />
    </ChatContainer>
  );
};

export default Chat;
