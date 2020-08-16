/*
"C:\Program Files\MongoDB\Tools\100\bin\mongodump.exe" -d tito -o D:\Development\Projects\Tito\util\backups
*/

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/tito";

const db = await mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.copyDatabase("tito", "tito", url);
