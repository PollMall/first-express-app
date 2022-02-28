const express = require("express");

const router = express.Router();

const mockData = [
  {
    id: 11,
    title: "Random Title",
    description: "Some cool description",
  },
  {
    id: 22,
    title: "Titleee",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae eius reiciendis, minus repellat vel quasi sit voluptatem repellendus, modi, aspernatur laborum reprehenderit laudantium dignissimos voluptate accusantium magni consequuntur? Cupiditate, maiores?",
  },
  {
    id: 33,
    title: "Test",
    description: "Long description",
  },
  {
    id: 44,
    title: "Lorem ipsum",
    description: "",
  },
];

router.get("/", (req, res) => {
  res.render("home", { todos: mockData });
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.get("/edit/:id", (req, res) => {
  res.render("edit", {
    id: req.params.id,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, illum odio. Repudiandae possimus rem, nemo impedit delectus velit facere tempore libero sunt accusamus quae ut! Possimus sint mollitia voluptatum illum?",
  });
});

router.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = router;
