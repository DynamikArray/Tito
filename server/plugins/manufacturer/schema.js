const { objectWithoutKey } = require("../../../util/helpers");
const error = require("../../../util/errorSchema");

const tags = ["Manufacturer"];

const manufacturerProperties = {
  _id: { type: "string" },
  name: { type: "string" },
};

const bodyCreateJsonSchema = {
  type: "object",
  properties: objectWithoutKey(manufacturerProperties, "_id"),
  required: ["name"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: manufacturerProperties,
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
      properties: manufacturerProperties,
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
        properties: manufacturerProperties,
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
      properties: manufacturerProperties,
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
      properties: manufacturerProperties,
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
      properties: manufacturerProperties,
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
