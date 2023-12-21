<template>
  <v-slide-x-transition mode="out-in">
    <v-list v-if="towel" class="grey darken-3" :key="towel._id">
      <v-list-item>
        <v-list-item-icon class="d-flex align-center pr-5 ma-0">
          <div class="d-flex flex-column align-center" style="min-width:90px">
            <div class="d-flex">
              <h3>QTYs</h3>
            </div>
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
        </v-list-item-icon>
        <v-list-item-content class="pa-0">
          <v-list-item-title class="text-h5">{{ towel.color }}</v-list-item-title>
          <v-list-item-subtitle class="d-flex align-center"
            ><div class="text-caption">
              Brand:
            </div>
            <div class="text-body-2 mx-4">
              <b>{{ towel.brand.name }}</b>
            </div>
          </v-list-item-subtitle>

          <v-list-item-subtitle class="d-flex align-center"
            ><div class="text-caption">
              Retailer:
            </div>
            <div class="text-body-2 mx-4">
              <b>{{ towel.brand.retailer.name }}</b>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="!hideOnNext">
          <v-btn large color="success" style="min-width:40px;" class="px-3" @click="onNext">
            <v-icon class="mr-2">fa fa-arrow-alt-circle-right</v-icon>Next
          </v-btn>
        </v-list-item-action>
        <v-list-item-action v-if="hideOnNext">
          <v-btn small color="error" style="min-width:30px;" class="pa-0" @click="handleCancel">
            <v-icon small>fa fa-times-circle</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-slide-x-transition>
</template>

<script>
export default {
  props: {
    towel: [Boolean, Object],
    onNext: [Function],
    hideOnNext: {
      type: [Boolean],
      default: false,
    },
    handleCancel: {
      type: [Function, Boolean],
      default: false,
    },
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

<style scoped></style>
