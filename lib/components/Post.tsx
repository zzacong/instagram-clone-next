import type { Post } from '$lib/types'

import Image from 'next/image'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'

export default function Post({ post: p }: { post: Post }) {
  return (
    <div className="my-6 rounded-sm border bg-white">
      {/* Header */}
      <header className="flex items-center p-4">
        <div className="relative mr-4 aspect-square w-10 rounded-full border p-1">
          <Image
            src={p.userImage}
            alt={p.username}
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
        <p className="flex-1 font-bold">{p.username}</p>
        <DotsHorizontalIcon className="h-5" />
      </header>

      {/* Imgae */}
      {/* <div className="relative h-min w-full"> */}
      <Image
        src={p.image}
        alt={p.caption}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="cover"
      />
      {/* </div> */}

      {/* Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* Caption */}
      <p className="truncate p-4">
        <span className="mr-2 font-bold">{p.username}</span>
        {p.caption}
      </p>

      {/* Comments */}

      {/* Input box */}
      <form
        className="flex items-center border-t p-4"
        onSubmit={e => e.preventDefault()}
      >
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Add a comment..."
          className="flex-1 border-none focus:ring-0"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  )
}
