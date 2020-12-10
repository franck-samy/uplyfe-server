const router = require("express").Router();

router.get("/update-profile", (req, res, next) => {
  res.json("Update profile side");
});

module.exports = router;
