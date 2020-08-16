<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row class="justify-start align-self-stretch" no-gutters>
      <v-col>
        <TowelsGridContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TowelsGridContainer from "@/components/Towels/TowelsGridContainer";

export default {
  name: "Towels",
  components: {
    TowelsGridContainer
  }
};
</script>
