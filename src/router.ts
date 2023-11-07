import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue"
import Register from "./views/RegisterView.vue"
const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});


export default router;