const manufacturers = {
  name: "manufacturers",
  alias: "Manufacturer",
  schema: {
    name: {
      type: String,
      required: true,
    },
  },
  virtualize: (schema) => {
    schema.virtual("towels", {
      ref: "towels",
      localField: "_id",
      foreignField: "manufacturer",
    });
  },
};

module.exports = manufacturers;
