const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const app = express();

// USE SWAGGER
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.2",
    info: {
      title: "Bug Tracker API",
      version: "1.0.0",
      description: "Bug Tracking API Information",
      contact: {
        name: "J.Ayivor",
        url: "https://glittering-queijadas-fea732.netlify.app",
        email: "jimmyayivor@pursuit.org",
      },
      servers: [
        {
          url: "http://localhost:3003",
          description: "My API Documentation",
        },
      ],
    },
  },
  apis: ["./controllers/*.js"],
};

// CONTROLLERS
const ticketsController = require("./controllers/ticketsController.js");
const projectsController = require("./controllers/projectsController.js");
const usersController = require("./controllers/usersController.js");
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", usersController);

app.use("/projects", projectsController);
app.use("/tickets", ticketsController);

app.get("/", (req, res) => {
  res.send(`<h1 style = "margin:auto;text-align:center;">Welcome to the <span style = "color:#1dc4e9;" >BugTracker API</span>!</h1></br><h3 a href style = "margin:auto;text-align:center;">Check out the <span style = "color:#1dc4e9;" ><a href="./api-docs">API Docs</a></span>!</h3>`);
});

app.get("*", (req, res) => {
  res.status(404).send("page not found!");
});

module.exports = app;
