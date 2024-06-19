// Importing packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv/config");

const APP = express();
const PORT = process.env.PORT || 5000;
const FOOD_ROUTES = require("./routes/foods");
const ORDER_ROUTES = require("./routes/orders");

const CORS_CONFIG = {
  // origin: "http://localhost:3000", // allow requests from this origin
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // allow these methods
  allowedHeaders: ["Content-Type", "Authorization"], // allow these headers
};

// Use the CORS middleware with the specified options
APP.use(cors(CORS_CONFIG));

// Middleware to handle preflight requests
APP.options("*", cors(CORS_CONFIG));

// Middleware to parse JSON bodies
APP.use(bodyParser.json());

// Serve static files
APP.use("/food-images", express.static(path.join(__dirname, "food-images")));
APP.use("/foods", FOOD_ROUTES);
APP.use("/orders", ORDER_ROUTES);

// Catch-all route for 404
APP.get("/*", (req, res) => {
  res.status(404).send(JSON.stringify({ msg: "404 Not found !" }));
});

// Print server start message
const print_msg = () => {
  console.log(
    " _____________________________________________________________________"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    `|                    Server listening at port ${PORT}     🥳             |`
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|                                                                     |"
  );
  console.log(
    "|_____________________________________________________________________|"
  );
};

// Connect to MongoDB and start server
async function connect_to_db() {
  const loadingMessage = ["😐", "😒", "🥱", "🧐"];
  let i = 0;
  const spinner = setInterval(() => {
    console.clear();
    process.stdout.write(
      `\n\n\n\n\n\t\t\t\tConnecting to database ${loadingMessage[i]}`
    );
    i = (i + 1) % loadingMessage.length;
  }, 500);

  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    clearInterval(spinner);
    console.clear();
    APP.listen(PORT, () => {
      print_msg();
    });
  } catch (err) {
    clearInterval(spinner);
    console.log("\n💀 Error connecting to DB...");
    console.log(err);
  }
}

connect_to_db();
