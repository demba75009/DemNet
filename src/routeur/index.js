const express = require("express");

const routeur = express.Router();

const Post = require("./Post.routeur");

routeur.use("/Posts", Post);

routeur.get("/", (req, res, next) => {
  res.redirect("/Posts");
});

module.exports = routeur;
