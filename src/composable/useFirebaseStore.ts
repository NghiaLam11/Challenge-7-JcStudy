import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../types/types";
import { useLoaderStore } from "./useLoader";
import { useUserStore } from "./useUser";
import { ref } from "vue";

export const useGetUserStore = async () => {
  try {
    const loaderStore = useLoaderStore();
    loaderStore.onToggleLoading();
    const userStore = useUserStore();
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = ref<any>([]);
    const idUser = localStorage.getItem("idUser");
    querySnapshot.forEach((doc) => {
      console.log({ id: doc.id, ...doc.data() });
      users.value.push({ id: doc.id, ...doc.data() });
      if (idUser === doc.id) {
        userStore.user = { id: doc.id, ...doc.data() };
      }
    });
    loaderStore.onToggleLoading();
  } catch (error) {
    console.log(error);
  }
};

export const useAddUserStore = async (user: User) => {
  try {
    const loaderStore = useLoaderStore();
    loaderStore.onToggleLoading();
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
    localStorage.setItem("idUser", docRef.id);
    console.log(user);
    loaderStore.onToggleLoading();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
