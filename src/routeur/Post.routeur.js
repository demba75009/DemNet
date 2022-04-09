const {
  GetPosts,
  NewPostsForm,
  PostNew,
} = require("../controller/Post.controller");

const express = require("express");

const routeur = express.Router();

routeur.get("/", GetPosts);
routeur.get("/New", NewPostsForm);
routeur.post("/New", PostNew);

module.exports = routeur;
