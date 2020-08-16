const svc = require("./Service");

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  console.log("Service started");
  svc.start();
});

svc.on("invalidinstallation ", function () {
  console.log("Service invalidinstallation ");
});

svc.install();
