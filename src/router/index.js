import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Account from "../views/Account.vue";
import VisitHistory from "../views/VisitHistory.vue";
import Home from "../views/Home.vue";
import Parse from "parse";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/Dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Account",
    name: "account",
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/VisitHistory",
    name: "visitHistory",
    component: VisitHistory,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

async function testLogin() {
  //await Parse.User.logIn("testUser", "password");
  // Parse.User.logOut();
}
  

router.beforeEach((to, from, next) => {
  testLogin().then( () => {
    const User = Parse.User.current();
    if (to.meta.requiresAuth == true && User) {
      next();
    }
    else if (to.meta.requiresAuth == true && !User){
      next('/');
    }
    else next();
  });
});


export default router;
