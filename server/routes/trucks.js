const express = require("express");
const router = express.Router();
const fs = require("fs");

const jsonFilePath = "server/public/trucks.json"; //ściezka do trucks

router.get("/", (req, res) => {
  try {
    fs.readFile(jsonFilePath, "utf-8", (error, data) => {
      if (error) {
        console.log("Read file error: ", error);
        return;
      }
      const trucks = JSON.parse(data);

      res.json(trucks);
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
      const trucks = JSON.parse(data);

      trucks.push(req.body);
      fs.writeFile(jsonFilePath, JSON.stringify(trucks), (error) => {
        if (error) console.log("Write file error: ", error);
      });
    });

    res.json({
      success: true,
      message: "Succesfully saved to trucks.json",
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router
  .route("/:id")
  .get((req, res) => {
    //req.params.id
  })
  .put((req, res) => {
    //req.params.id
  })
  .delete((req, res) => {
    //req.params.id
  });

// router.param("id", (req, res, next, id) => {

//   next();
// });

module.exports = router;
