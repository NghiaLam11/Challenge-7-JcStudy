import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Course, User } from "../types/types";
import { useLoaderStore } from "./useLoader";
import { useUserStore } from "./useUser";
import { useCoursesStore } from "./useCourses";
import { ref } from "vue";
import { autoUpdateStudyTime } from "./autoUpdateStudyTimeInChart";

export const useGetUserStore = async () => {
  try {
    const loaderStore = useLoaderStore();
    loaderStore.onToggleLoading();
    const userStore = useUserStore();

    const querySnapshot = await getDocs(collection(db, "users"));
    const users = ref<any>([]);
    const idUser = localStorage.getItem("idUser");
    // const date = new Date();
    querySnapshot.forEach((doc) => {
      users.value.push({ id: doc.id, ...doc.data() });
      if (idUser === doc.id) {
        userStore.user = { id: doc.id, ...doc.data() };
        userStore.studyTime = doc.data().studyTime;
      }
    });
    autoUpdateStudyTime();
    loaderStore.onToggleLoading();
  } catch (error) {
    console.log(error);
  }
};

export const useAddUserStore = async (user: User, idUser: string) => {
  try {
    const loaderStore = useLoaderStore();
    loaderStore.onToggleLoading();
    await setDoc(doc(db, "users", idUser), user);
    console.log(user, idUser);
    loaderStore.onToggleLoading();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const useUpdateUserStore = async (updateUser: any) => {
  try {
    const idUser = localStorage.getItem("idUser");
    const docRef = doc(db, "users", `${idUser}`);
    const dataUpdate = await updateDoc(docRef, updateUser);
    console.log(
      "A New Document Field has been added to an existing document",
      updateUser
    );
  } catch (error) {
    console.log(error);
  }
};

export const useAddCourseStore = async (course: any) => {
  try {
    const docRef = await addDoc(collection(db, "courses"), course);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const useGetCoursesStore = async () => {
  try {
    const coursesStore = useCoursesStore();
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = ref<any>([]);
    const unApprovedCourses = ref<any>([]);
    querySnapshot.forEach((doc) => {
      console.log({ id: doc.id, ...doc.data() });
      courses.value.push({ id: doc.id, ...doc.data() });
      if (doc.data().isApproved === false) {
        unApprovedCourses.value.push({ id: doc.id, ...doc.data() });
        console.log(doc.data(), "APPROVED = FALSE");
      }
    });

    coursesStore.courses = courses.value;
    coursesStore.unApprovedCourses = unApprovedCourses.value;

    console.log(courses.value, "COURSES");
  } catch (error) {
    console.log(error);
  }
};
