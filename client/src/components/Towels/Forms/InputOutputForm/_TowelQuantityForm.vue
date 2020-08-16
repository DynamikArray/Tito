<template>
  <v-card-text key="_TowelQuantityForm" class="pa-0">
    <v-row>
      <v-col cols="12" class="pb-0 pt-2">
        <div class="ma-0 text-left text-body-1">
          <SelectedTowel
            :handleCancel="handleCancel"
            :towel="selectedTowel"
            hideOnNext
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
              <v-text-field
                autofocus
                autocomplete="off"
                hide-details="auto"
                class="mr-2"
                dense
                v-model="quantity"
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
            <v-btn
              :disabled="!blnValid"
              type="submit"
              large
              color="secondary"
              @click.prevent="handleSave"
              ><v-icon class="mr-2">fa fa-save</v-icon>{{ actionTitle }}</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import {
  SEARCH_TOWELS,
  UPDATE_TOWEL
} from "@/components/Towels/store/actionTypes";

import SelectedTowel from "./fields/SelectedTowel";
import fieldRules from "../fieldRules";

export default {
  props: {
    handleCancel: [Function],
    scanMethod: [String],
    selectedTowel: [Object, Boolean]
  },
  components: {
    SelectedTowel
  },
  data: () => ({
    blnValid: false,
    quantity: "",
    fieldRules
  }),
  computed: {
    actionTitle() {
      if (this.scanMethod === "IN") return "Add";
      if (this.scanMethod === "OUT") return "Subtract";
      return "";
    }
  },
  methods: {
    validate() {
      return this.$refs.inputOutputTowelForm.validate();
    },
    async handleSave() {
      if (!this.validate()) return false;
      const { quantity, selectedTowel } = this;

      let towel = false;
      switch (this.scanMethod) {
        case "IN":
          towel = {
            quantity: Number(selectedTowel.quantity) + Number(quantity),
            _id: selectedTowel._id
          };
          break;
        case "OUT":
          towel = {
            quantity: Number(selectedTowel.quantity) - Number(quantity),
            _id: selectedTowel._id
          };
          break;
      }

      if (towel) {
        const result = await this.$store.dispatch(
          `towels/${UPDATE_TOWEL}`,
          towel
        );

        if (result) {
          this.$toastr.s("Towels Updated");
          this.$store.dispatch(`towels/${SEARCH_TOWELS}`, {});
          this.handleCancel();
        }
      }
    }
  }
};
</script>

<style>
#inputOutputTowelForm .v-messages {
  text-align: center;
}
</style>
