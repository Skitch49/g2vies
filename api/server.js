require("dotenv").config();
const express = require("express");
const cookie = require("cookie-parser");
require("./database");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const routes = require("./routes/index");
app.use(routes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json(
      "Bienvenue sur l'API de G2Vies ! Veuillez vous rendre sur /api pour plus d'information sinon aller sur /api-docs pour utilisé swagger."
    );
});

// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const authSwagger = YAML.load(path.join(__dirname, "swagger/swagger-auth.yml"));

const usersSwagger = YAML.load(
  path.join(__dirname, "swagger/swagger-users.yml")
);

const productsSwagger = YAML.load(
  path.join(__dirname, "swagger/swagger-products.yml")
);

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "MERN Shop API",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3001/api" }],
  paths: {
    ...authSwagger.paths,
    ...usersSwagger.paths,
    ...productsSwagger.paths,
  },
  components: {
    schemas: {
      ...authSwagger.components?.schemas,
      ...usersSwagger.components?.schemas,
      ...productsSwagger.components?.schemas,
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// end Swagger

app.use((req, res) => {
  res.status(404).json("Mauvaise route revenir à /api !");
});

app.listen(process.env.PORT, () =>
  console.log("Le serveur a démarré au port " + process.env.PORT)
);
