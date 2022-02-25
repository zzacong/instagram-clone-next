import { Post } from '$lib/types'
import { atom } from 'recoil'

export const newPostModalState = atom({
  key: 'newPostModalState',
  default: false,
})

export const editPostModalState = atom({
  key: 'editPostModalState',
  default: false,
})

export const editPostState = atom<Post | undefined>({
  key: 'editPostState',
  default: undefined,
})
