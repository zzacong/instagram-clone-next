import { useEffect, useState } from 'react'
import Image from 'next/image'
import { faker } from '@faker-js/faker'

import { Profile } from '$lib/types'

export default function Suggestions() {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      id: i.toString(),
      ...faker.helpers.contextualCard(),
    }))
    setProfiles(suggestions)
  }, [])

  return (
    <div className="mt-4 ml-8">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See all</button>
      </div>

      <ul>
        {profiles.map(p => (
          <li key={p.id} className="mt-2 flex items-center justify-between">
            <div className="relative aspect-square w-10 rounded-full border p-[2px]">
              <Image
                src={p.avatar}
                alt={p.username}
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div className="flex-1 px-4">
              <h2 className="text-sm font-semibold">{p.username}</h2>
              <h3 className="text-xs text-gray-400">
                Works at {p.company?.name}
              </h3>
            </div>

            <button className="text-xs text-blue-400">Follow</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
