class Todo {
  constructor(id, title, description, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  set id(newId) {
    this.id = newId;
  }
}

module.exports = Todo;
