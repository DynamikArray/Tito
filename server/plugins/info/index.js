const { getInfoSchema } = require("./schema");

const infoPlugin = async (fastify, opts) => {
  fastify.get("/", { schema: getInfoSchema }, async (request, reply) => {
    return "Welcome to TiTo - Towels in, Towels Out!";
  });
};

module.exports = infoPlugin;
