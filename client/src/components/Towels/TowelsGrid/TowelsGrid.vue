<template>
  <div class="d-flex align-self-stretch flex-grow-1">
    <v-data-table
      style="width:100%"
      :headers="headers"
      :loading="loading"
      loading-text="Searching Database"
      :items="towels"
    >
      <template v-slot:item.updatedAt="{ item }">
        <div class="text-caption">
          {{ item.updatedAt | dateTime }}
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <UpdateTowel :towel="item" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import UpdateTowel from "../Forms/UpdateTowel/UpdateModal";

import { tableHeaders } from "./tableHeaders.js";
export default {
  props: {
    loading: [Boolean],
    towels: [Boolean, Array]
  },
  components: {
    UpdateTowel
  },
  data: () => ({
    headers: tableHeaders
  }),
  methods: {
    updateTowel(towel) {
      console.log("UPDATE THIS TOWEL", towel);
    }
  }
};
</script>

<style scoped></style>
