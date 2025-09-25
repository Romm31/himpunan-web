/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    // Ganti dengan domain tempat gambar Anda disimpan
    domains: [], 
  },
}
module.exports = nextConfig