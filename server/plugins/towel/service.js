const mongoose = require("mongoose");

class TowelService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.mongoose = fastify.mongoose;
  }

  async create({ towel }) {
    try {
      const towelDoc = new this.mongoose.Towel({
        ...towel,
      });

      const newTowel = await towelDoc.save();
      if (newTowel._id) {
        const towel = await this.mongoose.Towel.findById(newTowel._id).populate(
          "manufacturer"
        );
        return towel;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  async getAll({ filter = "" }) {
    try {
      const { Towel } = this.mongoose;
      const towels = await Towel.find({
        name: new RegExp(filter, "i"),
      }).populate("manufacturer");
      return towels;
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }) {
    try {
      const { Towel } = this.mongoose;
      const towel = await Towel.findById(id).populate("manufacturer");
      if (!towel) throw Error("No Towel with that Id found!");
      return towel;
    } catch (err) {
      throw err;
    }
  }

  async update({ id, towel = {} }) {
    const { Towel } = this.mongoose;
    const towelBefore = await Towel.findById(id);
    if (Object.entries(towelBefore).length === 0) return towelBefore;

    try {
      const { Towel } = this.mongoose;
      const towelAfter = await Towel.findByIdAndUpdate(
        towelBefore._id,
        { $set: { ...towel } },
        { new: true }
      ).populate("manufacturer");
      return towelAfter;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }) {
    try {
      const { Towel } = this.mongoose;
      const towel = await Towel.findByIdAndDelete(id).populate("manufacturer");
      if (!towel) return { error: "Towel with that Id, not found!" };
      return towel;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { TowelService };
