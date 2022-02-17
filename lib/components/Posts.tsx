import Post from '$lib/components/Post'

const posts = [
  {
    id: '123',
    username: 'sssangha',
    userImage:
      'https://lh3.googleusercontent.com/wr6cQ6o1fXMyCA3ZFKUNtdlni3s9-tmXKE9XSZMUXNAtf8DzMhqkY7wwvP6PZQer_URwV0WBVyt8fPCaYOmfNobXn2nlw4B4hPDqb_Q',
    image: 'https://images.unsplash.com/photo-1645028329212-61a2e08ef272',
    caption: 'This is DOPE!',
  },
  {
    id: '124',
    username: 'zzacong',
    userImage:
      'https://lh3.googleusercontent.com/zoPaUIJKJ0ayWcEDXozfMLPB2AGJ7xkWJxVx5wT0Mifcxqbwd6RBez6eGXlR6mfu__CnFhU8ruhph0kqwy5X42LNXcj1cP64LV64poY',
    image: 'https://images.unsplash.com/photo-1645023039027-4703a36b2d42',
    caption: 'This is DOPE!',
  },
]

export default function Posts() {
  return (
    <div>
      {posts.map(p => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  )
}
