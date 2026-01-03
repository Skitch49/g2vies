require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connexion DB OK !");
  })
  .catch((e) => {
    console.error("Connexion KO error : " + e);
    process.exit();
  });
