const express = require("express");
const router = express.Router();

// Middlewares
router.use((req, res, next) => {
  console.log(`Current time: ${Date.now()}`);
  next();
});

// Route paths
router.get("/", (req, res) => {
  res.send("<h2>Landing page for cars</h2>");
});

router.get("/:id", (req, res) => {
  res.send(`<h2>You searched for car with id: ${req.params.id}</h2>`);
});

module.exports = router;
