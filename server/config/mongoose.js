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
  useNameAndAlias: true,
};

module.exports = mongooseConfig;
