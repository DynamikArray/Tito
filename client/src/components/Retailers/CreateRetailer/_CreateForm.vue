<template>
  <v-card>
    <v-card-title class="primary headline">
      <v-icon class="mr-2">fa fa-plus-circle</v-icon>Add A New Retailer
    </v-card-title>

    <v-card-text style="max-height:300px;" class="px-4">
      <v-form
        ref="createRetailerForm"
        v-model="blnValidRetailer"
        lazy-validation
        @submit.prevent="validateRetailer"
      >
        <v-row>
          <v-col>
            <v-text-field
              autofocus
              v-model="retailer.name"
              autocomplete="off"
              hide-details="auto"
              dense
              name="name"
              label="Retailer Name"
              hint="Enter the Retailer name"
              outlined
              :rules="fieldRules.name"
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
import { mapGetters } from "vuex";
import { SEARCH_RETAILERS } from "@/components/Retailers/store/actionTypes";
import { CREATE_RETAILER } from "@/components/Retailers/store/actionTypes";

const defaultRetailer = {
  name: "",
};
import fieldRules from "./fieldRules";

export default {
  props: {
    dialog: [Boolean],
  },
  components: {},
  data: () => ({
    blnValidRetailer: false,
    retailer: { ...defaultRetailer },
    fieldRules,
  }),
  computed: {
    ...mapGetters({
      retailers: "retailers/getRetailers",
    }),
  },
  created() {
    this.$store.dispatch(`retailers/${SEARCH_RETAILERS}`, {});
  },
  methods: {
    validateRetailer() {
      return this.$refs.createRetailerForm.validate();
    },

    async handleSave() {
      if (!this.validateRetailer()) return false;

      const { retailer } = this;
      const result = await this.$store.dispatch(`retailers/${CREATE_RETAILER}`, retailer);

      if (result) {
        this.resetRetailer();
        this.$toastr.s("Retailer Added");
        this.updateDialog(false);
      }
    },
    handleCancel() {
      this.resetRetailer();
      this.updateDialog(false);
    },
    resetRetailer() {
      this.blnValidRetailer = false;
      this.retailer = { ...defaultRetailer };
    },
    updateDialog(val) {
      this.$emit("update:dialog", val);
    },
  },
};
</script>

<style scoped></style>
