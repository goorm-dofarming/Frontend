import axios from "axios";
import config from "@/src/_config";

const kakaoClient = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  timeout: 5000,
});

kakaoClient.interceptors.request.use(async (config) => {
  const kakao_api_key = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  if (kakao_api_key) {
    config.headers["Authorization"] = `KakaoAK ${kakao_api_key}`;
  } else {
    console.error(
      "Kakao API Key is undefined. Please check your environment variables."
    );
  }
  return config;
});

export default kakaoClient;
