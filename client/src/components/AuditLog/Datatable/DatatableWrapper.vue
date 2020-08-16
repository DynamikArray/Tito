<template>
  <div class="w-100">
    <v-data-table
      :headers="headers"
      :loading="loading"
      loading-text="Searching Database"
      :items="logData"
    >
      <template v-slot:item.values="{ item }">
        <div class="text-caption">
          {{ item.values }}
        </div>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        <div class="text-caption">
          {{ item.updatedAt | dateTime }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { tableHeaders } from "./tableHeaders";
export default {
  props: {
    logs: [Boolean, Array],
    loading: [Boolean]
  },
  data: () => ({
    headers: tableHeaders
  }),
  computed: {
    logData() {
      return this.logs;
    }
  }
};
</script>

<style scoped></style>
