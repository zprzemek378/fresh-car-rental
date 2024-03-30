const express = require("express");
const router = express.Router();
const fs = require("fs");

const path = require("path");
const verifyJWT = require("../middleware/verifyJWT");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

let orders = [];

const jsonFilePath = "server/private/orders.json"; //ściezka do orders
fs.readFile(jsonFilePath, "utf-8", async (error, data) => {
  const content = await JSON.parse(data);
  orders.push(...content);
  if (error) {
    console.log("Read file error: ", error);
    return;
  }
});

router.get("/", verifyJWT, (req, res) => {
  console.log("jestem w get orders");
  try {
    const userOrders = orders.filter((o) => o.email === req.email);

    res.status(200).json(userOrders);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      orderdate,
      ordernumber,
      pickuplocation,
      pickupdate,
      dropofflocation,
      dropoffdate,
      truck,
      trailer,
      duration,
      totalcost,
      firstname,
      lastname,
      address,
      city,
      zip,
      email,
      phone,
    } = req.body;

    const newOrder = {
      orderdate: orderdate,
      ordernumber: ordernumber,
      pickuplocation: pickuplocation,
      pickupdate: pickupdate,
      dropofflocation: dropofflocation,
      dropoffdate: dropoffdate,
      truck: truck,
      trailer: trailer,
      duration: duration,
      totalcost: totalcost,
      firstname: firstname,
      lastname: lastname,
      address: address,
      city: city,
      zip: zip,
      email: email,
      phone: phone,
    };

    orders.push(newOrder);

    fs.writeFile(jsonFilePath, JSON.stringify(orders), (error) => {
      if (error) console.log("Write file error: ", error);
    });
    res.status(201).json({
      success: "New order added",
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
