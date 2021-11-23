<template>
  <v-dialog
    v-model="dialog"
    width="500"
    scrollable
    overlay-color="grey darken-2"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        class="pr-0 pl-2 white--text textShadow"
        style="min-width:35px"
        color="blue"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small class="mr-2">fa fa-edit</v-icon>
      </v-btn>
    </template>

    <UpdateForm :dialog.sync="dialog" :towel="towel" />
  </v-dialog>
</template>

<script>
import UpdateForm from "./_UpdateForm";

export default {
  props: {
    towel: [Boolean, Object]
  },
  components: {
    UpdateForm
  },
  data: () => ({
    dialog: false
  })
};
</script>

<style scoped></style>
