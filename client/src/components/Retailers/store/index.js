import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL } from "@/store/api/actionTypes";

import { SEARCH_RETAILERS, CREATE_RETAILER } from "./actionTypes";
import { SEARCH_RETAILERS_RESULTS, SEARCH_RETAILERS_RESULTS_LOADING } from "./mutationTypes";

const retailers = {
  namespaced: true,
  state: {
    retailers: [],
    loading: false,
  },
  getters: {
    getRetailers: (state) => {
      return state.retailers;
    },
  },
  mutations: {
    [SEARCH_RETAILERS_RESULTS_LOADING](state, loading) {
      state.loading = loading;
    },
    [SEARCH_RETAILERS_RESULTS](state, towels) {
      state.retailers = towels;
    },
  },
  actions: {
    async [SEARCH_RETAILERS]({ dispatch, commit }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/retailer",
          params: params,
          loading: `retailers/${SEARCH_RETAILERS_RESULTS_LOADING}`,
        },
        { root: true }
      );

      if (result.data) commit(`${SEARCH_RETAILERS_RESULTS}`, result.data);
    },

    async [CREATE_RETAILER]({ dispatch }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "post",
          url: "/retailer",
          params: params,
          loading: `retailers/${SEARCH_RETAILERS_RESULTS_LOADING}`,
        },
        { root: true }
      );

      if (result.data) {
        if (result.data._id) return true;
      }
    },
  },
};

export default retailers;
