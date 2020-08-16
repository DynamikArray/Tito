<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row class="justify-center">
      <v-card class="grey darken-4 py-4 mb-4">
        <v-card-text>
          <div class="d-flex align-end justify-center mb-5">
            <div class="d-flex align-end justify-start">
              <v-img
                class="ma-0"
                max-width="70px"
                src="@/assets/images/towels_icon_large.png"
              />
            </div>
            <div class="d-flex align-start justify-start">
              <h1 class="text-center text-h2 my-0 white--text">TITO</h1>
            </div>
          </div>

          <div class="d-flex align-center justify-center ">
            <InputOutputModal />
          </div>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row class="justify-start align-self-stretch" no-gutters>
      <v-col>
        <TowelsGridContainer :showHeader="false" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import BarcodeReader from "@/components/Towels/BarcodeReader/BarcodeReader";

import TowelsGridContainer from "@/components/Towels/TowelsGridContainer";
import InputOutputModal from "@/components/Towels/Forms/InputOutputForm/InputOutputModal";

export default {
  name: "Home",
  components: {
    TowelsGridContainer,
    InputOutputModal
  },
  data: () => ({
    showInputOutputForm: false
  }),
  methods: {
    towelsOut() {
      this.showInputOutputForm = true;
    },
    towelsIn() {
      this.showInputOutputForm = true;
    }
  }
};
</script>
