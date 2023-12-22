/* eslint-disable */

export default {
  location: [(val) => !!val || "Location is a required field"],
  quantity: [
    (v) => !!Number(v) >= 1 || "Qty must be number greater than 0.",
    (v) => {
      if (v % 1 !== 0) return "Whole numbers only";
      return true;
    },
  ],
  color: [(v) => !!v || "Color is a required field"],
  brand: [
    (v) => {
      if (!v || typeof v !== "object") return "You must select a Brand";
      return true;
    },
  ],
};
