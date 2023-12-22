export default {
  name: [(v) => !!v || "Brand Name is a required field"],
  retailer: [(v) => !!v || "Retailer is a required field"],
};
