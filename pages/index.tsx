import Head from 'next/head'

import Header from '$lib/components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Instagram Clone | Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      {/* Feed */}
      {/* Modal */}
    </div>
  )
}
