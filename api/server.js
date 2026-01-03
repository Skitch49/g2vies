require("dotenv").config();
const express = require("express");
require("./database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/index");
app.use(routes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json(
      "Bienvenue sur l'API de G2Vies ! Veuillez vous rendre sur /api pour plus d'information sinon aller sur /api-docs pour utilisé swagger."
    );
});

// SWAGGER
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const swaggerDocument = YAML.load(
  path.join(__dirname, "swagger/swagger-products.yml")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json("Mauvaise route revenir à /api !");
});

app.listen(process.env.PORT, () =>
  console.log("Le serveur a démarré au port " + process.env.PORT)
);
