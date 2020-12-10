const router = require("express").Router();

router.get("/sign-out", (req, res, next) => {
  res.json("Sign out page here");
});

module.exports = router;
