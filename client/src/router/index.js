import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { USER_CHECK } from "@/components/User/store/actionTypes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/towels",
    name: "Towels",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Towels.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/audit",
    name: "Audit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Audit.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  //Requires Authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthed = await store.dispatch(`user/${USER_CHECK}`);
    if (isAuthed) next();
    if (!isAuthed) {
      if (from.name !== "Login") next("/login");
    }
  } else {
    //NO AUTH REQUIRED
    next();
  }
});

export default router;
