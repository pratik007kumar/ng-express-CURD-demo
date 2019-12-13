const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  {
    id: 1,
    name: "course 1"
  },
  {
    id: 2,
    name: "course 2"
  },
  {
    id: 3,
    name: "course 3"
  },
  {
    id: 4,
    name: "course 4"
  }
];
app.get("/", (req, res) => {
  res.send("hello world");
});

// /posts/2019/12 ? id = 123
app.get("/posts/:year/:month", (req, res) => {
  // /posts/2019/12
  // res.send(req.params);

  // ?id = 123
  res.send(req.query);
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

// /posts/2019/12 ? id = 123
app.get("/course/:id", (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Coures Not Found !");
  res.send(course);
  // /posts/2019/12
  // res.send(req.params);

  // ?id = 123
  res.send(req.query);
});

app.post("/courses", (req, res) => {
  // res.send(req.body.name);
  let schema = {
    name: Joi.string()
      .required()
      .min(3)
  };

  let result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listing on ${port}...`));
