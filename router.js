const express = require("express");

const router = express.Router();

router.use(checkAdminUser);

// Route handlers
router.get("/", (req, res) => {
  res.send("Landing page");
});

router.get("/users", (req, res) => {
  res.send("get on /users");
});

router.all(
  "/users/:id",
  (req, res, next) => {
    const userId = req.params.id;

    if (userId === "admin") return next("route");
    next();
  },
  (req, res) => {
    res.send(`First router ${req.method} on /users/${req.params.id}`);
  },
);

router.all("/users/:id", (req, res) => {
  res.send(`Second router ${req.method} on /users/${req.params.id}`);
});

// Middlewares
function checkAdminUser(req, res, next) {
  if (req.method !== "GET") return next("router");
  next();
}

module.exports = router;
