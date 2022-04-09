const { NewPost, PostGet } = require("../queries/Post.queries");

exports.GetPosts = async (req, res, next) => {
  try {
    const post = await PostGet();

    res.render("Acceuil", { post });
  } catch (e) {
    next(e);
  }
};

exports.NewPostsForm = (req, res, next) => {
  res.render("Posts/Post-Form");
};

exports.PostNew = async (req, res, next) => {
  try {
    const post = req.body;

    const POST = await NewPost(post);
    res.redirect("/");
  } catch (E) {
    next(E);
  }
};
