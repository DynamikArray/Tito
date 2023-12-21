const mongoose = require("mongoose");
const Retailer = require("./model");

class RetailerService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.audit = fastify.audit;
  }

  async create({ retailer }) {
    try {
      const newRetailer = await Retailer.create(retailer);
      /*
      await this.audit.log({
        action: "CREATE_RETAILER",
        resourceModel: "retailer",
        _retailer: newRetailer._id,
        values: newRetailer,
      });
      */
      return newRetailer;
    } catch (err) {
      throw err;
    }
  }

  async getAll({ filter = "" }) {
    try {
      const retailers = await Retailer.find({
        name: new RegExp(filter, "i"),
      }).lean();
      return retailers;
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }) {
    try {
      const retailer = await Retailer.findById(id).lean();
      return retailer;
    } catch (err) {
      throw err;
    }
  }

  async update({ id, retailer = {} }) {
    const retailerBefore = await this.getOne({ id });
    if (Object.entries(retailerBefore).length === 0) return retailerBefore;

    try {
      const retailerAfter = await Retailer.findByIdAndUpdate(
        retailerBefore._id,
        { $set: { ...retailer } },
        { new: true }
      ).lean();

      /*
      await this.audit.log({
        action: "UPDATE_RETAILER",
        resourceModel: "retailer",
        _retailer: retailerBefore._id,
        values: { retailerBefore, retailerAfter },
      });
      */

      return retailerAfter;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }) {
    try {
      const retailer = await Retailer.findByIdAndDelete(id).lean();
      if (!retailer) return { error: "Retailer with that Id, not found!" };
      /*
      await this.audit.log({
        action: "DELETE_RETAILER",
        resourceModel: "retailer",
        _retailer: retailer._id,
        values: retailer,
      });
      */
      return retailer;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { RetailerService };
