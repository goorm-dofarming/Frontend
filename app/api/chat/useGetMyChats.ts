import axios from "axios";

export const getMyChats = async () => {
  const response = await axios.get("https://api.example.com/api/myChats");
  return response.data.data;
};
