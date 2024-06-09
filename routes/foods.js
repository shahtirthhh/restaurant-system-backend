const Express = require("express");
const router = Express.Router();
const Food = require("../models/food");
const Category = require("../models/Category");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "food-images/", // Specify the destination directory
  filename: function (req, file, cb) {
    const name = req.body.name.replace(/\s+/g, "_");
    const timestamp = Date.now();
    const ext = file.originalname.split(".").pop();
    const filename = `${name}_${timestamp}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json({ foodItems });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file || !req.body.name || !req.body.price || !req.body.category) {
    return res.json({ saved: false, msg: "Incorrect data !" });
  }

  const maxIdDoc = await Food.findOne().sort({ _id: -1 });
  const _id = maxIdDoc ? maxIdDoc._id + 1 : 1;

  const newFoodItem = new Food({
    _id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.file.filename, // Store the filename in the database
  });
  await newFoodItem.save();

  res.json({ saved: true, message: `${req.body.name} saved !` });
});

//! ---------------------------- Categories Routes
router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  setTimeout(() => {
    res.send(JSON.stringify({ categories }));
  }, 3000);
});
router.post("/categories", async (req, res) => {
  const maxIdDoc = await Category.findOne().sort({ _id: -1 });
  const _id = maxIdDoc ? maxIdDoc._id + 1 : 1;
  const category_name = req.body.category;
  const category = new Category({
    _id,
    category:
      category_name[0].toUpperCase() +
      category_name.slice(1, category_name.length),
  });
  await category.save();
  res.send({ saved: true });
});
router.delete("/categories", async (req, res) => {
  await Category.deleteOne({ _id: req.body.category._id });

  res.send(JSON.stringify({ deleted: true }));
});
module.exports = router;
