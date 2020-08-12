const towels = {
  name: "towels",
  alias: "Towel",
  schema: {
    upc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    /*
          // We can add references to other Schemas like-so
          manufacturer: {
            type: "ObjectId",
            ref: "Account",
            validateExistance: true,
          },
          */
  },
};

module.exports = towels;
