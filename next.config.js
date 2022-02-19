/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // google profile image
      'lh3.googleusercontent.com',
      // faker
      'cloudflare-ipfs.com',
      // firebase storage
      'firebasestorage.googleapis.com',
      // github profile image
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
