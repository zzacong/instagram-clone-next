import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { getProviders, signIn } from 'next-auth/react'

import Header from '$components/Header'
import instagram_logo from '$public/instagram_logo.svg'
import google_logo from '$public/google_logo.svg'

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

        <div className="mt-24">
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
              {/* Google login button */}
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="focusable relative rounded-lg border bg-white py-3 pl-4 pr-8 shadow hover:bg-gray-50"
              >
                <div className="pointer-events-none absolute inset-y-0 grid place-items-center">
                  <Image
                    src={google_logo}
                    alt="Google logo"
                    height={22}
                    width={22}
                  />
                </div>
                <span className="block w-full pl-14 text-sm">
                  Sign in with {provider.name}
                </span>
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
