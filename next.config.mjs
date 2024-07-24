/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['tong.visitkorea.or.kr'],
  },
  assetPrefix:
    process.env.NODE_ENV === 'production' ? `${NEXT_PUBLIC_ADDRESS}` : '',
};

export default nextConfig;
