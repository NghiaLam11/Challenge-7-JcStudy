import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { auth } from "../firebase";
import { useErrorStore } from "./useError";
import { useUserStore } from "./useUser";
import { useAddUserStore, useGetUserStore } from "./useFirebaseStore";

export const useSignupAuth = async (user: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    await useAddUserStore(user, userCredential.user.uid);
    localStorage.setItem("idUser", userCredential.user.uid);
    await useGetUserStore();
    window.location.reload();
  } catch (error: any) {
    const errorStore = useErrorStore();
    const errorMessage = error.message;
    errorStore.errorMessage = errorMessage;
    errorStore.onToggleError();
  }
};

export const useSigninAuth = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("idUser", userCredential.user.uid);
    const user = userCredential.user;
    console.log(user);
    await useGetUserStore();
  } catch (error: any) {
    const errorStore = useErrorStore();
    const errorMessage = error.message;
    errorStore.errorMessage = errorMessage;
    errorStore.onToggleError();
    console.log(errorMessage);
  }
};

export const useSignoutAuth = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("idUser");
      console.log("Sign-out successful");
    })
    .catch((error: any) => {
      // An error happened.
      console.log("An error occurred", error);
    });
};

export const useAnonymusAuth = () => {
  signInAnonymously(auth)
    .then((userCredential) => {
      console.log("Anonymously signed");
      localStorage.setItem("idUser", userCredential.user.uid);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
};

export const useUpdateAuthPassword = async (newPassword: any) => {
  try {
    const user: any = auth.currentUser;
    const userStore = useUserStore();
    if (user !== null) {
      const credential = EmailAuthProvider.credential(
        user.email,
        userStore.user.password
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      console.log("Updated password user");
    }
  } catch (error) {
    console.log(error);
  }
};

export const useStateChangedAuth = () => {
  onAuthStateChanged(auth, (user: any) => {
    if (user) {
      const uid = user.uid;
      console.log(user, uid, "Changed auth");
      useGetUserStore();

      return user;
    } else {
      console.log(user);
    }
  });
};
