/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://openweathermap.org/img/wn/**")],
  },
};

export default nextConfig;
