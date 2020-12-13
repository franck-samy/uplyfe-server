const router = require("express").Router();
const authRoutes = require("./auth");
const Items = require("../models/Items.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
  // Items.find()
  //   .populate("owner")
  //   .then((allItems) => {
  //     res.json(allItems);
  //   });
});

router.get("/all-items", (req, res, next) => {
  Items.find()
    .populate("owner")
    .then((allItems) => {
      res.json(allItems);
    });
});

router.post("/new-item", isLoggedIn, (req, res) => {
  const { category, title, description } = req.body;

  Items.create({
    category,
    title,
    description,
    owner: req.body.owner._id,
  })
    .then((newItem) => {
      res.json(newItem);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/items/:id", (req, res) => {
  console.log(req.params)
  Items.findById(req.params.id).then((singleItem) => {
    res.json(singleItem);
  });
});

// router.use("/new-item", newItems);

router.use("/auth", authRoutes);

module.exports = router;
