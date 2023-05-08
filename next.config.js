/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@reservoir0x/reservoir-kit-ui',
]);

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig)
