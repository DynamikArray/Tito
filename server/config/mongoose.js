//FOR DOCKER
const MONGO_URI = "mongodb://mongo-tito:27017/tito";

// FOR LOCAL DEV
//  const MONGO_URI = "mongodb://localhost:27017/tito";

const fastifyPlugin = require("fastify-plugin");
const mongoose = require("mongoose");

async function dbConnector(fastify, options) {
  try {
    const url = MONGO_URI;
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
