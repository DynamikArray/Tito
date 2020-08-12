const { objectWithoutKey } = require("../../../util/helpers");
const error = require("../../../util/errorSchema");

const tags = ["Towel"];

const baseTowelProperties = {
  _id: { type: "string" },
  upc: { type: "string" },
  name: { type: "string" },
  quantity: { type: "number" },
  manufacturer: { type: "string" },
};
const manufacturerObj = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};

const towelPropertiesWithManufacturerObj = {
  ...baseTowelProperties,
  manufacturer: manufacturerObj,
};

const bodyCreateJsonSchema = {
  type: "object",
  properties: objectWithoutKey(baseTowelProperties, "_id"),
  required: ["upc", "name", "manufacturer", "quantity"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: towelPropertiesWithManufacturerObj,
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
      properties: towelPropertiesWithManufacturerObj,
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
        properties: towelPropertiesWithManufacturerObj,
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
      properties: towelPropertiesWithManufacturerObj,
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
      properties: towelPropertiesWithManufacturerObj,
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
      properties: towelPropertiesWithManufacturerObj,
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
