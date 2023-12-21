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
      class="brandDropdown"
    >
      <template v-slot:item="{ item }" class="grey darken-1">
        <div class="d-flex flex-grow-1">
          <div class="d-flex align-center justify-start text-body-1">{{ item.name }}</div>
          <div class="d-flex align-center justify-start text-caption font-italic ml-1">
            - {{ item.retailer.name }}
          </div>
        </div>
      </template>
    </v-combobox>
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
      },
    },
  },
  getters: {
    brandName() {
      return this.brand.name;
    },
  },
  methods: {
    handleBrandChange(val) {
      this.$emit("update:brand", val);
    },
  },
};
</script>

<style>
.v-list {
  background-color: $grey-1;
}
</style>
