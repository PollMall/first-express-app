const db = require("../db");

function getAll() {
  return new Promise((res, rej) => {
    db.find({}, (err, doc) => {
      if (err) rej(err);
      res(doc);
    });
  });
}

function getOne(id) {
  return new Promise((res, rej) => {
    db.findOne({ _id: id }, (err, doc) => {
      if (err) rej(err);
      res(doc);
    });
  });
}

function save(todo) {
  return new Promise((res, rej) => {
    db.insert({ title: todo.title, description: todo.description, completed: false }, (err, doc) => {
      if (err) rej(err);
      res(doc);
    });
  });
}

function update(newTodo) {
  return new Promise((res, rej) => {
    const old = get(newTodo.id);

    if (!old) rej(` with ${newTodo.id} not found`);

    db.update({ _id: id }, { $set: { ...newTodo } }, (err, doc) => {
      if (err) rej(err);
      res(doc);
    });
  });
}

function remove(id) {
  return new Promise((res, rej) => {
    const removedTodo = getOne(id);
    if (!removedTodo) rej("Todo could not be deleted. Not found");

    db.remove({ _id: id }, {}, (err, nrDoc) => {
      if (err) rej(err);
      if (!nrDoc) rej("Todo could not be deleted. Not found");
      res(removedTodo);
    });
  });
}

module.exports = {
  getAll,
  getOne,
  save,
  update,
  remove,
};
