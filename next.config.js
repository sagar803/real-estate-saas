/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      // 'www.themanorparas.com',
      'zyzydqwfyafzigaruupg.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  }
}
