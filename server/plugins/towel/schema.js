const { objectWithoutKey } = require("../../../util/helpers");
const error = require("../../../util/errorSchema");

const tags = ["Towel"];

const towelProperties = {
  _id: { type: "string" },
  upc: { type: "string" },
  name: { type: "string" },
  manufacturer: { type: "string" },
  quantity: { type: "number" },
};

const bodyCreateJsonSchema = {
  type: "object",
  properties: objectWithoutKey(towelProperties, "_id"),
  required: ["upc", "name", "manufacturer", "quantity"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: towelProperties,
};

const queryStringJsonSchema = {
  type: "object",
  properties: {
    filter: { type: "string" },
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
  tags,
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: "object",
      properties: towelProperties,
    },
    ...error,
  },
};

const updateSchema = {
  tags,
  params: paramsJsonSchema,
  body: bodyUpdateJsonSchema,
  response: {
    200: {
      type: "object",
      properties: towelProperties,
    },
    ...error,
  },
};

const deleteSchema = {
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
