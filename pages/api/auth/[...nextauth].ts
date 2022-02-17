import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  // theme: {
  //   logo: '/instagram_logo.svg',
  //   brandColor: '#f13287',
  //   colorScheme: 'auto',
  // },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
})
