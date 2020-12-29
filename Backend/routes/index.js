const express = require("express"),
  passport = require("passport");
router = express.Router();

router.get("/", function (req, res) {
  res.json({ success: true });
});
router.get("/contactus", function (req, res) {
  res.json({ success: true });
});

module.exports = router;
