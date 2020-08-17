const path = require("path");
const Fastify = require("fastify");

const server = async () => {
  //setup our fastify options
  const fastify = Fastify({ logger: true });

  //Mongoose documentation
  await fastify.register(require("./config/mongoose"));

  //Our Audit Logger attached
  await fastify.register(require("./plugins/audit/config"));

  //Our Audit Logger attached
  await fastify.register(require("./plugins/user/jwt"));

  //static build dir
  await fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "../client/dist"),
    wildcard: false,
  });

  //Swagger documentation
  await fastify.register(
    require("fastify-swagger"),
    require("./config/documentation")
  );

  //require our routes
  await require("./routes/v1/index")(fastify);

  //return our server ready to be used/listened
  return fastify;
};

module.exports = { server };
