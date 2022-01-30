const express = require("express");
const { todoRepository } = require("../repositories");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .get(async (req, res) => {
    const todos = await todoRepository.getAll();
    res.json({ data: todos });
  })
  .post(checkBody, async (req, res) => {
    const saveTodo = await todoRepository.save(req.body);
    res.json({ data: saveTodo });
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const todo = await todoRepository.getOne(req.params.id);
    res.json({ data: todo });
  })
  .delete(async (req, res) => {
    const removeTodo = await todoRepository.remove(req.params.id);
    res.json({ data: removeTodo });
  });

function logger(req, res, next) {
  console.log(`todos ${req.method}`);
  next();
}

function checkBody(req, res, next) {
  if (req.body && req.body.title && req.body.description) return next();
  res.status(400).send("Please provide all required fields");
}

module.exports = router;
