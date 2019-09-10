const express = require("express");
const passport = require("passport");

const router = express.Router();

//Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("custom", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are loggout");
  res.redirect("/users/login");
});

module.exports = router;
