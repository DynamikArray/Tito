const error = require("../../../util/errorSchema");

const tags = ["User"];
const security = [{ token: [] }];

const userProperties = {
  username: { type: "string" },
  token: { type: "string" },
  createdAt: { type: "string" },
  updatedAt: { type: "string" },
};

const bodyRegisterJsonSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
};

const bodyLoginJsonSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};

const registerSchema = {
  tags,
  body: bodyRegisterJsonSchema,
  response: {
    201: {
      type: "object",
      properties: userProperties,
    },
    ...error,
  },
};

const loginSchema = {
  tags,
  body: bodyLoginJsonSchema,
  response: {
    201: {
      type: "object",
      properties: userProperties,
    },
    ...error,
  },
};

const accountSchema = {
  tags,
  security,
  response: {
    200: {
      type: "object",
      properties: userProperties,
    },
    ...error,
  },
};

module.exports = {
  registerSchema,
  loginSchema,
  accountSchema,
};
