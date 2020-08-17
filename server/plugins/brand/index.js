const {
  getOneSchema,
  getAllSchema,
  createSchema,
  updateSchema,
  deleteSchema,
} = require("./schema");

const { BrandService } = require("./service");

const brandPlugin = async (fastify, opts) => {
  //bring in our service and pass it fastify so it can check for ready!
  const brandService = new BrandService(fastify);

  // (c) create
  fastify.post(
    "/",
    { schema: createSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { body } = request;
      const createdBrand = await brandService.create({
        brand: body,
      });
      reply.code(201).send(createdBrand);
    }
  );

  // (r) read - GetAll
  fastify.get(
    "/",
    { schema: getAllSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { filter } = request.query;
      const brands = await brandService.getAll({ filter });
      reply.code(200).send(brands);
    }
  );

  // (r) read - GetOne
  fastify.get(
    "/:id",
    { schema: getOneSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const brand = await brandService.getOne({ id });
      reply.code(200).send(brand);
    }
  );

  // (U) update
  fastify.put(
    "/:id",
    { schema: updateSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const brand = request.body;
      const updatedBrand = await brandService.update({
        id,
        brand,
      });
      reply.code(200).send(updatedBrand);
    }
  );

  // (D) Delete
  fastify.delete(
    "/:id",
    { schema: deleteSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { id } = request.params;
      const deleted = await brandService.delete({ id });
      if (deleted.error) reply.code(500).send({ message: deleted.error });
      reply.code(200).send(deleted);
    }
  );
};

module.exports = brandPlugin;
