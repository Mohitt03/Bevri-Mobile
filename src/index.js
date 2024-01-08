express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  axios = require("axios")
passportLocalMongoose = require("passport-local-mongoose")
var session = require('express-session');


// Models

const Reservation = require("../models/Reservations");
const User = require("../models/User");
const Product = require("../models/Products");
const { text } = require("body-parser");
var app = express();
app.use(express.static("public"))


// MongoDB Username Password 
mongoose.connect("mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority");

app.set('view engine', 'ejs');
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
const API_URL = "http://localhost:5000"
// const API_URL_USER = "http://localhost:2000"
const ADMIN = "MOHIT0000";
const ADMIN_KEY = "1511";



//      ====-----==== Login and Signup Section ====-----====



// Showing sign up form
app.get("/signup", function (req, res) {
  res.render("signup.ejs");
});

// Handling user registration
app.post("/signup", async (req, res) => {



  // check if the Reservation, date and time exists
  const UserName = await User.findOne({ username: req.body.username });
  if (UserName) {

    return res.render("signup", { avialaibility: "Username or email already exists" })

  }
  else {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    return res.render("login");
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
    req.session.username = username; 1

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
    console.log(error.message);
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
  const username = req.session.username;
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


// app.get("/TableBookingComplete", async (req, res) => {

//   const reservation = await Reservation.create({
//     username: "MOhit",
//     number: "1234567898",
//     restaurant: "Bevri los altos",
//     date: "12/1/2023",
//     people: "2",
//     seat: "Standard"
//   });
//   res.render("TableBookingComplete.ejs",{reservation})
// })

app.get("/Admin", (req, res) => {
  res.render("Admin.ejs")
})

app.get("/order", (req, res) => {
  res.render("order.ejs")
})

app.get("/pickup", (req, res) => {
  res.render("pickup.ejs")
})

app.get("/seemore", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/SmallPlates/?key=123456789`);
    const response1 = await axios.get(`${API_URL}/SoupsandSalads/?key=123456789`);
    const response2 = await axios.get(`${API_URL}/Essentials/?key=123456789`);
    const response3 = await axios.get(`${API_URL}/MeatandFish/?key=123456789`);
    const response4 = await axios.get(`${API_URL}/SoftDrinks/?key=123456789`);
    const response5 = await axios.get(`${API_URL}/Desserts/?key=123456789`);
    const response6 = await axios.get(`${API_URL}/Wine/?key=123456789`);
    // console.log(response);
    res.render("seemore.ejs",
      {
        datas: response.data,
        datas1: response1.data,
        datas2: response2.data,
        datas3: response3.data,
        datas4: response4.data,
        datas5: response5.data,
        datas6: response6.data,
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
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
      });
      res.render("TableBookingComplete.ejs",{reservation})

    }
  } catch (error) {
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

app.get("/createproduct", (req, res) => {
  res.render("createproduct.ejs")
});
app.post("/createproduct", async (req, res) => {

  try {

    const product = await Product.create({
      name: req.body.name,
      type: req.bodyu.type,
      price: req.body.price,
      brief: req.body.brief,
      img: req.body.img,
      img2: req.body.img2

    });

    res.redirect("/products");

  } catch (error) {
    console.log(error.message);
  }


})

app.get("/api/Pdata/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/Pdata/${req.params.id}/?key=123456789`);
    res.redirect("/products");
  } catch (error) {
    res.json({ message: "Error deleting post" });
  }
});









//      ====-----==== Server Rendering Section ====-----====


app.listen("3000", () => {
  console.log("Listening on port 3000");
});