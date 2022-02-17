import Stories from '$lib/components/Stories'
import Posts from '$lib/components/Posts'
import MiniProfile from '$lib/components/MiniProfile'
import Suggestions from '$lib/components/Suggestions'

export default function Feed() {
  return (
    <main className="mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3">
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      <section className="hidden md:col-span-1 xl:inline-grid">
        <div className="fixed top-20">
          {/* Mini profile */}
          <MiniProfile />
          {/* Suggestions */}
          <Suggestions />
        </div>
      </section>
    </main>
  )
}
