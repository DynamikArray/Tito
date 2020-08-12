const documentation = {
  routePrefix: "/docs",
  swagger: {
    info: {
      version: "1.0.0",
      title: "TiTo API Documentation",
      description:
        "Towels In, Towels Out. Towels Inventory Management Application",
    },
    //schemes: [process.env.options.https ? "https" : "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "Info", description: "Info and Utility related end-points" },
      { name: "Towel", description: "Towel related end-points" },
      { name: "Manufacturer", description: "Manufacturer related end-points" },
    ],
    /*
    securityDefinitions: {
      token: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    */
  },
  exposeRoute: true,
};

module.exports = documentation;
