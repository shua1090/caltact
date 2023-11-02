import { getApps, initializeApp } from "firebase/app";
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  setDoc,
  getFirestore,
  documentId,
  getDoc,
} from "firebase/firestore/lite";

import {
    app,
    db,
} from "./index"

import Contact from "@/pages/api/types/contact";

class ContactDBManager {
  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }

  
  async getContacts(id: String) {
    const usersCol = collection(this.db, 'contacts');
    const q = query(usersCol, where(documentId(), "==", id));
    const snapshot = await getDocs(q);
    const s = snapshot.docs.map((doc)=>doc.data());
    return s[0]["contacts"];
  }


  async addContact(id: string, contact: Contact){
    const contactsCol = collection(this.db, 'contacts')
    const q = query(contactsCol, where(documentId(), "==", id));
    const contactDoc = (await getDocs(q)).docs;
    const contactsData = contactDoc.map((doc: {data:()=>any}) => doc.data())[0];
    if (contactDoc == undefined || contactsData == undefined){
      console.log("Undefined contact, creating");
      await setDoc(doc(this.db, "contacts", id), {
        "contacts": [contact]
      });
    } else {
      let c = contactsData["contacts"];
      c.push(contact);
      await setDoc(doc(this.db, "contacts", id), {
        "contacts": c
      });
    }
  }
}

const contactDBManager = new ContactDBManager(db);
const exports = { contactDBManager };
export default exports;
