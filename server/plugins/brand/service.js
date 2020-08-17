const mongoose = require("mongoose");
const Brand = require("./model");

class BrandService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.audit = fastify.audit;
  }

  async create({ brand }) {
    try {
      const newBrand = await Brand.create(brand);
      await this.audit.log({
        action: "CREATE_BRAND",
        resourceModel: "brand",
        _brand: newBrand._id,
        values: newBrand,
      });
      return newBrand;
    } catch (err) {
      throw err;
    }
  }

  async getAll({ filter = "" }) {
    try {
      const brands = await Brand.find({
        name: new RegExp(filter, "i"),
      }).lean();
      return brands;
    } catch (err) {
      throw err;
    }
  }

  async getOne({ id }) {
    try {
      const brand = await Brand.findById(id).lean();
      return brand;
    } catch (err) {
      throw err;
    }
  }

  async update({ id, brand = {} }) {
    const brandBefore = await this.getOne({ id });
    if (Object.entries(brandBefore).length === 0) return brandBefore;

    try {
      const brandAfter = await Brand.findByIdAndUpdate(
        brandBefore._id,
        { $set: { ...brand } },
        { new: true }
      ).lean();

      await this.audit.log({
        action: "UPDATE_BRAND",
        resourceModel: "brand",
        _brand: brandBefore._id,
        values: { brandBefore, brandAfter },
      });

      return brandAfter;
    } catch (err) {
      throw err;
    }
  }

  async delete({ id }) {
    try {
      const brand = await Brand.findByIdAndDelete(id).lean();
      if (!brand) return { error: "Brand with that Id, not found!" };
      await this.audit.log({
        action: "DELETE_BRAND",
        resourceModel: "brand",
        _brand: brand._id,
        values: brand,
      });
      return brand;
    } catch (err) {
      throw err;
    }
  }
} //end class
module.exports = { BrandService };
