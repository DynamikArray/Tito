//Main Route Definitions
const apiRoutes = async (fastify, options) => {
  //User
  await fastify.register(require("../../plugins/user"), {
    prefix: "v1/user",
  });

  //towels
  await fastify.register(require("../../plugins/towel"), {
    prefix: "v1/towel",
  });
  //manufacturers
  await fastify.register(require("../../plugins/brand"), {
    prefix: "v1/brand",
  });
  //retailers
  await fastify.register(require("../../plugins/retailer"), {
    prefix: "v1/retailer",
  });
  //auditLog
  await fastify.register(require("../../plugins/audit"), {
    prefix: "v1/audit",
  });

  //catch all route for loading client application
  await fastify.get("/*", (request, reply) => reply.sendFile("index.html"));
};

module.exports = apiRoutes;
