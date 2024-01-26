import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { Course, User } from "../types/types";
import { useLoaderStore } from "./useLoader";
import { useUserStore } from "./useUser";
import { useCoursesStore } from "./useCourses";
import { ref } from "vue";
import { autoUpdateStudyTime } from "./autoUpdateStudyTimeInChart";
import {
  useGetImageUrlStorage,
  useGetVideoUrlStorage,
} from "./useFirebaseStorage";

export const useGetUserStore = async () => {
  try {
    const loaderStore = useLoaderStore();
    const userStore = useUserStore();
    await useGetCoursesStore();
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
      updateUser,
      dataUpdate
    );
    window.location.reload();
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
    const q = query(
      collection(db, "courses"),
      orderBy("countUnlocked", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const courses = ref<any>({});

    const unApprovedCourses = ref<any>({});
    querySnapshot.forEach(async (doc) => {
      const course = doc.data();
      // FETCH URL IMG THUMBNAIL
      const imgUrl = await useGetImageUrlStorage(
        `images-${course.idUser}/${course.thumbnailImg}`
      );
      // FETCH URL VIDEO THUMBNAIL
      const videoUrl = await useGetVideoUrlStorage(
        `videos-${course.idUser}/${course.thumbnailVideo}`
      );
      // Separate two store - first is approved and second is unapproved
      if (course.isApproved === true) {
        var size = Object.keys(courses.value).length;
        if (size < 10) {
          // unapprove -> for normal user
          courses.value[doc.id] = {
            id: doc.id,
            imgUrl: imgUrl,
            videoUrl: videoUrl,
            ...course,
          };
        }
      } else if (course.isApproved === false) {
        // unapprove -> for admin
        unApprovedCourses.value[doc.id] = {
          id: doc.id,
          imgUrl: imgUrl,
          videoUrl: videoUrl,
          ...course,
        };

      }
    });
    // declare the function to RANDOMIZE (shuffle) ARRAY COURSES APPROVED
    const shuffle = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    coursesStore.courses = shuffle(courses.value);
    coursesStore.unApprovedCourses = unApprovedCourses.value;
  } catch (error) {
    console.log(error);
  }
};
