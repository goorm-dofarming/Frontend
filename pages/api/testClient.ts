import axios from "axios";
import config from "@/src/_config";

const basicClient = axios.create({
  baseURL: "http://localhost:8008/api/v1",
  timeout: 5000,
});

export default basicClient;
