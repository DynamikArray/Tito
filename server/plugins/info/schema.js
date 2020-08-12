const tags = ["Info"];

const getInfoSchema = {
  tags,
  response: {
    200: {
      type: "string",
    },
  },
};

module.exports = {
  getInfoSchema,
};
