const express = require("express"),
  passport = require("passport");
(multer = require("multer")), (router = express.Router());

router.get("/", function (req, res) {
  res.json({ success: true });
});
router.post("/create", function (req, res) {
  res.json({ success: true });
});
router.post("/edit/:id", function (req, res) {
  res.json({ success: true });
});
router.get("/search", function (req, res) {
  res.json({ success: true });
});
router.get("/:id", function (req, res) {
  const postID = req.params.id;
  res.json({ success: true });
});
router.post("/delete/:id", function (req, res) {
  res.json({ success: true });
});
// router.post("/comment/:id", function (req, res) {
//     res.json({ success: true });
//   });
module.exports = router;
