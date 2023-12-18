import { createUserWithEmailAndPassword } from "firebase/auth";
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
