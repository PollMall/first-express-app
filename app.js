const express = require("express");
const router = require("./router");

const app = express();

// Middlewares
app.use(logger);
app.use(router);

app.get("/", (req, res) => {
  res.send("get on /");
});

app.get("/test", (req, res) => {
  res.send("get on /test");
});

app.all("/users/:id", (req, res) => {
  const userId = req.params.id;

  res.send(`app ${req.method} on /users/${userId}`);
});

app.all("*", (req, res) => {
  res.status(404).send("Not found, sorry!");
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});

function logger(req, res, next) {
  console.log("======== START ========");
  console.log("logger");
  console.log(`path: ${req.path}`);
  next();
  console.log("========= END =========");
}
