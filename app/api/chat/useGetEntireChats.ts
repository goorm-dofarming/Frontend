import axios from "axios";

export const getEntireChats = async () => {
  const response = await axios.get("https://api.example.com/api/entireChats");
  return response.data.data;
};
