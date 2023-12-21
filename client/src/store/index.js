import Vue from "vue";
import Vuex from "vuex";

import api from "./api";
import user from "@/components/User/store";
import towels from "@/components/Towels/store";
import brands from "@/components/Brands/store";
import retailers from "@/components/Retailers/store";
import audit from "@/components/AuditLog/store";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    api,
    user,
    towels,
    brands,
    retailers,
    audit,
  },
});
