const express = require("express");

const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
router.get("/", (req, res) => {
  res.render("welcome");
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user[0]
  });
});

router.get("/checkAuth", ensureAuthenticated, (req, res) => {
  res.send(`You are login as ${req.user[0]}`);
});
module.exports = router;
