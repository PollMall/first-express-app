const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const router = require("./routes");

const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});
