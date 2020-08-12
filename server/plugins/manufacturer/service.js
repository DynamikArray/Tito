class ManufacturerService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.fastify = fastify;
  }

  async create({ manufacturer }) {
    try {
      const { Manufacturer } = this.fastify.mongoose;
      const newManufacturer = await Manufacturer.create(manufacturer);
      return newManufacturer;
    } catch (err) {
      throw err;
    }
  }

  async getAll({ filter = "" }) {
    try {
      const { Manufacturer } = this.fastify.mongoose;
      const manufacturers = await Manufacturer.find({
        name: new RegExp(filter, "i"),
      });
      return manufacturers;
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }) {
    try {
      const { Manufacturer } = this.fastify.mongoose;
      const manufacturer = await Manufacturer.findById(id);
      return manufacturer;
    } catch (err) {
      throw err;
    }
  }

  async update({ id, manufacturer = {} }) {
    const manufacturerBefore = await this.getOne({ id });
    if (Object.entries(manufacturerBefore).length === 0)
      return manufacturerBefore;

    try {
      const { Manufacturer } = this.fastify.mongoose;
      const manufacturerAfter = await Manufacturer.findByIdAndUpdate(
        manufacturerBefore._id,
        { $set: { ...manufacturer } },
        { new: true }
      );
      return manufacturerAfter;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }) {
    try {
      const { Manufacturer } = this.fastify.mongoose;
      const manufacturer = await Manufacturer.findByIdAndDelete(id);
      if (!manufacturer)
        return { error: "Manufacturer with that Id, not found!" };
      return manufacturer;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { ManufacturerService };
