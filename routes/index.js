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

router.get("/item/:id", (req, res) => {
  console.log("Hello from router items get");
  console.log("HERE?");
  Items.findById(req.params.id).then((singleItem) => {
    res.json(singleItem);
  });
});

router.get("/update-item/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  Items.findById(req.params.id).then((singleItem) => {
    res.json(singleItem);
  });
});

router.put("/item/:id", isLoggedIn, (req, res) => {
  console.log("Hello from router items put");
  console.log(req.params.id);

  Items.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (singleItemUpdated) => {
      console.log(singleItemUpdated);
      res.json(singleItemUpdated);
    }
  );
});

// router.use("/new-item", newItems);

router.use("/auth", authRoutes);

module.exports = router;
