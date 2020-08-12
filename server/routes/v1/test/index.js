const testRoutes = async (fastify, options) => {
  fastify.get("/", async (request, reply) => {
    return { status: " Welcome to TiTo - Towels in, Towels Out!" };
  });
};

module.exports = testRoutes;
