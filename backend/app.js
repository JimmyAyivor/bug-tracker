const express = require("express");
const cors = require("cors");
const app = express();

// CONTROLLERS
const ticketsController = require("./controllers/ticketsController.js");
const projectsController = require("./controllers/projectsController.js");
const usersController = require("./controllers/usersController.js");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.use("/users", usersController);
app.use("/projects", projectsController);
app.use("/tickets", ticketsController);

app.get("/", (req, res) => {
  res.send("Welcome to your BugTracker Api - brought to you by Jimmy");
});

app.get("*", (req, res) => {
  res.status(404).send("page not found - this is from line 20 by the way");
});

module.exports = app;
