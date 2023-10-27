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
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

class UserDBManager {
  private db: Firestore;
  constructor(db: Firestore) {
    this.db = db;
  }

  async addContacts(id: String, contactID: String){
    const usersCol = collection(this.db, 'contacts');
    const q = (await getDocs(query(usersCol, where('id', '==', id)))).docs;
    console.log(q.map((docs) => docs.data()));
    if (!q.length){
      // User doesn't have any contacts, add now
      console.log("No contacts");
    } else {
      console.log("Adding");
      await setDoc(doc(this.db, "contacts", q[0].id), { 
        "phone": "shynn",
        "test": "test"
      });
      console.log("added");
    }
  }

  async getContactByPhone(field: string, value: BigInt){
    const usersCol = collection(this.db, 'contacts');
    const q = (await getDocs(query(usersCol, where(field, '==', value)))).docs;
    if (!q.length) {
      console.log(`No matching contacts with ${field} == ${value}`);
      return null;
    } else {
      console.log("Found some values");
      q.map((doc)=>doc.data());
    }

    

  }

  async getContacts(id: String) {
    const usersCol = collection(this.db, 'contacts');
    const q = query(usersCol, where("id", "==", id));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc)=>doc.data());
  }

  async getUsers() {
    const usersCol = collection(this.db, "users");
    const userSnapshot = await getDocs(usersCol);
    const users = userSnapshot.docs.map((doc) => doc.data());
    return users;
  }

  async getUserByEmail(email: string) {
    const usersCol = collection(this.db, "users");
    const q = query(usersCol, where("email", "==", email));
    const snapshot = await getDocs(q);
    return snapshot.docs[0];
  }

  generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  async login(firstName: string, lastName: string, email: string) {
    let userDoc = await this.getUserByEmail(email);
    const session = this.generateUUID();

    if (userDoc) {
      // If user exists, refresh session
      await setDoc(doc(this.db, "users", userDoc.id), { 
        session,
        firstName,
        lastName,
        email,
      });
    } else {
      // If user doesn't exist, create a new one
      await addDoc(collection(this.db, "users"), {
        firstName,
        lastName,
        email,
        session,
      });
    }

    return session;
  }
}

const userDBManager = new UserDBManager(db);
const exports = { userDBManager };
export default exports;
