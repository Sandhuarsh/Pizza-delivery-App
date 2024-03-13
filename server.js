const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
dotenv.config();

//connection mongodb
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})
app.get("/", (req, res) => {
  res.send("<h1>Hello From Node Server vai nodemon</h1>");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On mode on port no ${process.env.PORT}`
      .bgMagenta.white
  );
});
