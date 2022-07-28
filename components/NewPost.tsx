import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { Dialog } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'

import Modal from '$components/Modal'
import { newPostModalState } from '$lib/stores'
import { db, storage } from '$lib/config/firebase'

export default function NewPost() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useAtom(newPostModalState)

  const filePickerRef = useRef<HTMLInputElement>(null)
  const captionRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<string | null>()
  const [ext, setExt] = useState<string | null>()
  const [isLoading, setIsLoading] = useState(false)

  const onUpload = useCallback(async () => {
    if (isLoading || !file || !ext || !session?.user) return
    try {
      setIsLoading(true)
      // create a post and add to firestore and get the post id
      const docRef = await addDoc(collection(db, 'posts'), {
        username: session.user?.username,
        caption: captionRef.current?.value,
        profileImage: session.user?.image,
        timestamp: serverTimestamp(),
      })
      // upload the image to firebase storage with the post id
      const imageRef = ref(storage, `posts/${docRef.id}.${ext}`)
      await uploadString(imageRef, file, 'data_url')
      // get download url of image and update the post document
      const downloadUrl = await getDownloadURL(imageRef)
      await updateDoc(docRef, {
        image: downloadUrl,
      })

      setIsOpen(false)
      setFile(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [file, ext, isLoading, session?.user, setIsOpen])

  const onAddImage: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const f = e.target.files?.[0]
    if (f) {
      const reader = new FileReader()
      reader.readAsDataURL(f)
      reader.onload = ev => {
        setFile(ev.target?.result as string)
        const [, ext] = f.name.split('.')
        setExt(ext)
      }
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="relative mx-auto mt-[20vh] w-full max-w-md overflow-hidden rounded-lg bg-white p-4 shadow-xl sm:p-6">
        <div>
          {file ? (
            <div className="relative h-44 cursor-pointer text-center">
              <Image
                src={file}
                alt="Uploaded image"
                layout="fill"
                objectFit="contain"
                onClick={() => setFile(null)}
              />
            </div>
          ) : (
            <button
              onClick={() => filePickerRef.current?.click()}
              className="focusable mx-auto grid aspect-square w-12 cursor-pointer place-items-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"
            >
              <CameraIcon
                className="aspect-square w-6 text-white"
                aria-hidden="true"
              />
            </button>
          )}

          <div>
            <div className="pt-2 sm:pt-4">
              <Dialog.Title
                as="h3"
                className="text-center text-lg font-medium leading-6 text-gray-900"
              >
                Upload a photo
              </Dialog.Title>
            </div>

            <div>
              <input
                ref={filePickerRef}
                type="file"
                hidden
                onChange={onAddImage}
              />
            </div>

            <div className="pt-4">
              <input
                ref={captionRef}
                type="text"
                placeholder="Please enter your caption..."
                className="w-full rounded border-none text-center focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onUpload}
              disabled={isLoading || !file}
              className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300 sm:text-sm"
            >
              {isLoading ? 'Uploading...' : 'Upload Post'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
