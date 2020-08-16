import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { MAKE_API_CALL } from "@/store/api/actionTypes";

import { SEARCH_LOGS } from "./actionTypes";
import {
  SEARCH_LOGS_RESULTS,
  SEARCH_LOGS_RESULTS_LOADING
} from "./mutationTypes";

const auditLogs = {
  namespaced: true,
  state: {
    logs: [],
    loading: false
  },
  getters: {
    getLogs: state => {
      return state.logs;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    [SEARCH_LOGS_RESULTS_LOADING](state, { loading }) {
      state.loading = loading;
    },
    [SEARCH_LOGS_RESULTS](state, logs) {
      state.logs = logs;
    }
  },
  actions: {
    async [SEARCH_LOGS]({ dispatch, commit }, params) {
      let returnResult = false;
      if (params && params.return) {
        returnResult = true;
        delete params.return;
      }

      const result = await dispatch(
        `api/${MAKE_API_CALL}`,
        {
          method: "get",
          url: "/audit",
          params: params,
          loading: `audit/${SEARCH_LOGS_RESULTS_LOADING}`
        },
        { root: true }
      );

      if (returnResult) {
        if (result.data) return result.data;
      }

      if (result.data) commit(`${SEARCH_LOGS_RESULTS}`, result.data);
    }
  }
};

export default auditLogs;
