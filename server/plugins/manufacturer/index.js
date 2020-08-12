const {
  getOneSchema,
  getAllSchema,
  createSchema,
  updateSchema,
  deleteSchema,
} = require("./schema");

const { ManufacturerService } = require("./service");

const manufacturerPlugin = async (fastify, opts) => {
  //bring in our service and pass it fastify so it can check for ready!
  const manufacturerService = new ManufacturerService(fastify);

  // (c) create
  fastify.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;
    const createdManufacturer = await manufacturerService.create({
      manufacturer: body,
    });
    reply.code(201).send(createdManufacturer);
  });

  // (r) read - GetAll
  fastify.get("/", { schema: getAllSchema }, async (request, reply) => {
    const { filter } = request.query;
    const manufacturers = await manufacturerService.getAll({ filter });
    reply.code(200).send(manufacturers);
  });

  // (r) read - GetOne
  fastify.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const { id } = request.params;
    const manufacturer = await manufacturerService.getOne({ id });
    reply.code(200).send(manufacturer);
  });

  // (U) update
  fastify.put("/:id", { schema: updateSchema }, async (request, reply) => {
    const { id } = request.params;
    const manufacturer = request.body;
    const updatedManufacturer = await manufacturerService.update({
      id,
      manufacturer,
    });
    reply.code(200).send(updatedManufacturer);
  });

  // (D) Delete
  fastify.delete("/:id", { schema: deleteSchema }, async (request, reply) => {
    const { id } = request.params;
    const deleted = await manufacturerService.delete({ id });
    if (deleted.error) reply.code(500).send({ message: deleted.error });
    reply.code(200).send(deleted);
  });
};

module.exports = manufacturerPlugin;
