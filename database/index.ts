import { getApps, initializeApp } from 'firebase/app'
import {
  type Firestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  setDoc,
  getFirestore
} from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'
import { type User } from '@/pages/api/types/user'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
export const db = getFirestore(app)
export const storage = getStorage(app)

class UserDBManager {
  private readonly db: Firestore
  constructor (db: Firestore) {
    this.db = db
  }

  async updateUser (u: User) {
    const userDoc = await this.getUserByEmail(u.email)
    if (userDoc) {
      // If user exists, refresh session
      console.log('updating user')
      await setDoc(doc(this.db, 'users', userDoc.id),
        u
      )
    } else {
      return null
    }
  }

  async getUsers () {
    const usersCol = collection(this.db, 'users')
    const userSnapshot = await getDocs(usersCol)
    const users = userSnapshot.docs.map((doc) => doc.data())
    return users
  }

  async getUserByEmail (email: string): Promise<User | null> {
    const usersCol = collection(this.db, 'users')
    const q = query(usersCol, where('email', '==', email))
    const snapshot = await getDocs(q)
    const doc = snapshot.docs[0]
    if (!doc) {
      return null
    }
    const data = doc.data()
    const user: User = { ...data, id: doc.id } as User
    return user
  }

  generateUUID (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }

  async login (firstName: string, lastName: string, email: string) {
    const userDoc = await this.getUserByEmail(email)
    const session = this.generateUUID()

    if (userDoc) {
      // If user exists, refresh session
      await setDoc(doc(this.db, 'users', userDoc.id), {
        session,
        firstName,
        lastName,
        email,
        other_info: userDoc.other_info ?? null
      })
    } else {
      // If user doesn't exist, create a new one
      await addDoc(collection(this.db, 'users'), {
        firstName,
        lastName,
        email,
        session
      })
    }

    return session
  }
}

const userDBManager = new UserDBManager(db)
const exports = userDBManager
export default exports
