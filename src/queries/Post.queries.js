const Post = require("../database/models/Post.model");

exports.NewPost = (post) => {
  const POST = new Post(post);

  POST.save();
};

exports.PostGet = () => {
  return Post.find({}).exec();
};
