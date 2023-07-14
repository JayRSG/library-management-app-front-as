/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  headers: () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://api.libraryman.com", // Replace with your backend URL
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      }
    ]
  }
}