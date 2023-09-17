const express = require("express");
const db = require("./db");
const dotenv = require("dotenv");
const studRout = require("./router/studRouter");
require("express-async-errors");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/student", studRout); // Define routes before the error handler

app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(err.status || 500).send("Something went wrong");
});

 db.query("SELECT 1;")
  .then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT, () =>
      console.log("Running on port: " + process.env.PORT)
    );
  })
  .catch((err) =>
    console.error("Connection to the database failed: " + err.message)
  );
app.use((req, res) => {
  console.log(req.path);
});
