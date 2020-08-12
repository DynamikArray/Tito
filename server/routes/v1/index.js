//Main Route Definitions
const apiRoutes = async (fastify, options) => {
  //testing routes
  fastify.register(require("../../plugins/info"), { prefix: "v1" });
  //towels
  fastify.register(require("../../plugins/towel"), { prefix: "v1/towel" });
  //search
  //fastify.register(require("./search"), { prefix: "v1/search" });
  //
};

module.exports = apiRoutes;
