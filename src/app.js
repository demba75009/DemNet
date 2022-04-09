const express = require("express");
const path = require("path");

const app = express();
const bodyParser = require("body-parser");

const routeur = require("./routeur");

require("./database");

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(routeur);

app.listen(8080);
