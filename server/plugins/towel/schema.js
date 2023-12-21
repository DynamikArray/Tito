const error = require("../../../util/errorSchema");

const tags = ["Towel"];
const security = [{ token: [] }];

const towelProperties = {
  _id: { type: "string" },
  upc: { type: "string" },
  color: { type: "string" },
  location: {
    type: "object",
    properties: {
      home: {
        type: "object",
        properties: {
          quantity: { type: "number" },
        },
      },
      warehouse: {
        type: "object",
        properties: {
          quantity: { type: "number" },
        },
      },
    },
  },
  brand: {
    type: "object",
    properties: {
      name: { type: "string" },
      retailer: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
  },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const bodyCreateOrUpateJsonSchema = {
  type: "object",
  properties: {
    upc: { type: "string" },
    color: { type: "string" },
    brand: { type: "string" },
    location: {
      type: "object",
      properties: {
        home: {
          type: "object",
          properties: {
            quantity: { type: "number" },
          },
        },
        warehouse: {
          type: "object",
          properties: {
            quantity: { type: "number" },
          },
        },
      },
    },
  },
  required: ["color"],
};

const queryStringJsonSchema = {
  type: "object",
  properties: {
    filter: { type: "string" },
    upc: { type: "string" },
    sort: { type: "string" },
  },
};

const paramsJsonSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

const getOneSchema = {
  security,
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: towelProperties,
    },
  },
};

const getAllSchema = {
  security,
  tags,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: towelProperties,
      },
    },
    ...error,
  },
};

const createSchema = {
  security,
  tags,
  body: bodyCreateOrUpateJsonSchema,
  response: {
    201: {
      type: "object",
      properties: towelProperties,
    },
    ...error,
  },
};

const updateSchema = {
  security,
  tags,
  params: paramsJsonSchema,
  body: { ...bodyCreateOrUpateJsonSchema, required: [] },
  response: {
    200: {
      type: "object",
      properties: towelProperties,
    },
    ...error,
  },
};

const deleteSchema = {
  security,
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: towelProperties,
    },
    ...error,
  },
};

module.exports = {
  getOneSchema,
  getAllSchema,
  createSchema,
  updateSchema,
  deleteSchema,
};
