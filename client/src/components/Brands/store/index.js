import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL } from "@/store/api/actionTypes";

import { SEARCH_BRANDS, CREATE_BRAND } from "./actionTypes";
import {
  SEARCH_BRANDS_RESULTS,
  SEARCH_BRANDS_RESULTS_LOADING
} from "./mutationTypes";

const brands = {
  namespaced: true,
  state: {
    brands: [],
    loading: false
  },
  getters: {
    getBrands: state => {
      return state.brands;
    }
  },
  mutations: {
    [SEARCH_BRANDS_RESULTS_LOADING](state, loading) {
      state.loading = loading;
    },
    [SEARCH_BRANDS_RESULTS](state, towels) {
      state.brands = towels;
    }
  },
  actions: {
    async [SEARCH_BRANDS]({ dispatch, commit }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/brand",
          params: params,
          loading: `brands/${SEARCH_BRANDS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (result.data) commit(`${SEARCH_BRANDS_RESULTS}`, result.data);
    },

    async [CREATE_BRAND]({ dispatch }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "post",
          url: "/brand",
          params: params,
          loading: `brands/${SEARCH_BRANDS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (result.data) {
        if (result.data._id) return true;
      }
    }
  }
};

export default brands;
