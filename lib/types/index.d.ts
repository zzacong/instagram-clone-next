import type { ContextualCard } from '@faker-js/faker/helpers'

export type Profile = ContextualCard & { id: string }
export type Post = {
  id: string
  username: string
  userImage: string
  image: string
  caption: string
}
