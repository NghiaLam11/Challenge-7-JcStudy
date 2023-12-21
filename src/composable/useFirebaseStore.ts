import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
export const useAddUserStore = async (user: any) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {});
    console.log("Document written with ID: ", docRef.id);
    console.log(user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

