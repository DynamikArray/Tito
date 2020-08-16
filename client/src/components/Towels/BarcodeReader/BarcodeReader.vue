<template>
  <div class="">
    <StreamBarcodeReader
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  components: {
    StreamBarcodeReader
  },
  data: () => ({
    barcode: "This will get barcode value"
  }),
  methods: {
    onDecode(val) {
      this.barcode = val;
    },
    onLoaded() {
      console.log("onLoaded");
    }
  }
};
</script>

<style scoped></style>
