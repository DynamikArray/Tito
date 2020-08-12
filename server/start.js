//GET OUR ENV STUFF
require("dotenv").config();
const PORT = process.env.PORT || "8000";
const IPADDRESS = process.env.IP_ADDRESS || "localhost";

//GET OUR SERVER BUILD FUNCTION
const { build } = require("./server");

//START OUR SERVER with the apporiate PORT, IP_ADDRESS
build().then(async (fastify) => {
  try {
    await fastify.listen(PORT, IPADDRESS);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
