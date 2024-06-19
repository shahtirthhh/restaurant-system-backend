const Mongoose = require("mongoose");

const orderSchema = Mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  payment_done: {
    type: Boolean,
    required: true,
    default: false,
  },
  served: {
    type: Boolean,
    required: true,
    default: false,
  },
  canceled: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = Mongoose.model("order", orderSchema);
