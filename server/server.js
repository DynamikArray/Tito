const Fastify = require("fastify");

const server = async () => {
  //setup our fastify options
  const fastify = Fastify({ logger: true });

  //Mongo and Mongoose
  await fastify.register(
    require("fastify-mongoose-driver").plugin,
    require("./config/mongoose"),
    (err) => {
      if (err) throw err;
    }
  );

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
