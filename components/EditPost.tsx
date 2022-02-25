import { useCallback, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'

import Modal from '$components/Modal'
import { editPostModalState, editPostState } from '$lib/stores'
import { db, storage } from '$lib/config/firebase'

export default function EditPost() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(editPostModalState)
  const [post, setPost] = useRecoilState(editPostState)
  const [isLoading, setIsLoading] = useState(false)

  const isOwner = useMemo(
    () => session?.user?.username === post?.username,
    [post?.username, session?.user?.username]
  )

  const onDelete = useCallback(async () => {
    if (!isOwner || !post) return
    try {
      setIsLoading(true)
      const ext = post.image.match(
        /\.(png|jpg|jpeg|jfif|pjpeg|pjsvg|webp|apng|avif|gif)\?/
      )?.[1]
      if (!ext) throw new Error('cannot delete')

      await Promise.all([
        deleteDoc(doc(db, `posts/${post.id}`)),
        deleteObject(ref(storage, `posts/${post.id}.${ext}`)),
      ])
      setIsOpen(false)
      setPost(undefined)
    } catch (error) {
      console.error(error)
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }, [isOwner, post, setIsOpen, setPost])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="z-40 my-8 flex w-full max-w-sm flex-col overflow-hidden rounded-lg bg-white shadow-xl transition-all">
        <button
          onClick={onDelete}
          disabled={isLoading}
          className="modal-btn rounded-t-lg border-none font-bold text-red-500"
        >
          {isOwner ? 'Delete' : 'Report'}
        </button>
        {!isOwner && (
          <button className="modal-btn font-bold text-red-500">Unfollow</button>
        )}
        <button className="modal-btn">Go to post</button>
        <button className="modal-btn">Share to...</button>
        <button className="modal-btn">Copy Link</button>
        <button className="modal-btn">Embed</button>
        <button
          onClick={() => setIsOpen(false)}
          className="modal-btn rounded-b-lg"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}
