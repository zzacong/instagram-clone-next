import type { Profile } from '$lib/types'

import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

import Story from '$lib/components/Story'

export default function Stories() {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      id: i.toString(),
      ...faker.helpers.contextualCard(),
    }))
    setProfiles(suggestions)
  }, [])

  return (
    <div className="mt-8 flex space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white p-6 scrollbar-thin scrollbar-thumb-black">
      {profiles.map(p => (
        <Story key={p.id} profile={p} />
      ))}
    </div>
  )
}
