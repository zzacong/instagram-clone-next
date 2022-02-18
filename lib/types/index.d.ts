import type { ContextualCard } from '@faker-js/faker/helpers'
import type { DefaultSession } from 'next-auth'

export type Profile = {
  id: string
  name: string
  username: string
  avatar: string
  email: string
  company?: {
    name: string
    catchPhrase: string
    bs: string
  }
}
export type Post = {
  id: string
  username: string
  userImage: string
  image: string
  caption: string
}

declare module 'next-auth' {
  export interface Session {
    user?: DefaultSession['user'] & {
      uid?: string | null
      username?: string | null
    }
  }
}
