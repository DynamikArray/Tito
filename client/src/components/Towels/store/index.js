import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL } from "@/store/api/actionTypes";

import {
  SEARCH_TOWELS,
  CREATE_TOWEL,
  UPDATE_TOWEL,
  DELETE_TOWEL
} from "./actionTypes";
import {
  REMOVE_TOWEL_FROM_RESULTS,
  SEARCH_TOWELS_RESULTS,
  SEARCH_TOWELS_RESULTS_LOADING
} from "./mutationTypes";

const towels = {
  namespaced: true,
  state: {
    towels: [],
    loading: false
  },
  getters: {
    getTowels: state => {
      return state.towels;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [SEARCH_TOWELS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [SEARCH_TOWELS_RESULTS](state, towels) {
      state.towels = towels;
    },
    [REMOVE_TOWEL_FROM_RESULTS](state, towel) {
      state.towels = state.towels.filter(t => t._id !== towel._id);
    }
  },
  actions: {
    async [SEARCH_TOWELS]({ dispatch, commit }, params) {
      let returnResult = false;
      if (params && params.return) {
        returnResult = true;
        delete params.return;
      }

      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/towel",
          params: params,
          loading: `towels/${SEARCH_TOWELS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (returnResult) {
        if (result.data) return result.data;
      }

      if (result.data) commit(`${SEARCH_TOWELS_RESULTS}`, result.data);
    },

    async [CREATE_TOWEL]({ dispatch }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "post",
          url: "/towel",
          params: params,
          loading: `towels/${SEARCH_TOWELS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (result.data) {
        if (result.data._id) return true;
      }
    },

    async [UPDATE_TOWEL]({ dispatch }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "put",
          url: `/towel/${params._id}`,
          params: params,
          loading: `towels/${SEARCH_TOWELS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (result.data) {
        if (result.data._id) return true;
      }
    },

    async [DELETE_TOWEL]({ dispatch }, params) {
      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "delete",
          url: `/towel/${params._id}`,
          params: params,
          loading: `towels/${SEARCH_TOWELS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (result.data) {
        if (result.data._id) {
          //we need to remove from our state value?
          this.commit(`towels/${REMOVE_TOWEL_FROM_RESULTS}`, result.data);
          return true;
        }
      }
    }
  }
};

export default towels;
