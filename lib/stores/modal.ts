import { Post } from '$lib/types'
import { atom } from 'jotai'

export const newPostModalState = atom(false)

export const editPostModalState = atom(false)

export const editPostState = atom<Post | undefined>(undefined)
