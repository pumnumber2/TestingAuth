const express = require("express");
const expressLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const app = express();

// Passport config
require("./config/passport")(passport);
// DB Config
const db = require("./config/keys").MongoURI;
// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//EJS
app.use(expressLayout);
app.set("view engine", "ejs");

//BodyParser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
  session({
    secret: "ChUtIwAt_RoJaNaChAi",
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());
// Global Variable
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
