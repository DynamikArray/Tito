<template>
  <v-container fluid class="pa-0 fill-height align-start">
    <v-row class="">
      <v-col>
        <LettersContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LettersContainer from "@/components/Letters/LettersContainer";

export default {
  name: "Letters",
  components: {
    LettersContainer
  }
};
</script>
