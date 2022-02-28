const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/edit/:id", (req, res) => {
  res.render("edit", {
    id: req.params.id,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, illum odio. Repudiandae possimus rem, nemo impedit delectus velit facere tempore libero sunt accusamus quae ut! Possimus sint mollitia voluptatum illum?",
  });
});

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});
