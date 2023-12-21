<template>
  <v-dialog v-model="dialog" width="450" scrollable overlay-color="grey darken-2" persistent>
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex align-center justify-center flex-wrap ">
        <div class="d-flex flex-column align-center">
          <v-btn
            v-bind="attrs"
            v-on="on"
            x-large
            color="primary"
            class="text-h4 mx-1"
            @click="scanMethod = `IN`"
          >
            <v-icon x-large class="mr-2">fas fa-sign-in-alt</v-icon>
            Scan In
          </v-btn>
          <div class="text-subtitle-1 font-weight-light">Add to Inventory</div>
        </div>

        <div class="d-flex flex-column align-center mx-4">
          <v-btn
            v-bind="attrs"
            v-on="on"
            x-large
            color="primary"
            class="text-h4 mx-1"
            @click="scanMethod = `OUT`"
            ><v-icon x-large class="mr-2">fas fa-sign-out-alt</v-icon>Scan Out</v-btn
          >
          <div class="text-subtitle-1 font-weight-light">Remove From Inventory</div>
        </div>

        <div class="d-flex flex-column align-center">
          <v-btn
            v-bind="attrs"
            v-on="on"
            x-large
            color="primary"
            class="text-h4 mx-1"
            @click="scanMethod = `TRANSFER`"
            ><v-icon x-large class="mr-2">fas fa-exchange-alt</v-icon>Transfer</v-btn
          >
          <div class="text-subtitle-1 font-weight-light">Transfer Between Locations</div>
        </div>
      </div>
    </template>

    <FormContainer :dialog.sync="dialog" :scanMethod="scanMethod" />
  </v-dialog>
</template>

<script>
import FormContainer from "./FormContainer";

export default {
  components: {
    FormContainer,
  },
  data: () => ({
    dialog: false,
    scanMethod: false,
  }),
};
</script>

<style scoped></style>
