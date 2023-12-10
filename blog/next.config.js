/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['images.microcms-assets.io'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
        pathname: "/assets/54d37f9a055f4819b273e9c7fb3d8a0b/**",
      },
    ],
  },
};

module.exports = nextConfig;
