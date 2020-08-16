<template>
  <v-card>
    <v-card-title class="primary headline">
      <h3 class="white--text textShadow text-h3">
        <v-icon large class="mr-2">{{ cardTitleIcon }}</v-icon>
        {{ cardTitle }}
      </h3>
    </v-card-title>

    <v-card-text class="px-3">
      <v-slide-y-transition mode="out-in">
        <TowelLookupForm
          v-if="showForm === 'LOOKUP'"
          :selectedTowel.sync="selectedTowel"
          :upc.sync="upc"
          :showForm.sync="showForm"
        />
        <TowelQuantityForm
          v-if="showForm === 'QTY'"
          :selectedTowel.sync="selectedTowel"
          :showForm.sync="showForm"
          :scanMethod="scanMethod"
          :handleCancel="clearSelectedTowel"
        />
      </v-slide-y-transition>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="error" @click.prevent="handleCancel">
        <v-icon class="mr-2">fa fa-times-circle</v-icon>Cancel
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import TowelLookupForm from "./_TowelLookupForm";
import TowelQuantityForm from "./_TowelQuantityForm";

export default {
  props: {
    dialog: [Boolean],
    scanMethod: [String]
  },
  components: {
    TowelLookupForm,
    TowelQuantityForm
  },
  data: () => ({
    upc: "",
    selectedTowel: false,
    showForm: "LOOKUP"
  }),
  computed: {
    cardTitle() {
      if (this.scanMethod === "IN") return "Scan In Towel";
      if (this.scanMethod === "OUT") return "Scan Out Towel";
      return "";
    },
    cardTitleIcon() {
      if (this.scanMethod === "IN") return "fa fa-plus-circle";
      if (this.scanMethod === "OUT") return "fa fa-minus-circle";
      return "";
    }
  },
  methods: {
    handleCancel() {
      this.showForm = "LOOKUP";
      this.selectedTowel = null;
      this.upc = "";
      this.$emit("update:dialog", false);
    },
    clearSelectedTowel() {
      this.selectedTowel = null;
      this.showForm = "LOOKUP";
    }
  }
};
</script>

<style scoped></style>
