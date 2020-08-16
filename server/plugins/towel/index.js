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
    const createdTowel = await towelService.create({ towel: body });
    reply.code(201).send(createdTowel);
  });

  fastify.get("/", { schema: getAllSchema }, async (request, reply) => {
    const { filter, upc, sort } = request.query;
    const towels = await towelService.getAll({ filter, upc, sort });
    reply.code(200).send(towels);
  });

  fastify.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const { id } = request.params;
    const towel = await towelService.getOne({ id });
    reply.code(200).send(towel);
  });

  fastify.put("/:id", { schema: updateSchema }, async (request, reply) => {
    const { id } = request.params;
    const towel = request.body;
    const updatedTowel = await towelService.update({ id, towel });
    reply.code(200).send(updatedTowel);
  });

  fastify.delete("/:id", { schema: deleteSchema }, async (request, reply) => {
    const { id } = request.params;
    const deleted = await towelService.delete({ id });
    if (deleted.error) reply.code(500).send({ message: deleted.error });
    reply.code(200).send(deleted);
  });
};

module.exports = towelPlugin;
