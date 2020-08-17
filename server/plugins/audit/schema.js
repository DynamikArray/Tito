const error = require("../../../util/errorSchema");

const tags = ["Audit"];
const security = [{ token: [] }];

const auditProperties = {
  action: { type: "string" },
  resourceModel: { type: "string" },
  values: {},
  _brand: {},
  _towel: {},
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const queryStringJsonSchema = {
  type: "object",
  properties: {
    action: { type: "string" },
    sort: { type: "string" },
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
        properties: auditProperties,
      },
    },
    ...error,
  },
};

module.exports = {
  getAllSchema,
};
