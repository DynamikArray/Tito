<template>
  <div>
    <v-combobox
      :autofocus="autofocus"
      auto-select-fiirst
      autocomplete="off"
      ref="retailersList"
      id="retailer"
      name="retailer"
      label="Retailer"
      hint="Select Retailer from list "
      v-model="retailer"
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
    autofocus: [Boolean],
    retailers: [Boolean, Array],
    rules: {
      type: [Boolean, Array],
      default: () => {
        return [];
      },
    },
  },
  data: () => ({
    retailer: null,
  }),
  methods: {
    handleRetailerChange(val) {
      this.$emit("update:retailer", val);
    },
  },
};
</script>

<style scoped></style>
