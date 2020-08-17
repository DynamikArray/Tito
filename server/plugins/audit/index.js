const { getAllSchema } = require("./schema");

const { AuditService } = require("./service");

const auditPlugin = async (fastify, opts) => {
  const auditService = new AuditService(fastify);

  // (r) read - GetAll
  fastify.get(
    "/",
    { schema: getAllSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { action, sort } = request.query;
      const logs = await auditService.getAll({ action, sort });
      reply.code(200).send(logs);
    }
  );
};
module.exports = auditPlugin;
