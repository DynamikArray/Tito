<template>
  <v-card>
    <v-card-title class="primary headline">
      <v-icon class="mr-2">fa fa-plus-circle</v-icon>Add A New Brand
    </v-card-title>

    <v-card-text style="max-height:300px;" class="px-4">
      <v-form ref="createBrandForm" v-model="blnValidBrand" lazy-validation @submit.prevent="validateBrand">
        <v-row>
          <v-col>
            <RetailerDropdown
              :rules="fieldRules.retailer"
              :retailer.sync="brand.retailer"
              :retailers="retailers"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              autofocus
              v-model="brand.name"
              autocomplete="off"
              hide-details="auto"
              dense
              name="name"
              label="Brand Name"
              hint="Enter the Brand name"
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
import { CREATE_BRAND } from "@/components/Brands/store/actionTypes";
import RetailerDropdown from "@/components/Retailers/Dropdown/RetailerDropdown.vue";

const defaultBrand = {
  name: "",
  retailer: { _id: "" },
};
import fieldRules from "./fieldRules";

export default {
  props: {
    dialog: [Boolean],
  },
  components: { RetailerDropdown },
  data: () => ({
    blnValidBrand: false,
    brand: { ...defaultBrand },
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
    validateBrand() {
      return this.$refs.createBrandForm.validate();
    },

    async handleSave() {
      if (!this.validateBrand()) return false;

      const { brand } = this;
      const result = await this.$store.dispatch(`brands/${CREATE_BRAND}`, brand);

      if (result) {
        this.resetBrand();
        this.$toastr.s("Brand Added");
        this.updateDialog(false);
      }
    },
    handleCancel() {
      this.resetBrand();
      this.updateDialog(false);
    },
    resetBrand() {
      this.blnValidBrand = false;
      this.brand = { ...defaultBrand };
    },
    updateDialog(val) {
      this.$emit("update:dialog", val);
    },
  },
};
</script>

<style scoped></style>
