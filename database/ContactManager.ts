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

class ContactDBManager {
  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }

  async addContact(id: string, contact: Map<string, string>){
    const contactsCol = collection(this.db, 'contacts')
    const q = query(contactsCol, where(documentId(), "==", id));
    const contactDoc = (await getDocs(q)).docs;
    const contactsData = contactDoc.map((doc: {data:()=>any}) => doc.data())[0];
    let contacts = Array.from(contact, ([key, value]) => ({ key, value }));
    if (contactDoc == undefined || contactsData == undefined){
        console.log("Undefined contact, creating");
        // If user doesn't exist, create a new one
        await setDoc(doc(this.db, "contacts", id), {
          "contacts": contacts
        });
    } else {
        let c = contactsData["contacts"];
        let arrContact = Array.from(contact, ([key, value]) => ({ key, value }));
        console.log(arrContact)
        let i = 0;
        for (i; i < arrContact.length; i++){
          c.push(arrContact[i]);
        }
        console.log(c);
        contacts = c;
        await setDoc(doc(this.db, "contacts", contactDoc[0].id), {
          "contacts": contacts
        });
        console.log(contacts);

    }

  }
}

const contactDBManager = new ContactDBManager(db);
const exports = { contactDBManager };
export default exports;
