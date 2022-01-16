const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/posts", (req, res) => {
  res.send("This is /posts path");
});

app.get("/posts/:id", (req, res) => {
  res.send(`This is /posts/${req.params.id} path`);
});

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});
