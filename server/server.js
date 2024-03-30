const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://zprzemek378.github.io/fresh-car-rental/",
];

app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(express.static("public"));

app.use(cookieParser());

const trailersRouter = require("./routes/trailers");
const trucksRouter = require("./routes/trucks");
const placesRouter = require("./routes/places");
const usersRouter = require("./routes/users");
const loggedInRouter = require("./routes/loggedIn");
const refreshToken = require("./routes/refreshToken");
const ordersRouter = require("./routes/orders");
const allOrdersRouter = require("./routes/allOrders");

app.use("/trailers", trailersRouter);
app.use("/trucks", trucksRouter);
app.use("/places", placesRouter);
app.use("/users", usersRouter);
app.use("/loggedIn", loggedInRouter);
app.use("/refreshToken", refreshToken);
app.use("/orders", ordersRouter);
app.use("/allOrders", allOrdersRouter);

app.listen(3001);
