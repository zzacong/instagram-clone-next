import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

import Header from '$components/Header'
import instagram_logo from '$public/instagram_logo.svg'

export default function SignIn({ providers }: PageProps) {
  return (
    <>
      <Header />

      <div className="mt-28 flex flex-col items-center justify-center py-4 px-14 text-center">
        <div className="w-80">
          <Image
            src={instagram_logo}
            alt="Instagram"
            priority
            objectFit="contain"
          />
        </div>

        <p className="text-xs italic">
          This is not a real app, it is built for hobby purpose.
        </p>

        <ul className="mt-24 flex w-72 flex-col items-stretch space-y-4">
          {Object.values(providers).map(provider => (
            <li key={provider.name} className="w-full">
              {/* Google login button */}
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="focusable relative w-full rounded-lg border bg-white py-3 pl-4 pr-8 shadow hover:bg-gray-50"
              >
                <div className="pointer-events-none absolute inset-y-0 grid place-items-center">
                  <Image
                    src={`/${provider.name}_logo.svg`}
                    alt={`/${provider.name} logo`}
                    height={22}
                    width={22}
                  />
                </div>
                <span className="block w-full pl-14 text-sm text-gray-700">
                  Continue with {provider.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}

type PageProps = {
  providers: ReturnType<typeof getProviders>
}
