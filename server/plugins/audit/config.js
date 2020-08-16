const fastifyPlugin = require("fastify-plugin");
const { AuditLogger } = require("./AuditLogger");

const auditConfig = async (fastify, options) => {
  const logger = new AuditLogger(fastify);

  fastify.decorate("audit", logger);
};

module.exports = fastifyPlugin(auditConfig);
