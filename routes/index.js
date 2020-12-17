const router = require("express").Router();
const authRoutes = require("./auth");
const Items = require("../models/Items.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const User = require("../models/User.model");
const Comments = require("../models/Comments.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
  // Items.find()
  //   .populate("owner")
  //   .then((allItems) => {
  //     res.json(allItems);
  //   });
});

router.get("/all-users", (req, res, next) => {
  User.find()
    .populate("users")
    .then((allUsers) => {
      res.json(allUsers);
    });
});

router.get("/user/:id", (req, res) => {
  console.log("REQ.MATCH", req);
  User.findById(req.params.id).then((singleUser) => {
    res.json(singleUser);
  });
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

router.post("/clone-item", isLoggedIn, (req, res) => {
  const { category, title, description } = req.body;
  console.log(req.user);
  Items.create({
    category,
    title,
    description,
    owner: req.user,
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

router.delete("/delete-item/:id", (req, res) => {
  Items.findByIdAndRemove(req.params.id).then((deleteItem) => {
    res.json(deleteItem);
  });
});

router.put("/item/:id", isLoggedIn, (req, res) => {
  console.log("Hello from router items put");
  console.log(req.params.id);

  Items.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (singleItemUpdated) => {
      // console.log(singleItemUpdated);
      res.json(singleItemUpdated);
    }
  );
});

router.get("/userItems/:id", (req, res) => {
  const userId = req.params.id;
  Items.find({ owner: userId }).then((data) => {
    console.log("OWNER", userId);
    res.json(data);
  });
});

router.get("/update-profile/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  User.findById(req.params.id).then((singleUser) => {
    res.json(singleUser);
  });
});

router.put("/profile/:id", isLoggedIn, (req, res) => {
  // console.log(req.params.id);

  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (singleUserUpdated) => {
      //console.log(singleUserUpdated);
      res.json(singleUserUpdated);
    }
  );
});

router.get("/all-comments", (req, res, next) => {
  Comments.find()
    .populate("author")
    .then((allComments) => {
      res.json(allComments);
    });
});

router.post("/new-comment", isLoggedIn, (req, res) => {
  console.log("req body", req.body);
  const { itemID, authorId, commentText } = req.body;
  Comments.create({
    comment_item: itemID,
    author: authorId,
    commentText,
  })
    .then((newComment) => {
      res.status(201).json(newComment);
    })
    .catch((err) => {
      console.log("Err here", err);
    });
});

router.use("/auth", authRoutes);

module.exports = router;
