<template>
  <div id="reportContainer" class="">
    <v-card>
      <v-data-table
        style="width:100%"
        :headers="headers"
        :loading="loading"
        loading-text="Searching Database"
        :items="towels"
        :group-by="groupBy"
        sort-by="color"
        :search="search"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:top="{ pagination }">
          <div
            class="dtSlotTop d-flex flex-row align-center justify-space-between pa-1"
          >
            <div class="d-flex justify-start align-center mx-1">
              <h5 class="mr-3">Search :</h5>
              <v-text-field v-model="search" />
            </div>
            <div class="d-flex justify-end align-center mx-1">
              <v-btn color="blue" @click="print">Print Me</v-btn>
            </div>
          </div>
          <div class="w-100">
            <v-divider class="my-1" />
          </div>
          <div class="w-100">
            Total Results Found: {{ pagination.itemsLength }}
          </div>
          <div class="w-100">
            <v-divider class="my-1" />
          </div>
        </template>

        <template v-slot:group.header="{ group, items }">
          <td colspan="3">
            <div class="d-flex justify-start align-baseline">
              <div class="mx-1">
                <h3>{{ group }}</h3>
              </div>
              <div class="mx-1">
                <h3>({{ items.length }})</h3>
              </div>
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { tableHeaders } from "./datatable/_headers";
import { mapGetters } from "vuex";
import { SEARCH_TOWELS } from "@/components/Towels/store/actionTypes.js";

export default {
  components: {},
  computed: {
    ...mapGetters({
      towels: "towels/getTowels",
      loading: "towels/getLoading"
    })
  },
  data: () => ({
    search: "",
    headers: tableHeaders,
    groupBy: "brand.name"
  }),
  mounted() {
    this.$store.dispatch(`towels/${SEARCH_TOWELS}`);
  },
  methods: {
    async print() {
      console.log("HAndle creating the printed table");
      this.printData();
    },

    printData() {
      const _this = this;
      const reportData = this.towels;

      const pdfOptions = {
        pageMargins: [10, 20, 10, 20],
        pageOrientation: "landscape",
        header: function(currentPage, pageCount, pageSize) {
          const opts = { currentPage, pageCount, pageSize };
          return _this.buildReportHeader(opts);
        },
        content: this.buildPDFContent(reportData),
        footer: function(currentPage, pageCount, pageSize) {
          const opts = { currentPage, pageCount, pageSize };
          return _this.buildReportFooter(opts);
        }
      };

      pdfMake.createPdf(pdfOptions).open();
    },

    buildReportHeader: function({ currentPage }) {
      if (currentPage == 1) {
        return {
          text: `Inventory Report`,
          fontSize: 16,
          alignment: "center"
        };
      }
    },
    buildReportFooter: function({ currentPage, pageCount }) {
      return {
        text: `Page ${currentPage} of ${pageCount}`,
        fontSize: 10,
        alignment: "center"
      };
    },
    buildPDFContent(inventoryItems) {
      console.log(inventoryItems);

      inventoryItems.unshift({
        brand: "Brand",
        color: "Color",
        quantity: "Qty"
      });

      return {
        layout: "lightHorizontalLines",
        table: {
          headerRows: 1,
          widths: [200, "*", 80],
          body: inventoryItems.map(item => {
            return [
              {
                text: item.brand.name,
                alignment: "left",
                fontSize: 14
              },
              {
                text: item.color,
                alignment: "left",
                fontSize: 12
              },
              {
                text: item.quantity,
                alignment: "left",
                fontSize: 12
              }
            ];
          })
        }
      };
    }
  }
};
</script>

<style scoped></style>
