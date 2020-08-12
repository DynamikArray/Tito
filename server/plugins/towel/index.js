const towelPlugin = async (fastify, opts) => {
  //register routes
  //

  fastify.get("/:id", async (request, reply) => {
    return { status: "READ towel" };
  });

  fastify.post("/", async (request, reply) => {
    return { status: "CREATE towel" };
  });

  fastify.put("/:id", async (request, reply) => {
    return { status: "UPDATE towel" };
  });

  fastify.delete("/:id", async (request, reply) => {
    return { status: "DELETE towel" };
  });

  //
  //
};

module.exports = towelPlugin;
