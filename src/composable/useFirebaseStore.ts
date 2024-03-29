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
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../types/User.ts";
import { useLoaderStore } from "./useLoader";
import { useUserStore } from "./useUser";
import { useCoursesStore } from "./useCourses";
import { ref } from "vue";
import { autoUpdateStudyTime } from "./autoUpdateStudyTimeInChart";
import {
  useGetImageUrlStorage,
  useGetVideoUrlStorage,
} from "./useFirebaseStorage";
import { useCheckNewItem } from "./useCheckNewItem";
import { useBlogsStore } from "./useBlogs";

export const useGetUserStore = async () => {
  try {
    const loaderStore = useLoaderStore();
    loaderStore.isLoading = true;
    const userStore = useUserStore();

    const querySnapshot = await getDocs(collection(db, "users"));
    await useGetCoursesStore();
    await useGetBlogsStore();
    const users = ref<any>({});
    const idUser = localStorage.getItem("idUser");
    // const date = new Date();
    querySnapshot.forEach((doc) => {
      users.value[doc.id] = { id: doc.id, ...doc.data() };
      if (idUser === doc.id) {
        userStore.user = { id: doc.id, ...doc.data() };
        userStore.studyTime = doc.data().studyTime;
      }
    });
    autoUpdateStudyTime();
    userStore.users = users.value;
    loaderStore.isLoading = false;
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

export const useUpdateUserStore = async (updateUser: any, idUser: any) => {
  try {
    const docRef = doc(db, "users", idUser);
    const dataUpdate = await updateDoc(docRef, updateUser);
    useGetCoursesStore();
    console.log(
      "A New Document Field has been added to an existing document",
      updateUser,
      dataUpdate
    );
    // window.location.reload();
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
    const loaderStore = useLoaderStore();
    const coursesStore = useCoursesStore();
    const q = query(
      collection(db, "courses"),
      orderBy("countUnlocked", "desc"),
      limit(20)
    );
    const idUser = localStorage.getItem("idUser");
    const querySnapshot = await getDocs(q);
    const coursesApproved = ref<any>({});
    const newCourses = ref<any>({});
    const courses = ref<any>({});
    const coursesArray = ref<any>([]);
    const coursesTrend = ref<any>({});
    const unApprovedCourses = ref<any>({});
    const coursesRegister = ref<any>({});
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
      const userStore = useUserStore();
      courses.value[doc.id] = {
        id: doc.id,
        imgUrl: imgUrl,
        videoUrl: videoUrl,
        ...course,
      };
      if (course.idUser == idUser) {
        coursesRegister.value[doc.id] = {
          id: doc.id,
          ...course,
          imgUrl: imgUrl,
          videoUrl: videoUrl,
        };
      }
      // Separate two store - first is approved+remove course user's unlocked and second is unapproved
      if (
        course.isApproved === true &&
        !userStore.user?.coursesUnlocked.hasOwnProperty(doc.id)
      ) {
        // IF THE COURSE IS NEW -> ADD TO NEWCOURSES STORE
        const newCourse = await useCheckNewItem(course);
        coursesArray.value.push({
          id: doc.id,
          imgUrl: imgUrl,
          videoUrl: videoUrl,
          ...course,
        });
        var size = Object.keys(coursesApproved.value).length;
        if (size < 10) {
          // unapprove -> for normal user
          coursesApproved.value[doc.id] = {
            id: doc.id,
            imgUrl: imgUrl,
            videoUrl: videoUrl,
            ...course,
          };
        }

        if (newCourse) {
          newCourses.value[doc.id] = {
            ...newCourse,
            id: doc.id,
            imgUrl: imgUrl,
            videoUrl: videoUrl,
          };
        }
        // IF VIEWED HIGH
        if (course.countUnlocked > 10) {
          coursesTrend.value[doc.id] = {
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

    coursesStore.courses = courses.value;
    coursesStore.coursesRegister = coursesRegister.value;
    coursesStore.coursesArray = coursesArray.value;
    coursesStore.coursesTrend = coursesTrend.value;
    coursesStore.coursesApproved = coursesApproved.value;
    coursesStore.newCourses = newCourses.value;
    coursesStore.unApprovedCourses = unApprovedCourses.value;
    loaderStore.isLoading = false;
  } catch (error) {
    console.log(error);
  }
};
export const useDeleteCourseStore = async (id: any) => {
  try {
    const docRef = await deleteDoc(doc(db, "courses", id));
    console.log("Document written with ID: ", docRef);
    useGetCoursesStore();
  } catch (error) {
    console.log(error);
  }
};
export const useUpdateCourseStore = async (updateCourse: any, id: string) => {
  try {
    const docRef = doc(db, "courses", id);
    const dataUpdate = await updateDoc(docRef, updateCourse);
    console.log(
      "A New Document Field has been updated to an existing document",
      updateCourse,
      dataUpdate
    );
    // useGetUserStore();
  } catch (error) {
    console.log(error);
  }
};

export const useAddBlogStore = async (blog: any) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), blog);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const useDeleteBlogStore = async (id: any) => {
  try {
    const docRef = await deleteDoc(doc(db, "blogs", id));
    console.log("Document written with ID: ", docRef);
    useGetBlogsStore();
  } catch (error) {
    console.log(error);
  }
};

export const useGetBlogsStore = async () => {
  try {
    const q = query(
      collection(db, "blogs"),
      orderBy("view", "desc"),
      limit(20)
    );
    const blogsStore = useBlogsStore();
    const loaderStore = useLoaderStore();

    const querySnapshot = await getDocs(q);
    const blogs = ref<any>({});
    const blogsArray = ref<any>([]);
    const newBlogs = ref<any>({});
    const blogsApproved = ref<any>({});
    const blogsRegister = ref<any>({});
    const idUser = localStorage.getItem("idUser");
    const unApprovedBlogs = ref<any>({});
    querySnapshot.forEach(async (doc) => {
      const blog = doc.data();
      var size = Object.keys(blogs.value).length;
      if (size < 20) {
        // unapprove -> for normal user
        blogs.value[doc.id] = {
          id: doc.id,
          ...blog,
        };
      }
      if (blog.idUser == idUser) {
        blogsRegister.value[doc.id] = {
          id: doc.id,
          ...blog,
        };
      }
      // Separate two store - first is approved+remove course unlocked and second is unapproved
      if (blog.isApproved === true) {
        blogsApproved.value[doc.id] = {
          id: doc.id,
          ...blog,
        };
        blogsArray.value.push({
          id: doc.id,
          ...blog,
        });

        // IF THE COURSE IS NEW -> ADD TO NEWCOURSES STORE
        const newBlog = useCheckNewItem(blog);
        if (newBlog) {
          newBlogs.value[doc.id] = {
            ...newBlog,
            id: doc.id,
          };
        }
      } else if (blog.isApproved === false) {
        // unapprove -> for admin
        unApprovedBlogs.value[doc.id] = {
          id: doc.id,
          ...blog,
        };
      }
    });
    blogsStore.blogs = blogs.value;
    blogsStore.blogsRegister = blogsRegister.value;
    blogsStore.blogsArray = blogsArray.value;
    blogsStore.blogsApproved = blogsApproved.value;
    blogsStore.newBlogs = newBlogs.value;
    blogsStore.unApprovedBlogs = unApprovedBlogs.value;
    loaderStore.isLoading = false;
  } catch (error) {
    console.log(error);
    alert("An error occurred");
  }
};

export const useUpdateBlogStore = async (updateBlog: any, id: string) => {
  try {
    const docRef = doc(db, "blogs", id);
    const dataUpdate = await updateDoc(docRef, updateBlog);
    console.log(
      "A New Document Field has been updated to an existing document",
      updateBlog,
      dataUpdate
    );
    useGetBlogsStore();
  } catch (error) {
    console.log(error);
  }
};

export const useAddMessageStore = async (message: any) => {
  try {
    const docRef = await addDoc(collection(db, "messages"), message);
    console.log("Document written with ID: ", docRef.id);
    alert("Sended");
  } catch (error) {
    console.log(error);
    alert("Somethings went wrong! :((");
  }
};
