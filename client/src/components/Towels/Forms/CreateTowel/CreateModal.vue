<template>
  <v-dialog v-model="dialog" max-width="600" scrollable overlay-color="grey darken-2">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small color="secondary" dark v-bind="attrs" v-on="on">
        <v-icon small class="mr-2">fa fa-plus-circle</v-icon>Towel
      </v-btn>
    </template>

    <CreateForm :dialog.sync="dialog" />
  </v-dialog>
</template>

<script>
import CreateForm from "./_CreateForm";

export default {
  components: {
    CreateForm,
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped></style>
