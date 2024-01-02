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

export const useSignupAuth = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user, "signed up");
    })
    .catch((error: any) => {
      const errorStore = useErrorStore();
      const errorMessage = error.message;
      errorStore.errorMessage = errorMessage;
      errorStore.onToggleError();
      console.log(errorMessage);
    });
};

export const useSigninAuth = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorStore = useErrorStore();
      const errorMessage = error.message;
      errorStore.errorMessage = errorMessage;
      errorStore.onToggleError();
      console.log(errorMessage);
    });
};

export const useSignoutAuth = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful");
    })
    .catch((error: any) => {
      // An error happened.
      console.log("An error occurred", error);
    });
};

export const useAnonymusAuth = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("Anonymously signed");
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
      return user;
    } else {
      console.log(user);
    }
  });
};
