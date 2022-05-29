const {
  NewPost,
  PostGet,
  PostDelete,
  PostGetSingle,
  PostUpdate,
  PostGetUserFollowing,
  getUserCommentPostFormAuthorId,
  AddPostComment,
  findPostById,
  PostLike,
  PostDisLike,
} = require("../queries/Post.queries");

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/posts"));
    },

    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

exports.GetPosts = async (req, res, next) => {
  try {
    const post = await PostGetUserFollowing(req.user);

    res.render("Acceuil", {
      post,
      user: req.user,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

exports.DisLikePost = async (req, res, next) => {
  try {
    const PostId = req.params.PostId;

    const user = req.user;
    const Like = await PostDisLike(PostId, user);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.LikePost = async (req, res, next) => {
  try {
    const PostId = req.params.PostId;

    const user = req.user;
    const Like = await PostLike(PostId, user);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.PostSingleDetail = async (req, res, next) => {
  try {
    const PostId = req.params.PostId;

    // console.log(PostId);
    const post = await PostGetSingle(PostId, req.user);

    res.render("partial/Post-Detail", {
      post,

      user: req.user,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

exports.UpdatePost = [
  upload.single("picture"),
  async (req, res, next) => {
    try {
      const postid = req.params.PostId;
      const body = req.body;
      body.picture = `/images/posts/${req.file.filename}`;

      await PostUpdate(postid, { ...body, picture: body.picture });
      res.redirect("/");
    } catch (e) {
      next(e);
    }
  },
];
exports.EditPost = async (req, res, next) => {
  try {
    const postid = req.params.PostId;
    const user = req.user;

    const Post = await findPostById(postid);
    res.render("Posts/Post-form", { Post, user });
  } catch (e) {
    next(e);
  }
};

exports.NewPostsForm = (req, res, next) => {
  const user = req.user;

  res.render("Posts/Post-Form", { Post: {}, user });
};

exports.DeletePost = async (req, res, next) => {
  try {
    const PostId = req.params.PostId;

    await PostDelete(PostId);
    const post = await PostGet();

    res.render("partial/Post-list", { post });
  } catch (e) {
    console.log(e);
  }
};

exports.PostNew = [
  upload.single("picture"),
  async (req, res, next) => {
    try {
      const post = req.body;

      console.log(post);

      post.picture = `/images/posts/${req.file.filename}`;

      const POST = await NewPost({ ...post, author: req.user._id });
      res.redirect("/");
    } catch (E) {
      next(E);
    }
  },
];

exports.PostComment = async (req, res, next) => {
  try {
    const comment = req.body;

    const PostId = req.params.PostId;

    const post = await PostGetSingle(PostId, req.user);

    post.content = comment.content;

    // console.log(post.content);

    const f = await AddPostComment(
      PostId,
      {
        ...post.content,
        authorComment: req.user,
        idComment: Math.random(100),
      },
      req.user
    );

    console.log(f);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};
