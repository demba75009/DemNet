const {
  GetPosts,
  NewPostsForm,
  PostNew,
  DeletePost,
  EditPost,
  UpdatePost,
  PostSingleDetail,
  PostComment,
  LikePost,
  DisLikePost,
} = require("../controller/Post.controller");

const { Autenticated } = require("../config/Guard.config");

const express = require("express");

const routeur = express.Router();

routeur.get("/New", Autenticated, NewPostsForm);
routeur.post("/New", Autenticated, PostNew);

routeur.get("/", Autenticated, GetPosts);
routeur.get("/:PostId", Autenticated, PostSingleDetail);

routeur.post("/:PostId/comment", Autenticated, PostComment);

routeur.delete("/:PostId", Autenticated, DeletePost);
routeur.get("/edit/:PostId", Autenticated, EditPost);
routeur.post("/update/:PostId", Autenticated, UpdatePost);

routeur.get("/Like/:PostId", Autenticated, LikePost);
routeur.get("/DisLike/:PostId", Autenticated, DisLikePost);

module.exports = routeur;
