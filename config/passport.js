const CustomStrategy = require("passport-custom").Strategy;
const request = require("request").defaults({ rejectUnauthorized: false });

const crossflowAuthenticationPath = require("./keys")
  .crossflowAuthenticationPath;

module.exports = function(passport) {
  passport.use(
    new CustomStrategy((req, done) => {
      request.post(
        crossflowAuthenticationPath,
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
            return callback(null, httpResponse.headers["set-cookie"]);
          }
        }
      );
      function callback(err, cookie) {
        if (cookie) {
          done(null, cookie);
        } else {
          done(null, false, {
            message: "Username or password is not correct please try again."
          });
        }
      }
    })
  );
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
