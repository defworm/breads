// DEPENDENCIES

require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// CONFIGURATION


const PORT = process.env.PORT;
const app = express();

mongoose.connect(
  "mongodb+srv://defworm:xntznWLC8vID68OO@cluster0.vvtkihj.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongo: ", "mongodb+srv://defworm:xntznWLC8vID68OO@cluster0.vvtkihj.mongodb.net/?retryWrites=true&w=majority");
  }
);

// MIDDLEWARE
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to an awesome App about Breads");
});

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


// LISTEN
app.listen(PORT, () => {
  console.log("nomming at port", PORT);
});

