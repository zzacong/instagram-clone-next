import Image from 'next/image'
import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'

export default function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex max-w-6xl justify-between px-4 lg:mx-auto">
        {/* Left */}
        <div className="relative hidden h-16 w-28 cursor-pointer lg:inline-grid">
          <Image
            src="/instagram_logo.svg"
            alt="Instagram"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden">
          <Image
            src="/instagram_simple_icon.svg"
            alt="Instagram"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle - search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3">
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
          <HomeIcon className="nav-btn" />
          <MenuIcon className="h-6 w-10 cursor-pointer md:hidden" />
          <div className="nav-btn relative">
            <PaperAirplaneIcon className="nav-btn rotate-45" />
            <div className="absolute -top-1 -right-2 grid h-5 w-5 animate-pulse place-items-center  rounded-full bg-red-500 text-xs text-white">
              3
            </div>
          </div>
          <PlusCircleIcon className="nav-btn" />
          <UserGroupIcon className="nav-btn" />
          <HeartIcon className="nav-btn" />
          <div className="relative h-9 w-9">
            <Image
              src="https://lh3.googleusercontent.com/WeDMcKIFnYZCtXvXaKkN0zlaGNmEIndsQwYY10z3kwG6eCs527TnkQUeZ8mIRZldVg4tS8RtGCavBUfRQH8jzEGWKb3uc0Euk2EWT6E"
              alt="Profile picture"
              layout="fill"
              className="cursor-pointer rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
