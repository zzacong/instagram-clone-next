import { useSession } from 'next-auth/react'
import clsx from 'clsx'

import Stories from '$components/Stories'
import Posts from '$components/Posts'
import MiniProfile from '$components/MiniProfile'
import Suggestions from '$components/Suggestions'

export default function Feed() {
  const { data: session } = useSession()

  return (
    <main
      className={clsx(
        'mx-auto grid grid-cols-1 px-2 md:max-w-3xl md:grid-cols-2 xl:max-w-5xl xl:grid-cols-3',
        !session && '!max-w-3xl !grid-cols-1'
      )}
    >
      <section className="col-span-1 md:col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="relative hidden md:col-span-1 xl:block">
          <div className="sticky top-24 ml-8">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}
