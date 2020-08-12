const Fastify = require("fastify");

const build = async () => {
  //setup our fastify options
  const fastify = Fastify({ logger: true });

  //require our plugins
  //Swagger documentation
  fastify.register(
    require("fastify-swagger"),
    require("./config/documentation")
  );

  //require our routes
  await require("./routes/v1/index.js")(fastify);

  //return our server ready to be used/listened
  return fastify;
};

module.exports = { build };
