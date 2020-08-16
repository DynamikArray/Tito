const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    resourceId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
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
