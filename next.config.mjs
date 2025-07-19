import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    domains: [],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
};

const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

export default withPWAConfig(nextConfig);