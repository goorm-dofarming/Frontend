/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['tong.visitkorea.or.kr'],
  },
  distDir: 'build',
  output: 'export',
};

export default nextConfig;
