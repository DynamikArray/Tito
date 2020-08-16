<template>
  <v-dialog
    v-model="dialog"
    width="500"
    scrollable
    overlay-color="grey darken-2"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex align-center justify-center ">
        <v-btn
          v-bind="attrs"
          v-on="on"
          x-large
          color="primary"
          class="text-h4 mx-1"
          @click="scanMethod = `IN`"
          ><v-icon x-large class="mr-2">fa fa-plus-circle</v-icon>Scan In</v-btn
        >

        <div class="mx-10">
          <h4 class="text-h4 white--text">OR</h4>
        </div>

        <v-btn
          v-bind="attrs"
          v-on="on"
          x-large
          color="primary"
          class="text-h4 mx-1"
          @click="scanMethod = `OUT`"
          ><v-icon x-large class="mr-2">fa fa-minus-circle</v-icon> Scan
          Out</v-btn
        >
      </div>
    </template>

    <FormContainer :dialog.sync="dialog" :scanMethod="scanMethod" />
  </v-dialog>
</template>

<script>
import FormContainer from "./FormContainer";

export default {
  components: {
    FormContainer
  },
  data: () => ({
    dialog: false,
    scanMethod: false
  })
};
</script>

<style scoped></style>
