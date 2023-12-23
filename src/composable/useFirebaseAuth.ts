import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";

import { auth } from "../firebase";
export const useSignupAuth = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user, "signed up");
    })
    .catch((error) => {
      const errorMessage = error.message;
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
      const errorMessage = error.message;
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
      console.log("Anonymously signed")
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
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
