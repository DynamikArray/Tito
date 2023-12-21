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
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      validateExistance: true,
      required: true,
    },
    location: {
      type: Object,
      required: true,
      properties: {
        home: {
          type: Object,
          required: true,
          properties: {
            quantity: { type: Number, required: true },
          },
        },
        warehouse: {
          type: Object,
          required: true,
          properties: {
            quantity: { type: Number, required: true },
          },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Towel", towelSchema);
