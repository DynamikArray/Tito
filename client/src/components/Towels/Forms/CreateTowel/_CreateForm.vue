<template>
  <v-card>
    <v-card-title class="primary headline"
      ><h3 class="white--text textShadow">
        <v-icon class="mr-2">fa fa-plus-circle</v-icon>
        Add A New Towel
      </h3>
    </v-card-title>

    <v-card-text class="px-4">
      <v-form ref="createTowelForm" v-model="blnValidTowel" lazy-validation @submit.prevent="validateTowel">
        <!-- UPC -->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-text-field
              autofocus
              autocomplete="off"
              hide-details="auto"
              class="mr-2"
              dense
              v-model="towel.upc"
              name="upc"
              label="UPC"
              hint="Enter the towel UPC"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- LOCATION AND QUANTITY -->
        <v-row>
          <v-col cols="6">
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
            ></v-combobox>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="number"
              autocomplete="off"
              hide-details="auto"
              class="ml-2"
              dense
              v-model="selectedQuantity"
              name="quantity"
              label="Quanity"
              hint="Enter the starting quantity"
              :rules="fieldRules.quantity"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <BrandDropdown :rules="fieldRules.brand" :brand.sync="towel.brand" :brands="brands" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="towel.color"
              autocomplete="off"
              hide-details="auto"
              dense
              name="color"
              label="Color"
              hint="Enter the towel color"
              outlined
              :rules="fieldRules.color"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="error" @click.prevent="handleCancel">
        <v-icon class="mr-2">fa fa-times-circle</v-icon>Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn type="submit" color="success" @click.prevent="handleSave">
        <v-icon class="mr-2">fa fa-save</v-icon>Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fieldRules from "../fieldRules";

import { mapGetters } from "vuex";
import { SEARCH_BRANDS } from "@/components/Brands/store/actionTypes";
import { CREATE_TOWEL, SEARCH_TOWELS } from "@/components/Towels/store/actionTypes";

import BrandDropdown from "@/components/Brands/Dropdown/BrandDropdown";

const locations = [
  { text: "Home", value: "home" },
  { text: "Warehouse", value: "warehouse" },
];

const defaultTowel = {
  upc: "",
  color: "",
  brand: "",
  location: {
    home: {
      quantity: 0,
    },
    warehouse: {
      quantity: 0,
    },
  },
};

export default {
  props: {
    dialog: [Boolean],
  },
  components: {
    BrandDropdown,
  },
  data: () => ({
    blnValidTowel: false,
    towel: { ...defaultTowel },
    fieldRules,
    locations,
    selectedLocation: "",
    selectedQuantity: "",
  }),
  computed: {
    ...mapGetters({
      brands: "brands/getBrands",
      loading: "brands/getLoading",
    }),
  },
  created() {
    this.$store.dispatch(`brands/${SEARCH_BRANDS}`, {});
  },
  methods: {
    validateTowel() {
      return this.$refs.createTowelForm.validate();
    },

    handleLocationChange(location) {
      console.log("location changed", location);
    },

    async handleSave() {
      if (!this.validateTowel()) return false;

      const { towel, selectedLocation, selectedQuantity } = this;
      towel.brand = towel.brand._id;
      towel.location[selectedLocation.value].quantity = selectedQuantity;

      const result = await this.$store.dispatch(`towels/${CREATE_TOWEL}`, towel);

      if (result) {
        this.resetTowel();
        this.$toastr.s("Towel Added");
        this.$store.dispatch(`towels/${SEARCH_TOWELS}`, {});
        this.updateDialog(false);
      }
    },
    handleCancel() {
      this.resetTowel();
      this.updateDialog(false);
      this.resetValidation();
    },
    resetTowel() {
      this.blnValidTowel = false;
      this.towel = { ...defaultTowel };
      this.selectedLocation = "";
      this.selectedQuantity = "";
      this.resetValidation();
    },
    resetValidation() {
      this.$refs.createTowelForm.resetValidation();
    },
    updateDialog(val) {
      this.$emit("update:dialog", val);
    },
  },
};
</script>

<style scoped></style>
