const error = {
  500: {
    type: "object",
    properties: {
      statusCode: {
        type: "number",
      },
      error: {
        type: "object",
      },
      message: {
        type: "string",
      },
    },
  },
};

module.exports = error;
