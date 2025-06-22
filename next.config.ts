import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',         
        destination: '/books', 
        permanent: true,
      },
    ];
  },
  //Mixed Content 에러 해결을 위한 rewrite 룰 추가
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
