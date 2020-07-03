import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Calendar from "../views/Calendar.vue";
import Engagements from "../views/Engagements";
import Settings from "../views/Settings";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/Account",
    name: "account",
    component: Account
  },
  {
    path: "/VisitHistory",
    name: "visitHistory",
    component: VisitHistory
  }
];

const router = new VueRouter({
  routes
});

export default router;
