const express = require("express");
const router = express.Router();
const fs = require("fs");

const verifyJWT = require("../middleware/verifyJWT");

router.get("/", verifyJWT, (req, res) => {
  res.status(200).json({ loggedIn: true, email: req.email });
});

module.exports = router;
