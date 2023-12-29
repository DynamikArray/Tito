const mongoose = require("mongoose");
const Audit = require("./model");

class AuditService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
  }

  async getAll({ action = "", sort = "-updatedAt" }) {
    try {
      const logs = await Audit.find({
        action: new RegExp(action, "i"),
      })
        .populate("_brand")
        .populate("_towel")
        .sort(sort)
        .lean();
      return logs;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { AuditService };
