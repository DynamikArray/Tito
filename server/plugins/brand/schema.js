const { objectWithoutKey } = require("../../../util/helpers");
const error = require("../../../util/errorSchema");

const tags = ["Brand"];
const security = [{ token: [] }];

const brandProperties = {
  _id: { type: "string" },
  name: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const bodyCreateJsonSchema = {
  type: "object",
  properties: { name: { type: "string" } },
  required: ["name"],
};

const bodyUpdateJsonSchema = {
  type: "object",
  properties: brandProperties,
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
  security,
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: "object",
      properties: brandProperties,
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
        properties: brandProperties,
      },
    },
    ...error,
  },
};

const createSchema = {
  security,
  tags,
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: "object",
      properties: brandProperties,
    },
    ...error,
  },
};

const updateSchema = {
  security,
  tags,
  params: paramsJsonSchema,
  body: bodyUpdateJsonSchema,
  response: {
    200: {
      type: "object",
      properties: brandProperties,
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
      properties: brandProperties,
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
