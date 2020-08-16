<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row class="justify-center" no-gutters>
      <v-col>
        <div class="d-flex align-end justify-center mb-10">
          <div class="d-flex align-end justify-start">
            <v-img
              max-width="150px"
              src="@/assets/images/towels_icon_large.png"
            />
          </div>
          <div class="d-flex align-start justify-start">
            <h1 class="text-center text-h1 my-0">TITO</h1>
          </div>
        </div>

        <div class="d-flex align-center justify-center ">
          <v-btn x-large color="primary" class="text-h4 mx-1"
            ><v-icon x-large class="mr-2">fa fa-plus-circle</v-icon>Towels
            In</v-btn
          >

          <div class="mx-10">
            <h4 class="text-h4">or</h4>
          </div>
          <v-btn x-large color="primary" class="text-h4 mx-1"
            ><v-icon x-large class="mr-2">fa fa-minus-circle</v-icon>Towels
            Out</v-btn
          >
        </div>
      </v-col>
    </v-row>

    <v-row class="justify-start align-self-stretch" no-gutters>
      <v-col>
        <TowelsGridContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import BarcodeReader from "@/components/Towels/BarcodeReader/BarcodeReader";

import TowelsGridContainer from "@/components/Towels/TowelsGridContainer";

export default {
  name: "Home",
  components: {
    TowelsGridContainer
  }
};
</script>
