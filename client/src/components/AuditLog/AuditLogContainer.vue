<template>
  <div class="d-flex flex-column align-center justify-center flex-grow-1">
    <div
      class="d-flex flex-row align-center justify-space-around flex-grow-1 w-100"
    >
      <div class="d-flex align-center justify-start flex-grow-1">
        <h1>Audit Logs</h1>
      </div>
      <div class="d-flex align-center justify-end flex-grow-1">
        <v-btn color="secondary" @click="refreshLogs"
          ><v-icon class="mr-2">fa fa-sync-alt</v-icon>Refresh</v-btn
        >
      </div>
    </div>
    <div class="w-100">
      <v-divider class="my-1"></v-divider>
    </div>
    <div class="d-flex flex-row w-100">
      <DatatableWrapper :logs="logs" :loading="logsLoading" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_LOGS } from "./store/actionTypes";
import DatatableWrapper from "./Datatable/DatatableWrapper";
export default {
  props: {},
  components: {
    DatatableWrapper
  },
  created() {
    this.fetchLogs();
  },
  computed: {
    ...mapGetters({
      logs: "audit/getLogs",
      logsLoading: "audit/getLoading"
    })
  },
  methods: {
    refreshLogs() {
      this.fetchLogs();
    },
    fetchLogs() {
      this.$store.dispatch(`audit/${SEARCH_LOGS}`);
    }
  }
};
</script>

<style scoped></style>
