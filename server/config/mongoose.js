const models = require("../models");

const mongoose = {
  uri: process.env.MONGO_URI,
  settings: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    config: {
      autoIndex: true,
    },
  },
  models,
};

module.exports = mongoose;
