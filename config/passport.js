// const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const request = require("request").defaults({ rejectUnauthorized: false });
const CustomStrategy = require("passport-custom").Strategy;
// Load User Model
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new CustomStrategy((req, done) => {
      request.post(
        "https://10.10.5.103/authenticate",
        {
          form: {
            username: req.body.email,
            password: req.body.password,
            type: "plain",
            ignoreRedirect: true,
            forceLogin: true
          }
        },
        (err, httpResponse, body) => {
          if (err) console.log(err);
          body = JSON.parse(body);
          if (body["message"] === "Invalid username or password") {
            return callback(null, false, {
              message: "Invalid username or password"
            });
          }
          if (body["success"] === true) {
            return callback(null, httpResponse.headers);
          }
        }
      );
      function callback(err, content) {
        if (content) {
          done(null, content);
        } else {
          done(null, false, {
            message: "Username or password is not correct please try again."
          });
        }
      }
    })
  );
  passport.serializeUser(function(user, done) {
    done(null, user["set-cookie"]);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
