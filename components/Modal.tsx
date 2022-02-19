import {
  ChangeEventHandler,
  Fragment,
  useCallback,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { Dialog, Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'

import { modalState } from '$lib/stores'
import { db, storage } from '$lib/config/firebase'

export default function Modal() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)

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
      const res = await uploadString(imageRef, file, 'data_url')
      // get download url of image and update the post document
      const downloadUrl = await getDownloadURL(imageRef)
      await updateDoc(docRef, {
        image: downloadUrl,
      })

      setOpen(false)
      setFile(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [file, ext, isLoading, session?.user, setOpen])

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
    <Transition show={open}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="index-10 fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:block sm:h-screen" aria-hidden="true">
            &#8203
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="my-8 w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-4 shadow-xl transition-all sm:p-6">
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
                  <div className="mx-auto grid aspect-square w-12 cursor-pointer place-items-center rounded-full bg-red-100">
                    <CameraIcon
                      className="aspect-square w-6 text-red-600"
                      aria-hidden="true"
                      onClick={() => filePickerRef.current?.click()}
                    />
                  </div>
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

                  <div className="pt-2">
                    <input
                      ref={captionRef}
                      type="text"
                      placeholder="Please enter your caption..."
                      className="w-full border-none text-center focus:ring-0"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onUpload}
                    disabled={isLoading || !file}
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:disabled:bg-gray-300 sm:text-sm"
                  >
                    {isLoading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
