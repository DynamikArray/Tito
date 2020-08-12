//GET OUR ENV STUFF
require("dotenv").config();
const PORT = process.env.PORT || "8000";
const IPADDRESS = process.env.IP_ADDRESS || "localhost";

//GET OUR SERVER BUILD FUNCTION
const { server } = require("./server");

//START OUR SERVER with the apporiate PORT, IP_ADDRESS
server().then(async (fastify) => {
  try {
    await fastify.listen(PORT, IPADDRESS);
    const server = fastify.server.address();

    fastify.log.info(`TiTo Running @ ${server.address}:${server.port}`);

    process.on("SIGINT", () => fastify.close());
    process.on("SIGTERM", () => fastify.close());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
