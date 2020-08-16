var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "TiTo - Node js application as Windows Service",
  description: "TiTo - Node application as Windows Service",
  script: "C:\\JoyfulBundles\\Tito\\server\\server.js",
});

module.exports = svc;
