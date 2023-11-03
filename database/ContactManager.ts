import {
  type Firestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  documentId
} from 'firebase/firestore/lite'

import {
  db
} from './index'

import type Contact from '@/pages/api/types/contact'

class ContactDBManager {
  private readonly db: Firestore
  constructor (db: Firestore) {
    this.db = db
  }

  // Get contacts for an id
  async getContacts (id: string) {
    const usersCol = collection(this.db, 'contacts')
    const q = query(usersCol, where(documentId(), '==', id))
    const snapshot = await getDocs(q)
    const s = snapshot.docs.map((doc) => doc.data())
    return s[0].contacts
  }

  // add a contact object to the user with the id
  async addContact (id: string, contact: Contact) {
    const contactsCol = collection(this.db, 'contacts')
    const q = query(contactsCol, where(documentId(), '==', id))
    const contactDoc = (await getDocs(q)).docs
    const contactsData = contactDoc.map((doc: { data: () => any }) => doc.data())[0]
    // If there are no contacts for this user yet, create a new array
    // with the new contact, and add it
    if (contactDoc === undefined || contactsData === undefined) {
      console.log('Undefined contact, creating')
      await setDoc(doc(this.db, 'contacts', id), {
        contacts: [contact]
      })
    } else {
      // Get the current contact array, add to it, and add it back in
      const c = contactsData.contacts
      c.push(contact)
      await setDoc(doc(this.db, 'contacts', id), {
        contacts: c
      })
    }
  }
}

const contactDBManager = new ContactDBManager(db)
const exports = contactDBManager
export default exports
