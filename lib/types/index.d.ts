import type { ContextualCard } from '@faker-js/faker/helpers'
import type { DefaultSession } from 'next-auth'
import type { Timestamp } from 'firebase/firestore'

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
  profileImage: string
  image: string
  caption: string
  timestamp: Timestamp
}

export type Comment = {
  id: string
  username: string
  comment: string
  profileImage: string
  timestamp: Timestamp
}

declare module 'next-auth' {
  export interface Session {
    user?: DefaultSession['user'] & {
      uid?: string | null
      username?: string | null
    }
  }
}
