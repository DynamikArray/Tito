/*OLD UNTESTED NOT USED */

const mongoose = require("mongoose");
const Towel = require("../../server/plugins/towel/model");
const Brand = require("../../server/plugins/brand/model");

const url = "mongodb://localhost:27017/tito";
const seedData = require("./dbSeedValues.js");

const start = async () => {
  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("DB IS READY");

  seedData.forEach(async (towel) => {
    const towelDoc = new Towel({ ...towel });
    const newTowel = await towelDoc.save();
    if (newTowel._id) {
      const towel = await Towel.findById(newTowel._id).populate("brand");
      console.log("Saved!");
    }
  });
};

start();
