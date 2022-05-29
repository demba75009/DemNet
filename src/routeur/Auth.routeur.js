const {
  AuthCo,
  AuthForm,
  Deconnexion,
} = require("../controller/Auth.controller");

const express = require("express");

const routeur = express.Router();

routeur.get("/Signin", AuthForm);

routeur.post("/Signin", AuthCo);
routeur.get("/Logout", Deconnexion);

module.exports = routeur;
