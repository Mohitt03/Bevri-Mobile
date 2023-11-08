express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  axios = require("axios")
passportLocalMongoose = require("passport-local-mongoose")



const User = require("../models/User");

var app = express();
app.use(express.static("public"))


mongoose.connect("mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const API_URL = "http://localhost:4000"
const API_URL_USER = "http://localhost:2000"
const ADMIN = "MOHIT0000";
const ADMIN_KEY = "1511";





// app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/About", (req, res) => {
  res.render("About.ejs");
});

app.get("/menu", (req, res) => {
  res.render("menu.ejs")
});

app.get("/groups", (req, res) => {
  res.render("groups.ejs")
});

app.get("/reservation", (req, res) => {
  res.render("Reservation.ejs")
});
app.get("/carousel", (req, res) => {
  res.render("carousel.ejs")
});



// Showing sign up form
app.get("/signup", function (req, res) {
  res.render("signup.ejs");
});

// Handling user registration
app.post("/signup", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  return res.render("login");
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login.ejs");
});

//Handling user login
app.post("/login", async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        // console.log(user.username);
        // res.render("secret");
        res.render("About.ejs", { name: req.body.username });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});



//Handling user logout
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.render('home.ejs');
  });
});





function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
app.listen("3000", () => {
  console.log("Listening on port 3000");
});