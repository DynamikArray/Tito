const { registerSchema, loginSchema, accountSchema } = require("./schema");
const { UserService } = require("./service");

const userPlugin = async (fastify, opts) => {
  const userService = new UserService(fastify);

  fastify.post(
    "/register",
    { schema: registerSchema },
    async (request, reply) => {
      const { body } = request;
      try {
        const { user = false, error = false } = await userService.register({
          user: body,
        });
        if (error && !user) reply.code(400).send(error);
        if (user && !error) reply.code(201).send(user);
      } catch (err) {
        fastify.log.error(err);
        //boom the error ans send it
        reply.code(500).send(err);
      }
    }
  );

  fastify.post("/login", { schema: loginSchema }, async (request, reply) => {
    const { username, password } = request.body;
    try {
      const {
        token = false,
        user = false,
        error = false,
      } = await userService.login({
        username,
        password,
      });
      if (error && !user) reply.code(403).send(error);
      if (user && token && !error) reply.code(200).send({ ...user, token });
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send(err);
    }
  });

  fastify.get(
    "/account",
    { schema: accountSchema, preValidation: fastify.authenticate },
    async (request, reply) => {
      const { username } = request.user;
      try {
        const { user = false, error = false } = await userService.account({
          username,
        });
        if (error && !user) reply.code(400).send(error);
        if (user && !error) reply.code(200).send(user);
      } catch (err) {
        fastify.log.error(err);
        //boom the error ans send it
        reply.code(500).send(err);
      }
    }
  );
};

module.exports = userPlugin;
