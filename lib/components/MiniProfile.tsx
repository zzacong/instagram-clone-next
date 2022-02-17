import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function MiniProfile() {
  const { data: session } = useSession()

  return (
    <div className="mt-12 ml-8 flex items-center justify-between">
      <div className="relative aspect-square w-14 rounded-full border p-[2px]">
        <Image
          src="https://lh3.googleusercontent.com/wr6cQ6o1fXMyCA3ZFKUNtdlni3s9-tmXKE9XSZMUXNAtf8DzMhqkY7wwvP6PZQer_URwV0WBVyt8fPCaYOmfNobXn2nlw4B4hPDqb_Q"
          alt="profile picture"
          layout="fill"
          className="rounded-full"
        />
      </div>

      <div className="flex-1 px-4">
        <h2 className="font-bold">zzacong</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button className="text-sm font-semibold text-blue-400">Sign Out</button>
    </div>
  )
}
