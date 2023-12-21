<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row class="justify-start align-self-stretch" no-gutters>
      <v-col>
        <ReportsContainer @printReport="print" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ReportsContainer from "@/components/Reports/ReportsContainer";

export default {
  props: {},
  components: { ReportsContainer },
  methods: {
    print() {},
  },
};
</script>

<style scoped></style>
