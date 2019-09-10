const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
router.get("/", (req, res) => {
  res.render("welcome");
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log("This dashboard route invoke!");
  console.log(req);
  res.render("dashboard", {
    user: req.user[0]
  });
});

router.get("/checkAuth", ensureAuthenticated, (req, res) => {
  res.send(`You are login as ${req.email}`);
});
module.exports = router;
