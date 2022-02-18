import type { Post, Comment } from '$lib/types'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { format, formatDistanceToNow } from 'date-fns'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'

import Spinner from '$lib/components/Spinner'
import { useForm } from 'react-hook-form'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '$lib/config/firebase'

export default function Post({ post: p }: { post: Post }) {
  const { data: session } = useSession()
  const { handleSubmit, register, watch, formState, reset } = useForm()
  const { isSubmitting } = formState
  const [comments, setComments] = useState<Comment[]>([])

  const onComment = handleSubmit(async data => {
    if (!session?.user) return
    await addDoc(collection(db, 'posts', p.id, 'comments'), {
      comment: data.comment,
      username: session.user.username,
      profileImage: session.user.image,
      timestamp: serverTimestamp(),
    })
    reset()
  })

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', p.id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        snapshot =>
          setComments(
            snapshot.docs.map(s => ({ id: s.id, ...s.data() } as Comment))
          )
      ),
    [p.id]
  )

  return (
    <div className="my-6 rounded-sm border bg-white">
      {/* Header */}
      <header className="flex items-center p-4">
        <div className="relative mr-4 aspect-square w-10 rounded-full border p-1">
          <Image
            src={p.profileImage}
            alt={p.username}
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
        <p className="flex-1 font-bold">{p.username}</p>
        <DotsHorizontalIcon className="h-5" />
      </header>

      {/* Image */}
      {p.image ? (
        <Image
          src={p.image}
          alt={p.caption}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="cover"
        />
      ) : (
        <div className="grid h-48 place-items-center bg-gray-50 py-4">
          <div className="h-12 w-12">
            <Spinner />
          </div>
        </div>
      )}

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Caption */}
      <p className="truncate p-4">
        <span className="mr-2 font-bold">{p.username}</span>
        {p.caption}
      </p>

      {/* Comments */}
      {comments.length && (
        <div className="h-20 overflow-y-scroll p-4 scrollbar-thin scrollbar-thumb-black">
          {comments.map(c => (
            <div key={c.id} className="flex items-center space-x-2 pb-4">
              <Image
                src={c.profileImage}
                alt="Profile image"
                height={28}
                width={28}
                className="rounded-full"
              />
              <p className="flex-1 text-sm">
                <span className="font-semibold">{c.username}</span> {c.comment}
              </p>

              <p className="pr-5 text-xs text-gray-700">
                {formatDistanceToNow(c.timestamp?.toDate(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <form onSubmit={onComment} className="flex items-center border-t p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            id="comment"
            placeholder="Add a comment..."
            className="flex-1 border-none focus:ring-0"
            {...register('comment')}
          />
          <button
            type="submit"
            disabled={!watch('comment')?.trim() || isSubmitting}
            className="rounded px-4 font-semibold text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:text-blue-300"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}
