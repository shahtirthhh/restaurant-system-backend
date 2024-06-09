// Importing packages
const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Cors = require("cors");
const path = require("path");

require("dotenv/config");

const APP = Express();
const PORT = process.env.PORT || 5000;
const FOOD_ROUTES = require("./routes/foods");

APP.use(Cors());
APP.use(BodyParser.json());

APP.use("/food-images", Express.static(path.join(__dirname, "food-images")));
APP.use("/foods", FOOD_ROUTES);

APP.get("/*", (req, res) => {
  res.send(JSON.stringify({ msg: "404 Not found !" }));
});

async function connect_to_db() {
  try {
    await Mongoose.connect(process.env.URI);
    APP.listen(process.env.PORT);
    console.log("🔗 Connected to the DB");
    console.log(`Server Listening at ${PORT}`);
  } catch (err) {
    console.log("💀 Error connecting to DB...");
    console.log("\n" + err);
  }
}

connect_to_db();
