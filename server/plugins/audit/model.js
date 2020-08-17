const mongoose = require("mongoose");

const Brand = require("../brand/model");
const Towel = require("../towel/model");

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    resourceModel: {
      type: String,
      required: true,
    },
    _brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      validateExistance: true,
      required: false,
    },
    _towel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Towel",
      validateExistance: true,
      required: false,
    },
    values: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Audit", auditSchema);
