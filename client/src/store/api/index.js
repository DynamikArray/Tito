import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import axiosClient from "@/util/axios";

import { MAKE_API_CALL } from "./actionTypes";
import { ADD_API_CALL, REMOVE_API_CALL } from "./mutationTypes";

const api = {
  namespaced: true,
  state: {
    loading: false
  },
  getters: {},
  mutations: {
    [ADD_API_CALL](state) {
      state.loading++;
    },
    [REMOVE_API_CALL](state) {
      state.loading--;
    }
  },
  actions: {
    async [MAKE_API_CALL]({ commit }, payload) {
      const { headers, method, url, params, loading } = payload;

      //commit the loading mutation for our indicator
      if (loading) commit(loading, { loading: true }, { root: true });

      let config = { headers, method, url: `${url}` };
      //set params for request
      if (method === "post") config.data = { ...params };
      if (method === "get") config.params = { ...params };
      if (method === "put") config.data = { ...params };

      try {
        commit(`${ADD_API_CALL}`);
        return await axiosClient({
          ...axiosClient.defaults,
          ...config
        });
      } catch (e) {
        this.$app.$toastr.e(e.message);
        return false;
        //throw e;
      } finally {
        commit(`${REMOVE_API_CALL}`);
        if (loading) commit(loading, { loading: false }, { root: true });
      }
    }
  }
};

export default api;
