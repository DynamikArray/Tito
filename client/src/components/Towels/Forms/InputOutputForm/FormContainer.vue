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
          :scanMethod="scanMethod"
        />
        <TowelQuantityForm
          v-if="showForm === 'QTY'"
          :selectedTowel.sync="selectedTowel"
          :showForm.sync="showForm"
          :scanMethod="scanMethod"
          :handleSaved="handleSaved"
          @clearSelectedTowel="clearSelectedTowel"
        />
        <TowelTransferForm
          v-if="showForm === 'TRANSFER'"
          :selectedTowel.sync="selectedTowel"
          :showForm.sync="showForm"
          :scanMethod="scanMethod"
          :handleSaved="handleSaved"
          @clearSelectedTowel="clearSelectedTowel"
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
import TowelTransferForm from "./_TowelTransferForm";

export default {
  props: {
    dialog: [Boolean],
    scanMethod: [String],
  },
  components: {
    TowelLookupForm,
    TowelQuantityForm,
    TowelTransferForm,
  },
  data: () => ({
    upc: false,
    selectedTowel: false,
    showForm: "LOOKUP",
  }),
  computed: {
    cardTitle() {
      if (this.scanMethod === "IN") return "Scan In Towel";
      if (this.scanMethod === "OUT") return "Scan Out Towel";
      if (this.scanMethod === "TRANSFER") return "Transfer Towels";
      return "";
    },
    cardTitleIcon() {
      if (this.scanMethod === "IN") return "fa fa-plus-circle";
      if (this.scanMethod === "OUT") return "fa fa-minus-circle";
      if (this.scanMethod === "TRANSFER") return "fa fa-exchange-alt";
      return "";
    },
  },
  methods: {
    handleCancel() {
      this.showForm = "LOOKUP";
      this.selectedTowel = null;
      this.upc = false;
      this.$emit("update:dialog", false);
    },
    handleSaved() {
      this.upc = false;
      this.showForm = "LOOKUP";
      this.selectedTowel = null;
    },
    clearSelectedTowel() {
      this.selectedTowel = null;
      this.showForm = "LOOKUP";
    },
  },
};
</script>

<style scoped></style>
