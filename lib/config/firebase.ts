import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}'
)

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore()
export const storage = getStorage()
