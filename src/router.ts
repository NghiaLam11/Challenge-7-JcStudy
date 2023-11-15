import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import Contact from "./views/ContactView.vue";
import SignUp from "./views/SignUpView.vue";
import SignIn from "./views/SignInView.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/signin", component: SignIn },
  { path: "/signup", component: SignUp },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
