const mongoose = require("mongoose");

const schema = mongoose.Schema;

const post = schema({
  subject: String,
  comment: String,
});

const Post = mongoose.model("Posts", post);

module.exports = Post;
