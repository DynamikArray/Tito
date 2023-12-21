<template>
  <v-card-text key="_TowelQuantityForm" class="pa-0">
    <v-row>
      <v-col cols="12" class="pb-0 pt-2">
        <div class="ma-0 text-left text-body-1">
          <SelectedTowel
            :handleSaved="handleSaved"
            :towel="selectedTowel"
            hideOnNext
            :handleCancel="handleCancel"
          />
        </div>
      </v-col>
    </v-row>

    <v-divider class="mt-5"></v-divider>

    <v-form
      id="transferTowelForm"
      ref="transferTowelForm"
      v-model="blnValid"
      lazy-validation
      @submit.prevent="validate"
    >
      <v-row>
        <!-- FROM -->
        <v-col cols="6" class="pb-0 pt-2 text-center">
          <div class="text-subtitle-1">From:</div>
          <v-combobox
            autocomplete="off"
            ref="locationsSelector"
            id="locationsSelector"
            name="locationsSelector"
            label="Location"
            hint="Select Locaion from list "
            v-model="fromLocation"
            :items="locations"
            outlined
            dense
            :rules="fieldRules.location"
            class="text-body-1"
          ></v-combobox>
        </v-col>
        <!-- TO -->
        <v-col cols="6" class="pb-0 pt-2 text-center">
          <div class="text-subtitle-1">To:</div>
          <v-combobox
            disabled
            autocomplete="off"
            ref="locationsSelector"
            id="locationsSelector"
            name="locationsSelector"
            label="Location"
            hint="Select Locaion from list "
            :value="destinationLocation"
            :items="locations"
            outlined
            dense
            :rules="fieldRules.location"
            class="text-body-1"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="pb-0 pt-2">
          <div class="d-flex flex-column align-center">
            <div class="text-subtitle-1">Quantity:</div>
            <div id="quantityWrapper" class="" style="max-width:160px">
              <v-text-field
                autofocus
                autocomplete="off"
                hide-details="auto"
                class="mr-2"
                dense
                v-model="transferQuantity"
                name="quantity"
                label="QTY"
                hint="How many to add or subtract"
                outlined
                height="60px"
                min-width="140px"
                :rules="fieldRules.quantity"
                @keydown.enter="handleSave"
              ></v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- SAVE BUTTON -->
      <v-row>
        <v-col cols="12" class="pb-0 pt-0">
          <div class="d-flex alig-center justify-center align-items-center pa-3">
            <div class="d-flex align-center justify-center mx-3">
              <v-btn :disabled="!blnValid" type="submit" large color="secondary" @click.prevent="handleSave"
                ><v-icon class="mr-2">fa fa-save</v-icon>{{ actionTitle }}</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-card-text>
</template>

<script>
import { SEARCH_TOWELS, UPDATE_TOWEL } from "@/components/Towels/store/actionTypes";

import SelectedTowel from "./fields/SelectedTowel";
import fieldRules from "../fieldRules";

const locations = [
  { text: "Home", value: "home" },
  { text: "Warehouse", value: "warehouse" },
];

export default {
  props: {
    handleSaved: [Function],
    scanMethod: [String],
    selectedTowel: [Object, Boolean],
  },
  components: {
    SelectedTowel,
  },
  data: () => ({
    blnValid: false,
    fieldRules,
    locations,
    fromLocation: "",
    transferQuantity: "",
  }),
  computed: {
    actionTitle() {
      if (this.scanMethod === "IN") return "Add";
      if (this.scanMethod === "OUT") return "Subtract";
      return "";
    },
    destinationLocation() {
      if (this.fromLocation.value === "home") return this.locations[1];
      if (this.fromLocation.value === "warehouse") return this.locations[0];
      return "";
    },
  },
  methods: {
    handleCancel() {
      this.$emit("clearSelectedTowel");
    },
    validate() {
      return this.$refs.transferTowelForm.validate();
    },

    async handleSave() {
      if (!this.validate()) return false;

      //from this location subtract the quantity
      const { fromLocation, destinationLocation, selectedTowel, transferQuantity } = this;
      let towel = false;
      towel = {
        ...selectedTowel,
        brand: selectedTowel.brand._id,
        location: {
          ...selectedTowel.location,
          [fromLocation.value]: {
            quantity: Number(selectedTowel.location[fromLocation.value].quantity) - Number(transferQuantity),
          },
          [destinationLocation.value]: {
            quantity:
              Number(selectedTowel.location[destinationLocation.value].quantity) + Number(transferQuantity),
          },
        },
      };

      if (towel) {
        const result = await this.$store.dispatch(`towels/${UPDATE_TOWEL}`, towel);

        if (result) {
          this.$toastr.s("Towels Updated");
          this.$store.dispatch(`towels/${SEARCH_TOWELS}`, {});
          this.handleSaved();
        }
      }
    },
  },
};
</script>

<style>
#inputOutputTowelForm .v-messages {
  text-align: center;
}

.v-autocomplete__content .v-list {
  background-color: #424242 !important;
}

.v-autocomplete__content .v-list .v-list-item {
  border-bottom: 1px solid #212121 !important;
}
.v-autocomplete__content .v-list .v-list-item:first-child {
  border-top: 1px solid #212121 !important;
}
</style>
