<template>
  <div class="w-100">
    <v-data-table
      :headers="headers"
      :loading="loading"
      loading-text="Searching Database"
      :items="logData"
    >
      <template v-slot:item._towel="{ item }">
        <div class="d-flex align-center justify-start text-caption pa-1">
          <div
            class="mr-5 align-center justify-center text-h6"
            style="min-width:100px"
          >
            {{ item._towel.quantity }}
          </div>
          <div class="d-flex flex-column align-start justify-start pa-1">
            <h3 class="body-1">
              {{ item._towel.color }}
            </h3>
            <div class="caption">
              {{ item._towel.brand.name }}
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.values="{ item }">
        <div class="text-caption" v-if="item.action == 'UPDATE_TOWEL'">
          {{ formatLogEntry(item).msg | capitalize }}
        </div>
        <div class="text-caption" v-else>
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
const diff = require("deep-diff").diff;
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
  },
  methods: {
    formatLogEntry({ values }) {
      const { towelBefore = false, towelAfter = false } = values;
      if (towelBefore && towelAfter) {
        const fields = diff(towelBefore, towelAfter).filter(
          entry => entry.path != "updatedAt"
        );

        return (values = fields.map(entry => {
          return {
            msg: `${entry.path} updated from ${entry.lhs ||
              "empty"} to ${entry.rhs || "empty"}`
          };
        })).pop();
      }
      return values;
    }
  }
};
</script>

<style scoped></style>
