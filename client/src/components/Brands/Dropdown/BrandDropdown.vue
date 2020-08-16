<template>
  <div>
    <v-combobox
      autocomplete="off"
      ref="brandsList"
      id="brand"
      name="brand"
      label="Brand"
      hint="Select Brand from list "
      :value="brand"
      :items="brands"
      item-text="name"
      item-value="_id"
      outlined
      dense
      @change="handleBrandChange"
      :rules="rules"
    ></v-combobox>
  </div>
</template>

<script>
export default {
  props: {
    brand: [Object, String],
    brands: [Boolean, Array],
    rules: {
      type: [Boolean, Array],
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handleBrandChange(val) {
      this.$emit("update:brand", val);
    }
  }
};
</script>

<style scoped></style>
