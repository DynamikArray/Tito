class TowelService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.fastify = fastify;
  }

  async create({ towel }) {
    try {
      const { Towel } = this.fastify.mongoose;
      const newTowel = await Towel.create(towel);
      return newTowel;
    } catch (err) {
      throw err;
    }
  }

  async getAll({ filter = {} }) {
    try {
      const { Towel } = this.fastify.mongoose;
      const towels = await Towel.find({ name: /[filter]/ });
      return towels;
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }) {
    try {
      const { Towel } = this.fastify.mongoose;
      const towel = await Towel.findById(id);
      return towel;
    } catch (err) {
      throw err;
    }
  }

  async update({ id, towel = {} }) {
    const towelBefore = await this.getOne({ id });
    if (Object.entries(towelBefore).length === 0) return towelBefore;

    try {
      const { Towel } = this.fastify.mongoose;
      const towelAfter = await Towel.findByIdAndUpdate(
        towelBefore._id,
        { $set: { ...towel } },
        { new: true }
      );
      return towelAfter;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }) {
    try {
      const { Towel } = this.fastify.mongoose;
      const towel = await Towel.findByIdAndDelete(id);
      if (!towel) return { error: "Towel with that Id, not found!" };
      return towel;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { TowelService };
