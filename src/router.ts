import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import Blogs from "./views/BlogsView.vue";
import Auth from "./views/AuthView.vue";
import Contact from "./views/ContactView.vue";
import RegistrationForm from "./views/RegistrationFormView.vue";
import Utilities from "./views/UtilitiesView.vue";
import Courses from "./views/CoursesView.vue";
import CourseDetails from "./views/CourseDetailsView.vue";
import SignUp from "./views/SignUpView.vue";
import SignIn from "./views/SignInView.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/auth", component: Auth },
  { path: "/blogs", component: Blogs },
  { path: "/utilities", component: Utilities },
  { path: "/courses", component: Courses },
  { path: "/course-register", component: RegistrationForm },
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
