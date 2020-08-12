//Load each plugins model
const towels = require("../plugins/towel/model");
const manufacturers = require("../plugins/manufacturer/model");

//put all the loaded model definitions into one object
const models = [manufacturers, towels];

module.exports = models;
