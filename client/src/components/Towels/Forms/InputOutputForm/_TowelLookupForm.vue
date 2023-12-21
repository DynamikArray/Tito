<template>
  <v-card-text key="_TowelLookupForm" class="pa-0">
    <div class="text-center my-2 mx-2">
      <h3 v-if="scanMethod === 'IN'">Add more towels to your existing quantites</h3>
      <h3 v-if="scanMethod === 'OUT'">Remove towels from your existing quantites</h3>
    </div>

    <div class="d-flex flex-column  align-center justify-center w-100">
      <div
        class="d-flex flex-column align-center justify-center w-100"
        :class="scanMethod == 'OUT' ? 'mt-5' : 'mt-2'"
      >
        <div id="colorWrapper" class="w-100">
          <v-autocomplete
            label="Search by color"
            outlined
            dense
            :autofocus="true"
            class="pa-0"
            :value="selectedTowel"
            @change="onChange"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            item-text="color"
            item-value="_id"
            placeholder="Or Lookup Towel by Color"
            return-object
            height="60px"
          >
            <template slot="item" slot-scope="{ item }" class="">
              <AutoCompleteList :towel="item" />
            </template>
          </v-autocomplete>

          <SelectedTowel :towel="selectedTowel" :onNext="onContinue" />
        </div>
      </div>

      <div class="w-100 my-2" v-if="upcScanningIsEnabled">
        <v-divider class="my-2 w-100"></v-divider>

        <div class="ma-0 text-center text-h5 white--text">
          Lookup Towel by UPC
        </div>
        <div id="upcWrapper" class="w-100">
          <v-text-field
            clearable
            autocomplete="off"
            hide-details="auto"
            class="mr-2"
            dense
            :value="upcValue"
            @input="onUpcChange"
            name="upc"
            label="UPC"
            hint="Enter the towel UPC"
            outlined
            height="60px"
            @keyup="handleUPCSearch"
          ></v-text-field>
        </div>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import debounce from "lodash.debounce";

import { SEARCH_TOWELS } from "@/components/Towels/store/actionTypes";
import fieldRules from "../fieldRules";
import SelectedTowel from "./fields/SelectedTowel";
import AutoCompleteList from "./fields/AutoCompleteList";

export default {
  props: {
    upc: [Boolean, String],
    selectedTowel: [Object, Boolean],
    showForm: [String],
    scanMethod: [String],
  },
  components: {
    SelectedTowel,
    AutoCompleteList,
  },
  data: () => ({
    fieldRules,
    towels: [],
    isLoading: false,
    search: null,
  }),
  computed: {
    upcScanningIsEnabled() {
      return !!this.$featureFlags.upcScanningIsEnabled;
    },
    upcValue() {
      if (!this.upc) return "";
      return this.upc;
    },
    items() {
      return this.towels;
    },
  },
  methods: {
    onContinue() {
      if (this.scanMethod === "TRANSFER") {
        this.$emit("update:showForm", "TRANSFER");
      } else {
        this.$emit("update:showForm", "QTY");
      }
    },
    onChange(val) {
      this.$emit("update:selectedTowel", val);
    },
    onUpcChange(val) {
      this.$emit("update:upc", val);
    },

    handleUPCSearch: debounce(async function() {
      if (this.upc.length > 5) {
        const towel = await this.$store.dispatch(`towels/${SEARCH_TOWELS}`, {
          upc: this.upc,
          return: true,
        });
        if (towel.length === 0) this.$toastr.e("No Towel found with given UPC");
        if (towel.length === 1) {
          this.$emit("update:selectedTowel", towel[0]);
          this.onContinue();
        }
      }
    }, 500),
  },
  watch: {
    async search(filter) {
      this.isLoading = true;
      try {
        const items = await this.$store.dispatch(`towels/${SEARCH_TOWELS}`, {
          filter,
          return: true,
        });
        if (items) this.towels = items;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
#upcWrapper input,
#qtyWrapper input,
#colorWrapper input,
#quantityWrapper input {
  font-size: 30px;
  text-align: center;
}
</style>
