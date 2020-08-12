const {
  getOneSchema,
  getAllSchema,
  createSchema,
  updateSchema,
  deleteSchema,
} = require("./schema");

const { TowelService } = require("./service");

const towelPlugin = async (fastify, opts) => {
  //bring in our service and pass it fastify so it can check for ready!
  const towelService = new TowelService(fastify);

  //create
  fastify.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;
    const insertedId = await towelService.create({ towel: body });
    fastify.log.info("insertedId", insertedId);
    return { _id: insertedId };
  });

  fastify.get("/", { schema: getAllSchema }, async (request, reply) => {
    return { status: 'Get towels and filter by term "filter" ' };
  });

  fastify.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    return { status: "READ towel" };
  });

  fastify.put("/:id", { schema: updateSchema }, async (request, reply) => {
    return { status: "UPDATE towel" };
  });

  fastify.delete("/:id", { schema: deleteSchema }, async (request, reply) => {
    return { status: "DELETE towel" };
  });
};

module.exports = towelPlugin;
