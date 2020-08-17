const fastifyPlugin = require("fastify-plugin");

async function jwtStrategy(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.SUPER_SECRET,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (e) {
      fastify.log.error(e.message);
    }
  });
}

module.exports = fastifyPlugin(jwtStrategy);
