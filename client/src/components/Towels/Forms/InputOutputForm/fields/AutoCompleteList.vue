<template>
  <div class="d-flex align-center justify-space-between flex-grow-1 my-2 ">
    <div class="d-flex flex-column alig-center">
      <div class="d-flex align-center text-center text-body-1">
        {{ towel.color }}
      </div>
      <div class="d-flex align-center text-caption text-body-2">
        {{ towel.brand.name }}
      </div>
    </div>
    <div class="d-flex flex-column align-end" style="min-width:90px">
      <div class="d-flex">
        <!--Col 1 -->
        <div class="d-flex flex-column align-center mx-1">
          <div class="d-flex text-caption">Home</div>
          <div class="d-flex text-body-2">
            {{ getQuantities.home }}
          </div>
        </div>

        <!--Col 2 -->
        <div class="d-flex flex-column align-center mx-1 ">
          <div class="d-flex text-caption">Warehouse</div>
          <div class="d-flex text-body-2 ">
            {{ getQuantities.warehouse }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    towel: [Boolean, Object],
  },
  computed: {
    getQuantities() {
      return {
        home: this.towel.location?.home?.quantity || 0,
        warehouse: this.towel.location?.warehouse?.quantity || 0,
      };
    },
  },
};
</script>

<style></style>
