const Express = require("express");
const router = Express.Router();
const Food = require("../models/Food");
const Category = require("../models/Category");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
router.patch("/", upload.single("image"), async (req, res) => {
  if (
    !req.body.old_image ||
    !req.body.name ||
    !req.body.price ||
    !req.body.category
  ) {
    return res.json({ saved: false, msg: "Incorrect data !" });
  }
  const { _id, old_image, name, price, category } = req.body;

  if (req.file) {
    const oldImagePath = path.join(__dirname, "../", "food-images", old_image);

    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error("Failed to delete old image:", err);
        return res.json({ saved: false, msg: "Error deleting old image!" });
      }
      console.log("Old image deleted successfully");
    });
    const newImagePath = req.file.filename;
    await Food.findOneAndUpdate(
      { _id },
      { name, price, category, image: newImagePath },
      { new: true }
    );

    res.json({
      saved: true,
      msg: "Food item updated successfully with new image!",
    });
  } else {
    await Food.findOneAndUpdate(
      { _id },
      { name, price, category },
      { new: true }
    );

    res.json({ saved: true, message: `${req.body.name} saved !` });
  }
});
router.delete("/", async (req, res) => {
  try {
    const { deleteId } = req.body;
    const foodItem = await Food.findByIdAndDelete(deleteId);
    if (!foodItem) {
      return res.send({ deleted: false, message: "Item not found" });
    }
    const imagePath = path.join(__dirname, "..", "food-images", foodItem.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res.send({
          deleted: false,
          message: "Error deleting image file",
        });
      }
      res.send({ deleted: true, message: "Item and image deleted" });
    });
  } catch (error) {
    console.log(error);
    res.send({ deleted: false, message: "Error deleting food item" });
  }
}),
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
