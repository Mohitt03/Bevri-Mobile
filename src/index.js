express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  axios = require("axios")
passportLocalMongoose = require("passport-local-mongoose")
var session = require('express-session');

const Reservation = require("../models/Reservations");
const User = require("../models/User");
const { text } = require("body-parser");
const userData = require('../public/JS/userData');
var app = express();
app.use(express.static("public"))

mongoose.connect("mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority");

app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
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
const API_URL = "http://localhost:2000"
// const API_URL_USER = "http://localhost:2000"
const ADMIN = "MOHIT0000";
const ADMIN_KEY = "1511";


//      ====-----==== Login and Signup Section ====-----====



// Showing sign up form
app.get("/signup", function (req, res) {
  res.render("signup.ejs");
});

// Handling user registration
app.post("/signup/Udata", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.render("login.ejs");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
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
    const username = req.body.username; // Assuming you retrieve the username from the login form
    req.session.username = username;
    userData.setUsername(username);

    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        // console.log(user.username);
        // res.render("secret");
        res.render("Home.ejs", { name: req.session.username });
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



//      ====-----==== Path Section ====-----====



// app.get("/", (req, res) => {
//   res.render("Home.ejs");
// });

// app.get("/signup", (req, res) => {
//   res.render("signup.ejs");
// });

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/Home", (req, res) => {
  // const username = req.session.username;
  res.render("Home.ejs");
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

app.get("/MyAccount", (req, res) => {
  res.render("MyAccount.ejs")
})

app.get("/TableBooking", (req, res) => {
  res.render("TableBooking.ejs")
})

app.get("/TableBooking2", (req, res) => {
  res.render("TableBooking2.ejs")
})


app.get("/TableBookingComplete", (req, res) => {
  res.render("TableBookingComplete.ejs")
})

app.get("/Admin", (req, res) => {
  res.render("Admin.ejs")
})




//      ====-----==== Table Booking Section ====-----====


app.post("/TableBooking", async (req, res) => {
  try {
    


  // check if the Reservation, date and time exists
  const Restaurant = await Reservation.findOne({ restaurant: req.body.restaurant });
  const Date = await Reservation.findOne({ date: req.body.date });
  const Time = await Reservation.findOne({ time: req.body.time });
  if (Restaurant && Date && Time) {

    return res.render("TableBooking", { avialaibility: "none" })

  }
  else {
    const reservation = await Reservation.create({
      username: req.body.username,
      number: req.body.number,
      restaurant: req.body.restaurant,
      date: req.body.date,
      time: req.body.time,
      people: req.body.people,
      seat: req.body.seat,
      ocassion: req.body.ocassion,
      username: req.body.username
    });
    res.render("TableBookingComplete.ejs")

  }  } catch (error) {
    console.log(error.message);
  }

});

//      ====-----==== Admin  Section ====-----====

// Orders//


app.get("/orders", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/Data/?key=123456789`);
    console.log(response);
    res.render("orders.ejs", { datas: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/api/Data/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/Data/${req.params.id}/?key=123456789`);
    res.redirect("/orders");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});



// Users Data//


app.get("/Users", async (req, res) => {
  try {
    const uresponse = await axios.get(`${API_URL}/Udata/?key=123456789`);
    console.log(uresponse);
    res.render("Users.ejs", { datas: uresponse.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/api/Udata/delete/:id", async (req, res) => {
  try {
  await axios.delete(`${API_URL}/Udata/${req.params.id}/?key=123456789`);
  res.redirect("/users");
} catch (error) {
  res.status(500).json({ error: error });
}

});



// Products Data//



app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/Pdata/?key=123456789`);
    console.log(response);
    res.render("product.ejs", { datas: response.data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/api/Udata/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/Pdata/${req.params.id}/?key=123456789`);
    res.redirect("/users");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});







//      ====-----==== Server Rendering Section ====-----====


app.listen("3000", () => {
  console.log("Listening on port 3000");
});