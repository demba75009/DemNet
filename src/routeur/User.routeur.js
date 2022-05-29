const {
  UserNew,
  UserForm,
  UserUpdateImage,
  UserProfile,
  UserSearchResult,
  Follow,
  UnFollow,
} = require("../controller/User.controller");

const express = require("express");

const routeur = express.Router();
routeur.get("/New", UserForm);

routeur.get("/", UserSearchResult);

routeur.post("/New", UserNew);
routeur.post("/update/image", UserUpdateImage);
routeur.get("/:pseudo", UserProfile);

routeur.get("/following/:user", Follow);
routeur.get("/unfollowing/:user", UnFollow);

module.exports = routeur;
