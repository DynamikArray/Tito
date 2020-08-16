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
      <div class="d-flex align-center text-caption justify-center">
        Qty
      </div>
      <div class="d-flex align-center text-center text-body-1 justify-center">
        {{ towel.quantity }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    towel: [Boolean, Object]
  }
};
</script>

<style></style>
