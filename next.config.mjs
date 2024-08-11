/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'tong.visitkorea.or.kr',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'api.dofarming.net',
    ],
    unoptimized: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
