const express = require("express");
const router = express.Router();
const fs = require("fs");

const jsonFilePath = "server/public/places.json"; //ściezka do places

router.get("/", (req, res) => {
  try {
    fs.readFile(jsonFilePath, "utf-8", (error, data) => {
      if (error) {
        console.log("Read file error: ", error);
        return;
      }
      const places = JSON.parse(data);

      res.json(places);
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", (req, res) => {
  try {
    fs.readFile(jsonFilePath, "utf-8", (error, data) => {
      if (error) {
        console.log("Read file error: ", error);
        return;
      }
      const places = JSON.parse(data);

      places.push(req.body);
      fs.writeFile(jsonFilePath, JSON.stringify(places), (error) => {
        if (error) console.log("Write file error: ", error);
      });
    });

    res.json({
      success: true,
      message: "Succesfully saved to places.json",
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router
  .route("/:id")
  .get((req, res) => {})
  .put((req, res) => {})
  .delete((req, res) => {});

// router.param("id", (req, res, next, id) => {
//   next();
// });

module.exports = router;
