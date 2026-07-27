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
    ];
  },
};

module.exports = nextConfig;