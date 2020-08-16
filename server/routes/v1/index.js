//Main Route Definitions
const apiRoutes = async (fastify, options) => {
  //towels
  fastify.register(require("../../plugins/towel"), { prefix: "v1/towel" });
  //manufacturers
  fastify.register(require("../../plugins/brand"), {
    prefix: "v1/brand",
  });

  //auditLog
  fastify.register(require("../../plugins/audit"), {
    prefix: "v1/audit",
  });

  //testing routes
  fastify.register(require("../../plugins/info"), { prefix: "v1" });
};

module.exports = apiRoutes;
