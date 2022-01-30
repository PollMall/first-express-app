const express = require("express");
const routers = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use("/todos", routers.todos);
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});
