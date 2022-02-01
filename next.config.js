const debug = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: debug ? "" : "/superkev.in"
}

module.exports = nextConfig
