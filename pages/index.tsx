import Head from 'next/head'

import Header from '$lib/components/Header'
import Feed from '$lib/components/Feed'
import Modal from '$lib/components/Modal'

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>Instagram Clone | Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Feed />
      <Modal />
    </div>
  )
}
