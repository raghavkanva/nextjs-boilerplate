/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/session",
        destination: "/career-guidance",
        permanent: true,
      },
      {
        source: "/independence-offer",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/embedded-starter-pack",
        destination: "/electronics-starter-pack",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;