/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['tong.visitkorea.or.kr'],
  },
  assetPrefix: '.',
};

export default nextConfig;
