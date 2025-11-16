/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: `
      default-src 'self';
      img-src * data:;
      script-src 'none';
      sandbox;
    `,
  },
};

module.exports = nextConfig;
