/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // profile image
      'lh3.googleusercontent.com',
      // faker
      'cloudflare-ipfs.com',
      // firebase storage
      'firebasestorage.googleapis.com',
    ],
  },
}

module.exports = nextConfig
