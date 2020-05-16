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
    path: "/Calendar",
    name: "calendar",
    component: Calendar
  },
  {
    path: "/Settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/Engagements",
    name: "engagements",
    component: Engagements
  }
];

const router = new VueRouter({
  routes
});

export default router;
