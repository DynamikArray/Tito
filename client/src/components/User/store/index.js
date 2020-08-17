import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL } from "@/store/api/actionTypes";

import { USER_LOGIN, USER_LOGOUT, USER_CHECK } from "./actionTypes";
import {
  USER_LOGIN_RESULTS,
  USER_LOGIN_LOADING,
  USER_LOGOUT_RESULTS
} from "./mutationTypes";

const user = {
  namespaced: true,
  state: {
    username: false,
    loading: false
  },
  getters: {
    getUsername: state => {
      return state.username;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [USER_LOGIN_LOADING](state, loading) {
      state.loading = loading;
    },
    [USER_LOGIN_RESULTS](state, { username, token = false }) {
      state.username = username;
      if (token) localStorage.setItem("token", token);
    },
    [USER_LOGOUT_RESULTS](state) {
      state.username = false;
      localStorage.removeItem("token");
    }
  },
  actions: {
    async [USER_LOGIN]({ dispatch, commit }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "post",
          url: "/user/login",
          params: params,
          loading: `user/${USER_LOGIN_LOADING}`
        },
        { root: true }
      );

      if (result.data) {
        const router = this.$app.$router;
        const pending = router.history.pending;

        const { username, token } = result.data;
        commit(`${USER_LOGIN_RESULTS}`, { username, token });

        if (pending) router.push(pending.path);
        if (!pending) router.push({ name: "Home" });
        return true;
      }
      return false;
    },
    async [USER_CHECK]({ dispatch, commit }, params) {
      if (!localStorage.getItem("token")) {
        this.$app.$toastr.Add({
          name: "loginRequired",
          title: "Oops, your logged out.",
          msg: "You must be logged in to continue using the application!",
          type: "error",
          timeout: 4000,
          preventDuplicates: true
        });
        return false;
      }

      if (this.state.username) return true;
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/user/account",
          params: params,
          loading: `user/${USER_LOGIN_LOADING}`
        },
        { root: true }
      );

      if (result.data) {
        const { username, token } = result.data;
        commit(`${USER_LOGIN_RESULTS}`, { username, token });
        return true;
      }
      return false;
    },
    [USER_LOGOUT]({ commit }) {
      commit(`${USER_LOGOUT_RESULTS}`);
      if (this.$app.$router.history.current.name !== "Login")
        this.$app.$router.push({ path: "login" });
    }
  }
};

export default user;
