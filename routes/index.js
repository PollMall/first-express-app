const express = require("express");
const bodyParser = require("body-parser");
const { getTodoById, getAllTodos, saveTodo, updateTodo, removeTodo } = require("../db");
const { restart } = require("nodemon");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  res.render("home", { todos: await getAllTodos() });
});

router
  .route("/add")
  .get((req, res) => {
    res.render("add");
  })
  .post(async (req, res) => {
    console.log(req.body);

    if (req.body && req.body.title) {
      const newTodo = {
        title: req.body.title,
        description: req.body.description,
      };
      try {
        await saveTodo(newTodo);
        res.send({ data: newTodo });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Could not save the todo." });
      }
    } else {
      res.status(400).send({ error: "Please provide at least a title for todo" });
    }
  });

router
  .route("/edit/:id")
  .get(async (req, res) => {
    const foundTodo = await getTodoById(req.params.id);

    if (foundTodo) {
      res.render("edit", foundTodo);
    } else {
      res.status(404).send({ error: "Not Found" });
    }
  })
  .delete(async (req, res) => {
    const removedTodo = await removeTodo(req.params.id);

    if (removedTodo) {
      res.send({ data: removeTodo });
    } else {
      res.status(404).send({ error: "Todo not found!", data: {} });
    }
  })
  .put(async (req, res) => {
    console.log(req.body);

    if (req.body && req.body.title) {
      const newTodo = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
      };
      try {
        await updateTodo(newTodo);
        res.send({ data: newTodo });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Could not update the todo." });
      }
    } else {
      res.status(400).send({ error: "Please provide at least a title for todo" });
    }
  });

router.get("/test", async (req, res) => {
  res.send(await db.getAll());
});

router.get("*", (req, res) => {
  res.status(404).render("404");
});

function validate(req, res) {
  if (req.body && req.body.title) {
    return next();
  }
  res.status(400).send("Please provide a title for todo");
}

module.exports = router;
