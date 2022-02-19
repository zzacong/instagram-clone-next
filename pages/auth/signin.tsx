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

        <div className="mt-32">
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="rounded-lg bg-blue-500 px-8 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
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
