var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
  name: "TiTo - Windows Service",
  description: "TiTo - Node application as Windows Service",
  script: "C:\\JoyfulBundles\\Tito\\server\\start.js",
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
});

module.exports = svc;
