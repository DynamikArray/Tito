const mongoose = require("mongoose");
const Brand = require("../brand/model");

const towelSchema = new mongoose.Schema(
  {
    upc: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      validateExistance: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Towel", towelSchema);
