<template>
  <div>
    <v-combobox
      autocomplete="off"
      ref="retailersList"
      id="retailer"
      name="retailer"
      label="Retailer"
      hint="Select Retailer from list "
      :value="retailer.name"
      :items="retailers"
      item-text="name"
      item-value="_id"
      outlined
      dense
      @change="handleRetailerChange"
      :rules="rules"
    ></v-combobox>
  </div>
</template>

<script>
export default {
  props: {
    retailer: [Object, String],
    retailers: [Boolean, Array],
    rules: {
      type: [Boolean, Array],
      default: () => {
        return [];
      },
    },
  },
  methods: {
    handleRetailerChange(val) {
      this.$emit("update:retailer", val);
    },
  },
};
</script>

<style scoped></style>
