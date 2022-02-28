const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  res.render("home", { todos: await db.getAll() });
});

router
  .route("/add")
  .get((req, res) => {
    res.render("add");
  })
  .post((req, res) => {
    console.log(req.body);
    if (req.body && req.body.title) {
      const newTodo = {
        id: mockData.length + 1,
        title: req.body.title,
        description: req.body.description,
      };
      mockData.push(newTodo);
      res.redirect("/");
    } else {
      res.send("Please provide at least a title for todo");
    }
  });

router.get("/edit/:id", (req, res) => {
  const foundTodo = mockData.find((el) => el.id.toString() === req.params.id);
  if (foundTodo) {
    res.render("edit", {
      id: foundTodo.id,
      title: foundTodo.title,
      description: foundTodo.description,
    });
  } else {
    res.status(404).send("Not Found");
  }
});

router.get("/test", async (req, res) => {
  res.send(await db.getAll());
});

router.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

function validate(req, res) {
  if (req.body && req.body.title) {
    return next();
  }
  res.status(400).send("Please provide a title for todo");
}

module.exports = router;
