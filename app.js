const express = require("express");
const path = require("path");

const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});
