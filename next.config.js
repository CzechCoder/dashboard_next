/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "tomasburian.com",
        port: "",
        pathname: "/dev/**",
      },
    ],
  },
};

module.exports = nextConfig;
