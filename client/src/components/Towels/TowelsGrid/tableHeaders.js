export const tableHeaders = [
  {
    text: "Total",
    value: "location",
    sortable: true,
    align: "center",
    width: "80px",
  },
  {
    text: "Home",
    value: "location.home.quantity",
    sortable: true,
    align: "center",
  },
  {
    text: "Warehouse",
    value: "location.warehouse.quantity",
    sortable: true,
    align: "center",
  },

  {
    text: "Retailer",
    value: "brand.retailer.name",
    sortable: true,
    align: "left",
  },

  {
    text: "Brand",
    value: "brand.name",
    sortable: true,
    align: "left",
  },

  {
    text: "Color",
    value: "color",
    sortable: true,
    align: "left",
  },

  {
    text: "Upc",
    value: "upc",
    sortable: true,
    align: "left",
    width: "200px",
  },
  {
    text: "Updated",
    value: "updatedAt",
    sortable: true,
    align: "center",
    width: "120px",
  },
  {
    text: "Actions",
    value: "action",
    sortable: false,
    align: "center",
    width: "100px",
  },
];
