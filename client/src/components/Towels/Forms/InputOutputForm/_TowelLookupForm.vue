<template>
  <v-card-text key="_TowelLookupForm" class="pa-0">
    <v-row>
      <v-col cols="12" class="pb-0 pt-2">
        <div class="ma-0 text-left text-h5 white--text">
          Lookup Towel by UPC
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div id="upcWrapper">
          <v-text-field
            clearable
            autofocus
            autocomplete="off"
            hide-details="auto"
            class="mr-2"
            dense
            :value="upc"
            @input="onUpcChange"
            name="upc"
            label="UPC"
            hint="Enter the towel UPC"
            outlined
            height="60px"
            @keyup="handleUPCSearch"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pb-0 pt-2">
        <div class="ma-0 text-left text-h5 white--text">
          Or Lookup Towel by Color
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div id="colorWrapper" class="">
          <v-autocomplete
            class="pa-0"
            :value="selectedTowel"
            @change="onChange"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="color"
            item-value="_id"
            placeholder="Start typing to Search"
            return-object
            height="60px"
          >
            <template slot="item" slot-scope="{ item }" class="">
              <AutoCompleteList :towel="item" />
            </template>
          </v-autocomplete>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-0">
        <SelectedTowel :towel="selectedTowel" :onNext="onContinue" />
      </v-col>
    </v-row>
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
    upc: [String],
    selectedTowel: [Object, Boolean],
    showForm: [String]
  },
  components: {
    SelectedTowel,
    AutoCompleteList
  },
  data: () => ({
    fieldRules,
    towels: [],
    isLoading: false,
    search: null
  }),
  computed: {
    items() {
      return this.towels;
    }
  },
  methods: {
    onContinue() {
      this.$emit("update:showForm", "QTY");
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
          return: true
        });
        if (towel.length === 0) this.$toastr.e("No Towel found with given UPC");
        if (towel.length === 1) {
          this.$emit("update:selectedTowel", towel[0]);
          this.$emit("update:showForm", "QTY");
        }
      }
    }, 500)
  },
  watch: {
    async search(filter) {
      this.isLoading = true;
      try {
        const items = await this.$store.dispatch(`towels/${SEARCH_TOWELS}`, {
          filter,
          return: true
        });
        if (items) this.towels = items;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    }
  }
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
