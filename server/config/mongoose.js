const models = require("../models");

const mongooseConfig = {
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

module.exports = mongooseConfig;
