/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // new URL("https://openweathermap.org/img/wn/**"),
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
