module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */

  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
          pathname: "**",
        },
      ],
    },
  };
  return nextConfig;
};

module.exports = {
  allowedDevOrigins: ['172.20.10.4'],
}