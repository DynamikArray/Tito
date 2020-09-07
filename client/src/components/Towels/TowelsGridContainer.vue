<template>
  <div class="d-flex flex-column">
    <div
      v-if="showHeader"
      class="d-flex flex-row justify-space-between xs-justify-center flex-wrap"
    >
      <div class="d-flex justify-center align-center my-3 mx-3">
        <v-card class="">
          <v-card-text class="white--text">
            <div class="d-flex justify-start align-center">
              <div class="d-flex justify-center align-start text-h4 mx-2">
                All Towels
              </div>
              <div class="d-flex justify-center align-start text-h4 mx-2">
                <b>{{ totalTowels }}</b>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <div class="d-flex justify-end align-center my-3 mx-3">
        <AddTowelModal class="d-flex mx-2" />
        <AddBrandModal class="d-flex mx-2" />
      </div>
    </div>

    <v-divider class="my-1"></v-divider>
    <v-card class="mt-5">
      <v-card-text class="pa-0">
        <TowelsGrid :towels="towels" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_TOWELS } from "@/components/Towels/store/actionTypes.js";
import TowelsGrid from "./TowelsGrid/TowelsGrid";

import AddTowelModal from "./Forms/CreateTowel/CreateModal";
import AddBrandModal from "@/components/Brands/CreateBrand/CreateModal";

export default {
  props: {
    showHeader: {
      type: [Boolean],
      default: true
    }
  },
  components: {
    TowelsGrid,
    AddTowelModal,
    AddBrandModal
  },
  mounted() {
    this.$store.dispatch(`towels/${SEARCH_TOWELS}`, { sort: "-quantity" });
  },
  computed: {
    ...mapGetters({
      towels: "towels/getTowels",
      loading: "towels/getLoading"
    }),
    totalTowels() {
      return this.towels.reduce((acc, towel) => {
        return Number(acc) + Number(towel.quantity);
      }, 0);
    }
  }
};
</script>

<style scoped></style>
