import type { Profile } from '$lib/types'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { faker } from '@faker-js/faker'

import Story from '$components/Story'

export default function Stories() {
  const { data: session } = useSession()
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      id: i.toString(),
      ...faker.helpers.contextualCard(),
    }))
    setProfiles(suggestions)
  }, [])

  return (
    <ul className="mt-8 flex space-x-4 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-4 scrollbar-thin scrollbar-thumb-black">
      {session?.user && (
        <Story
          profile={{
            id: session.user.uid!,
            email: session.user.email!,
            avatar: session.user.image!,
            name: session.user.name!,
            username: session.user.username!,
          }}
        />
      )}
      {profiles.map(p => (
        <Story key={p.id} profile={p} />
      ))}
    </ul>
  )
}
