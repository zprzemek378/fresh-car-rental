const express = require("express");
const router = express.Router();
const fs = require("fs");

const jsonFilePath = "server/public/trailers.json"; //ściezka do trailers

router.get("/", (req, res) => {
  try {
    fs.readFile(jsonFilePath, "utf-8", (error, data) => {
      if (error) {
        console.log("Read file error: ", error);
        return;
      }
      const trailers = JSON.parse(data);

      res.json(trailers);
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
      const trailers = JSON.parse(data);

      trailers.push(req.body);
      fs.writeFile(jsonFilePath, JSON.stringify(trailers), (error) => {
        if (error) console.log("Write file error: ", error);
      });
    });

    res.json({
      success: true,
      message: "Succesfully saved to trailers.json",
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router
  .route("/:id")
  .get((req, res) => {
    //req.trailer
    //req.params.id
  })
  .put((req, res) => {
    //req.params.id
  })
  .delete((req, res) => {
    //req.params.id
  });

// router.param("id", (req, res, next, id) => {
//   req.trailer = trailers[id]; //ustawia to zanim trafi tam wyej
//   next();
// });

module.exports = router;
