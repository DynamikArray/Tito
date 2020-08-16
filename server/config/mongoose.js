const fastifyPlugin = require("fastify-plugin");
const mongoose = require("mongoose");

async function dbConnector(fastify, options) {
  try {
    const url = process.env.MONGO_URI;
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    fastify.log.info("Database is connected");
    fastify.decorate("mongoose", db);
  } catch (err) {
    fastify.log.error(err);
  }
}
module.exports = fastifyPlugin(dbConnector);
