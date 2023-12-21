const { getOneSchema, getAllSchema, createSchema, updateSchema, deleteSchema } = require("./schema");

const { RetailerService } = require("./service");

const retailerPlugin = async (fastify, opts) => {
  //bring in our service and pass it fastify so it can check for ready!
  const retailerService = new RetailerService(fastify);

  // (c) create
  fastify.post("/", { schema: createSchema, preValidation: fastify.authenticate }, async (request, reply) => {
    const { body } = request;
    const createdRetailer = await retailerService.create({
      retailer: body,
    });
    reply.code(201).send(createdRetailer);
  });

  // (r) read - GetAll
  fastify.get("/", { schema: getAllSchema, preValidation: fastify.authenticate }, async (request, reply) => {
    const { filter } = request.query;
    const retailers = await retailerService.getAll({ filter });
    reply.code(200).send(retailers);
  });

  // (r) read - GetOne
  fastify.get(
    "/:id",
    { schema: getOneSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const retailer = await retailerService.getOne({ id });
      reply.code(200).send(retailer);
    }
  );

  // (U) update
  fastify.put(
    "/:id",
    { schema: updateSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const retailer = request.body;
      const updatedRetailer = await retailerService.update({
        id,
        retailer,
      });
      reply.code(200).send(updatedRetailer);
    }
  );

  // (D) Delete
  fastify.delete(
    "/:id",
    { schema: deleteSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const deleted = await retailerService.delete({ id });
      if (deleted.error) reply.code(500).send({ message: deleted.error });
      reply.code(200).send(deleted);
    }
  );
};

module.exports = retailerPlugin;
