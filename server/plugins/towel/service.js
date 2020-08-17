const mongoose = require("mongoose");
const Towel = require("./model");

class TowelService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.audit = fastify.audit;
  }

  async create({ towel }) {
    try {
      const towelDoc = new Towel({ ...towel });

      const newTowel = await towelDoc.save();
      if (newTowel._id) {
        const towel = await Towel.findById(newTowel._id)
          .populate("brand")
          .lean();

        await this.audit.log({
          action: "CREATE_TOWEL",
          resourceModel: "towel",
          _towel: towel._id,
          values: towel,
        });

        return towel;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  async getAll({ filter = "", upc = "", sort = "-updatedAt" }) {
    try {
      const towels = await Towel.find({
        color: new RegExp(filter, "i"),
        upc: new RegExp(upc, "i"),
      })
        .populate("brand")
        .sort(sort)
        .lean();
      return towels;
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }) {
    try {
      const towel = await Towel.findById(id).populate("brand").lean();
      if (!towel) throw Error("No Towel with that Id found!");
      return towel;
    } catch (err) {
      throw err;
    }
  }

  async update({ id, towel = {} }) {
    const towelBefore = await Towel.findById(id).lean();
    if (Object.entries(towelBefore).length === 0) return towelBefore;

    try {
      const towelAfter = await Towel.findByIdAndUpdate(
        towelBefore._id,
        { $set: { ...towel } },
        { new: true }
      )
        .populate("brand")
        .lean();

      await this.audit.log({
        action: "UPDATE_TOWEL",
        resourceModel: "towel",
        _towel: towel._id,
        values: { towelBefore, towelAfter },
      });

      return towelAfter;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }) {
    try {
      const towel = await Towel.findByIdAndDelete(id).populate("brand").lean();
      if (!towel) return { error: "Towel with that Id, not found!" };

      await this.audit.log({
        action: "DELETE_TOWEL",
        resourceModel: "towel",
        _towel: towel._id,
        values: towel,
      });

      return towel;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { TowelService };
