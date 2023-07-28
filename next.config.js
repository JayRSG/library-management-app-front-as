/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
}