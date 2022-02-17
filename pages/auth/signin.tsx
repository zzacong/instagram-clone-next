import type { GetServerSideProps } from 'next'

import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }: PageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)} className="">
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </main>
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
