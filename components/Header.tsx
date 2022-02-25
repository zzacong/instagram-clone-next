import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSetRecoilState } from 'recoil'
import { HomeIcon as HomeIconFilled } from '@heroicons/react/solid'
import {
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'

import Avatar from '$components/Avatar'
import instagram_logo from '$public/instagram_logo.svg'
import instagram_icon from '$public/instagram_icon.svg'
import { newPostModalState } from '$lib/stores'

export default function Header() {
  const { data: session } = useSession()
  const setIsOpen = useSetRecoilState(newPostModalState)

  return (
    <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
      <nav className="flex h-16 max-w-5xl items-center justify-between px-2 lg:mx-auto">
        {/* Left */}
        <Link href="/" passHref>
          <a className="focusable hidden w-28 cursor-pointer lg:inline-flex">
            <Image
              src={instagram_logo}
              alt="Instagram"
              objectFit="contain"
              priority
            />
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="focusable inline-flex w-8 flex-shrink-0 cursor-pointer lg:hidden">
            <Image src={instagram_icon} alt="Instagram" objectFit="contain" />
          </a>
        </Link>

        {/* Middle - search input field */}
        <div className="relative max-w-sm flex-grow rounded-md p-3">
          <div className="pointer-events-none absolute inset-y-0 grid place-items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="block w-full rounded-md border-gray-300 bg-gray-100 pl-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/" passHref>
            <a className="nav-btn focusable">
              <HomeIconFilled />
            </a>
          </Link>

          {session?.user ? (
            <>
              <a
                href="#"
                className="nav-btn focusable relative"
                aria-current="page"
              >
                <PaperAirplaneIcon className="rotate-45" />
                <div className="absolute -top-1 -right-2 grid h-5 w-5 animate-pulse place-items-center rounded-full bg-red-500 text-xs text-white">
                  3
                </div>
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="nav-btn focusable"
              >
                <PlusCircleIcon />
              </button>
              <a href="#" className="nav-btn focusable">
                <UserGroupIcon />
              </a>
              <a href="#" className="nav-btn focusable">
                <HeartIcon />
              </a>

              {/* Profile picture */}
              {session?.user?.image ? (
                <button
                  onClick={() => signOut()}
                  className="focusable relative aspect-square w-9 rounded-full"
                >
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    layout="fill"
                    className="rounded-full"
                  />
                </button>
              ) : (
                <div className="relative h-9 w-9 cursor-pointer">
                  <Avatar />
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="focusable px-4 hover:bg-gray-50"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
