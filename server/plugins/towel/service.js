class TowelService {
  constructor(fastify) {
    if (!fastify.ready) throw new Error("Not Ready from fastify");
    this.fastify = fastify;
  }

  async create({ towel }) {
    const createdTowel = towel;
    return createdTowel;
  }
}

module.exports = { TowelService };
