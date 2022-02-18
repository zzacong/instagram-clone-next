import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { HomeIcon as HomeIconFilled } from '@heroicons/react/solid'
import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'

import Avatar from '$lib/components/Avatar'
import instagram_logo from '$public/instagram_logo.svg'
import instagram_icon from '$public/instagram_icon.svg'
import { modalState } from '$lib/stores'

export default function Header() {
  const { data: session } = useSession()
  const [modal, setModal] = useRecoilState(modalState)

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex max-w-6xl items-center justify-between px-4 lg:mx-auto">
        {/* Left */}
        <Link href="/" passHref>
          <a className="hidden w-28 cursor-pointer lg:inline-grid">
            <Image
              src={instagram_logo}
              alt="Instagram"
              objectFit="contain"
              priority
            />
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="w-8 flex-shrink-0 cursor-pointer lg:hidden">
            <Image src={instagram_icon} alt="Instagram" objectFit="contain" />
          </a>
        </Link>

        {/* Middle - search input field */}
        <div className="max-w-xs">
          <div className="relative rounded-md p-3">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/" passHref>
            <a className="nav-btn">
              <HomeIconFilled />
            </a>
          </Link>
          <MenuIcon className="h-6 w-10 cursor-pointer md:hidden" />

          {session?.user ? (
            <>
              <div className="nav-btn relative">
                <PaperAirplaneIcon className="nav-btn rotate-45" />
                <div className="absolute -top-1 -right-2 grid h-5 w-5 animate-pulse place-items-center  rounded-full bg-red-500 text-xs text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setModal(true)}
                className="nav-btn"
              />
              <UserGroupIcon className="nav-btn" />
              <HeartIcon className="nav-btn" />

              {/* Profile picture */}
              <div
                onClick={() => signOut()}
                className="relative aspect-square w-9 cursor-pointer"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    layout="fill"
                    className="rounded-full"
                  />
                ) : (
                  <Avatar />
                )}
              </div>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}
        </div>
      </div>
    </header>
  )
}
