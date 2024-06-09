const Mongoose = require("mongoose");

const foodSchema = Mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model("food", foodSchema);
