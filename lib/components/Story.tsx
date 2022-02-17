import type { Profile } from '$lib/types'

import Image from 'next/image'

export default function Story({ profile: p }: { profile: Profile }) {
  return (
    <div className="">
      <div className="transform cursor-pointer rounded-full border-2 border-red-500 p-[1.5px] transition duration-200 ease-out hover:scale-110">
        <div className="relative h-14 w-14">
          <Image
            src={p.avatar}
            alt={p.name}
            layout="fill"
            objectFit="contain"
            className="rounded-full  "
          />
        </div>
      </div>

      <p className="w-14 truncate text-center text-xs">{p.username}</p>
    </div>
  )
}
