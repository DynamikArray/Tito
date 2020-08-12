const tags = ["Towel"];

//resource properties
const towelProperties = {
  id: { type: "string" },
  name: { type: "string" },
  manufacturer: { type: "string" },
  quantity: { type: "number" },
};

const bodyCreateJsonSchema = {
  type: "object",
  properties: towelProperties,
  required: ["name", "manufacturer", "quantity"],
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

/* Full Schemas */
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
  },
};

const updateSchema = {
  tags,
  body: bodyUpdateJsonSchema,
  response: {
    200: {
      type: "object",
      properties: towelProperties,
    },
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
  },
};

module.exports = {
  getOneSchema,
  getAllSchema,
  createSchema,
  updateSchema,
  deleteSchema,
};
