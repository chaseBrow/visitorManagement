import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Projects from "../views/Projects.vue";
import Team from "../views/Team";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects
  },
  {
    path: "/Team",
    name: "team",
    component: Team
  }
];

const router = new VueRouter({
  routes
});

export default router;
