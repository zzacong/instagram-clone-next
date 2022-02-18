import { UserIcon } from '@heroicons/react/solid'

export default function Avatar() {
  return (
    <span className="block rounded-full bg-gray-200 p-[2px]">
      <UserIcon className="rounded-full text-white" />
    </span>
  )
}
