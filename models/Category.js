const Mongoose = require("mongoose");

const categorySchema = Mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model("categorie", categorySchema);
