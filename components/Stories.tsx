import type { Profile } from '$lib/types'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Story from '$components/Story'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '$lib/config/firebase'

export default function Stories() {
  const { data: session } = useSession()
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect(() => {
    ;(async () => {
      const snap = await getDocs(collection(db, 'stories'))
      setProfiles(snap.docs.map(d => d.data() as Profile))
    })()
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
