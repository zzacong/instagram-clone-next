import type { Post, Comment, Like } from '$lib/types'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { formatDistanceToNow } from 'date-fns'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'

import Spinner from '$components/Spinner'
import { db } from '$lib/config/firebase'
import { editPostModalState, editPostState } from '$lib/stores'

export default function Post({ post: p }: { post: Post }) {
  const { data: session } = useSession()
  const { handleSubmit, register, watch, formState, reset } = useForm()
  const setEditPost = useSetRecoilState(editPostState)
  const setIsOpen = useSetRecoilState(editPostModalState)

  const [comments, setComments] = useState<Comment[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  const [hasLiked, setHasLiked] = useState(false)
  const [isShowing, setIsShowing] = useState(false)

  const { isSubmitting } = formState

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

  const onLikePost = useCallback(() => {
    if (!session?.user?.uid) return
    const userId = session.user.uid
    const docRef = doc(db, 'posts', p.id, 'likes', userId)
    if (hasLiked) {
      return deleteDoc(docRef)
    }
    return setDoc(docRef, {
      username: session.user.username,
    })
  }, [hasLiked, p.id, session?.user?.uid, session?.user?.username])

  const onAnimate = () => {
    setIsShowing(true)
    setTimeout(() => setIsShowing(false), 1000)
  }

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

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', p.id, 'likes'), snapshot =>
        setLikes(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Like)))
      ),
    [p.id]
  )

  useEffect(
    () => setHasLiked(likes.some(l => l.id === session?.user?.uid)),
    [likes, session?.user?.uid]
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
        <button
          onClick={() => {
            setEditPost(p)
            setIsOpen(true)
          }}
          className="focusable"
        >
          <DotsHorizontalIcon className="h-5" />
        </button>
      </header>

      {/* Image */}
      {p.image ? (
        <div
          className="relative"
          onDoubleClick={() => {
            onAnimate()
            !hasLiked && onLikePost()
          }}
        >
          <Image
            src={p.image}
            alt={p.caption}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
          />
          <Transition
            show={isShowing}
            enter="transition-transform duration-80 ease-out"
            enterFrom="scale-0"
            enterTo="scale-90"
            leave="transition-transform duration-80 ease-in"
            leaveFrom="scale-100"
            leaveTo="scale-0"
            className="absolute inset-0 grid place-items-center"
          >
            <HeartIconFilled className="h-44 w-44 animate-likeheart text-white" />
          </Transition>
        </div>
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
            <button onClick={onLikePost} className="btn focusable">
              {hasLiked ? (
                <HeartIconFilled className="text-red-500" />
              ) : (
                <HeartIcon />
              )}
            </button>
            <button className="btn focusable">
              <ChatIcon />
            </button>
            <button className="btn focusable">
              <PaperAirplaneIcon />
            </button>
          </div>

          <button className="btn focusable">
            <BookmarkIcon className="btn" />
          </button>
        </div>
      )}

      {/* Caption */}
      <div className="p-4">
        {likes.length > 0 && (
          <p className="mb-1 font-semibold">{likes.length} likes</p>
        )}
        <p className="truncate ">
          <span className="mr-2 font-bold">{p.username}</span>
          {p.caption}
        </p>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
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
          <button className="focusable mr-2">
            <EmojiHappyIcon className="h-7" />
          </button>
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
            className="focusable rounded px-4 font-semibold text-blue-500 disabled:text-blue-300"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}
