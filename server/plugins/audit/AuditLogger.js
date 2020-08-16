const Audit = require("./model");

class AuditLogger {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
  }
  async log(entry) {
    try {
      const logDoc = new Audit({ ...entry });
      const newLog = await logDoc.save();
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { AuditLogger };
