<template>
  <div class="d-flex align-self-stretch flex-grow-1">
    <v-data-table
      style="width:100%"
      :headers="headers"
      :loading="loading"
      loading-text="Searching Database"
      :items="towels"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
      </template>

      <template v-slot:item.location="{ item }">
        <div class="text-caption">{{ sumLocationQuantities(item) }}</div>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        <div class="text-caption">
          {{ item.updatedAt | dateTime }}
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="d-flex align-center justify-center">
          <UpdateTowel :towel="item" class="mx-3" />
          <DeleteTowel :towel="item" class="mx-3" />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import UpdateTowel from "../Forms/UpdateTowel/UpdateModal";
import DeleteTowel from "../Forms/DeleteTowel/DeleteTowel";

import { tableHeaders } from "./tableHeaders.js";
export default {
  props: {
    loading: [Boolean],
    towels: [Boolean, Array],
  },
  components: {
    UpdateTowel,
    DeleteTowel,
  },
  data: () => ({
    search: "",
    headers: tableHeaders,
  }),
  methods: {
    sumLocationQuantities(item) {
      return (item.location?.home?.quantity || 0) + (item.location?.warehouse?.quantity || 0);
    },
  },
};
</script>

<style scoped></style>
