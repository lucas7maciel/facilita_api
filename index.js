require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const load = require("express-load");
const cors = require("cors");

const port = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      `Seja bem vindo ao meu projeto Full Stack para a Facilita Jurídico!\n` +
      `Repositórios:\n` +
      `https://github.com/lucas7maciel/facilita_frontend (Frontend)\n` +
      `https://github.com/lucas7maciel/facilita_api (Backend)`,
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

load("controllers").then("routes").into(app);

module.exports = app;
