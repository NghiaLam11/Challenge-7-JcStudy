import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import Blogs from "./views/BlogsView.vue";
import Contact from "./views/ContactView.vue";
import Courses from "./views/CoursesView.vue";
import CourseDetails from "./views/CourseDetailsView.vue";
import SignUp from "./views/SignUpView.vue";
import SignIn from "./views/SignInView.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/blogs", component: Blogs },
  { path: "/courses", component: Courses },
  { path: "/courses/:idCourse/:chapter/:idLesson", component: CourseDetails },
  { path: "/signin", component: SignIn },
  { path: "/signup", component: SignUp },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
