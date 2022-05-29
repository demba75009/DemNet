const express = require("express");

const routeur = express.Router();

const Post = require("./Post.routeur");
const User = require("./User.routeur");

const Auth = require("./Auth.routeur");

routeur.use("/User", User);
routeur.use("/Auth", Auth);

routeur.use("/Posts", Post);

routeur.get("/", (req, res, next) => {
  res.redirect("/Posts");
});

module.exports = routeur;
