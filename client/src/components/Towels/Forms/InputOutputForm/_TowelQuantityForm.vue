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

    <v-row>
      <v-col cols="12" class="pb-0 pt-2">
        <div class="d-flex alig-center justify-center align-items-center pa-3">
          <div id="quantityWrapper" class="pa-1" style="max-width:160px">
            <v-form
              id="inputOutputTowelForm"
              ref="inputOutputTowelForm"
              v-model="blnValid"
              lazy-validation
              @submit.prevent="validate"
            >
              <v-combobox
                autocomplete="off"
                ref="locationsSelector"
                id="locationsSelector"
                name="locationsSelector"
                label="Location"
                hint="Select Locaion from list "
                v-model="selectedLocation"
                :items="locations"
                outlined
                dense
                :rules="fieldRules.location"
                class="text-body-1"
              ></v-combobox>

              <v-text-field
                autofocus
                autocomplete="off"
                hide-details="auto"
                class="mr-2"
                dense
                v-model="selectedQuantity"
                name="quantity"
                label="QTY"
                hint="How many to add or subtract"
                outlined
                height="60px"
                min-width="140px"
                :rules="fieldRules.quantity"
                @keydown.enter="handleSave"
              ></v-text-field>
            </v-form>
          </div>
          <div class="d-flex align-center justify-center mx-3">
            <v-btn :disabled="!blnValid" type="submit" large color="secondary" @click.prevent="handleSave"
              ><v-icon class="mr-2">fa fa-save</v-icon>{{ actionTitle }}</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
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
    selectedLocation: "",
    selectedQuantity: "",
  }),
  computed: {
    actionTitle() {
      if (this.scanMethod === "IN") return "Add";
      if (this.scanMethod === "OUT") return "Subtract";
      return "";
    },
  },
  methods: {
    handleCancel() {
      this.$emit("clearSelectedTowel");
    },
    validate() {
      return this.$refs.inputOutputTowelForm.validate();
    },
    async handleSave() {
      if (!this.validate()) return false;
      const { selectedLocation, selectedQuantity, selectedTowel } = this;

      let towel = false;
      switch (this.scanMethod) {
        case "IN":
          towel = {
            ...selectedTowel,
            brand: selectedTowel.brand._id,
            location: {
              ...selectedTowel.location,
              [selectedLocation.value]: {
                quantity:
                  Number(selectedTowel.location[selectedLocation.value].quantity) + Number(selectedQuantity),
              },
            },
          };
          break;
        case "OUT":
          towel = {
            ...selectedTowel,
            brand: selectedTowel.brand._id,
            location: {
              ...selectedTowel.location,
              [selectedLocation.value]: {
                quantity:
                  Number(selectedTowel.location[selectedLocation.value].quantity) - Number(selectedQuantity),
              },
            },
          };
          break;
      }

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
