//Main Route Definitions
const apiRoutes = async (fastify, options) => {
  //towels
  fastify.register(require("../../plugins/towel"), { prefix: "v1/towel" });
  //manufacturers
  fastify.register(require("../../plugins/manufacturer"), {
    prefix: "v1/manufacturer",
  });
  //testing routes
  fastify.register(require("../../plugins/info"), { prefix: "v1" });
};

module.exports = apiRoutes;
