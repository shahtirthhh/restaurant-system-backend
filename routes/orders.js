const Express = require("express");
const router = Express.Router();

const Order = require("../models/Order");

router.get("/", async (req, res) => {
  const orders = await Order.find({
    canceled: false,
    $or: [{ payment_done: false }, { payment_done: true, served: false }],
  });
  res.send({ orders });
});
router.get("/chef-orders", async (req, res) => {
  const orders = await Order.find({ canceled: false, served: false });
  res.send({ orders });
});
router.post("/previous-orders", async (req, res) => {
  const { startingId, endId } = req.body;

  if (startingId === undefined || endId === undefined)
    res.send({ error: true, message: "Data not provided" });
  else {
    const orders = await Order.find({
      _id: { $gte: startingId, $lte: endId },
    });
    res.send({ orders });
  }
});

router.post("/", async (req, res) => {
  const { items, total, tableNumber } = req.body;
  if (items.length < 1 || total <= 0 || isNaN(parseInt(tableNumber)))
    res.send({ placed: false });

  const maxIdDoc = await Order.findOne().sort({ _id: -1 });
  const _id = maxIdDoc ? maxIdDoc._id + 1 : 1;

  const new_order = new Order({
    _id,
    items,
    total,
    tableNumber,
    date: new Date().toDateString(),
  });
  const placed_order = await new_order.save();
  res.send({ placed: true, placed_order });
});

router.patch("/mark_as_paid", async (req, res) => {
  const { _id } = req.body;
  if (!_id) res.send({ marked: false, message: "Invalid Data !" });

  await Order.findOneAndUpdate({ _id }, { payment_done: true }, { new: true });
  res.send({ marked: true });
});
router.patch("/mark_as_served", async (req, res) => {
  const { _id } = req.body;
  if (!_id) res.send({ marked: false, message: "Invalid Data !" });

  await Order.findOneAndUpdate({ _id }, { served: true }, { new: true });
  res.send({ marked: true });
});
router.patch("/cancel_order", async (req, res) => {
  const { _id } = req.body;
  if (!_id) res.send({ canceled: false, message: "Invalid Data !" });

  await Order.findOneAndUpdate({ _id }, { canceled: true }, { new: true });
  res.send({ canceled: true });
});

module.exports = router;
