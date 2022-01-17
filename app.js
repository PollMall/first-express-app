const express = require("express");
const path = require("path");
const cars = require("./cars");

// Create Express App
const app = express();

// Middlewares
app.use("/cars", cars);

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Testing different methods on response object
app.get("/download", (req, res) => {
  res.download(path.join(__dirname, "textDownload.txt"), (err) => {
    if (err) {
      console.error(`err: ${err.message}`);
    }
  });
});

app.get("/end", (req, res) => {
  res.end();
});

app.get("/json", (req, res) => {
  res.json({
    id: "1",
    firstName: "Paul",
    lastName: "Popa",
  });
});

app.get("/jsonp", (req, res) => {
  res.jsonp({
    id: "1",
    firstName: "Paul",
    lastName: "Popa",
  });
});

app.get("/redirect", (req, res) => {
  res.redirect("/");
});

app.get("/send", (req, res) => {
  res.send([1, 2, 3, 4, 5, 6, 7, 8]);
});

app.get("/send-file", (req, res) => {
  res.sendFile(path.join(__dirname, "text.txt"));
});

app.get("/send-status", (req, res) => {
  res.sendStatus(500);
});

// Testing app.route() and chaning route handlers for the same route path but different HTTP requests
app
  .route("/bills")
  .get((req, res) => {
    res.send("Get your bills");
  })
  .post((req, res) => {
    res.send("Add a new bill");
  })
  .put((req, res) => {
    res.send("Update a current bill");
  })
  .delete((req, res) => {
    res.send("Delete a bill");
  });

// Start listening on port
const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port} 🚀`);
});
