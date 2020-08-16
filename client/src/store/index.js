import Vue from "vue";
import Vuex from "vuex";

import api from "./api";
import towels from "@/components/Towels/store";
//import brands from "@/components/Brands/store";
import audit from "@/components/AuditLog/store";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    api,
    towels,
    audit
  }
});
