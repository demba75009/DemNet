const Post = require("../database/models/Post.model");
const User = require("../database/models/User.model");

exports.NewPost = (post) => {
  const POST = new Post(post);

  POST.save();
};

exports.PostGet = () => {
  return Post.find({}).exec();
};

exports.PostLike = (PostId, user) => {
  return Post.findByIdAndUpdate(
    { _id: PostId },

    {
      $push: {
        Like: user._id,
      },
    }
  );
};

exports.PostDisLike = (PostId, user) => {
  return Post.findByIdAndUpdate(
    { _id: PostId },

    {
      $pull: {
        Like: user._id,
      },
    }
  );
};

exports.PostGetUserFollowing = async (user) => {
  const U = await User.find({}).exec();
  return Post.find({
    author: { $in: [...user.following, user._id] },
  })
    .populate("author")
    .populate("content.authorComment")
    .populate("Like")
    .exec();
};

exports.PostGetSingle = (id, user) => {
  return Post.find({
    _id: id,
    author: { $in: [...user.following, user._id] },
  })
    .populate("author")
    .populate("content.authorComment")
    .populate("Like")
    .exec();
};

exports.PostDelete = (PostId) => {
  return Post.findByIdAndDelete(PostId).exec();
};

exports.PostUpdate = (PostId, body) => {
  return Post.findByIdAndUpdate(
    PostId,

    { $set: body }
  );
};

exports.AddPostComment = (Post1, body, user) => {
  console.log(Post1);
  return Post.findByIdAndUpdate(
    { _id: Post1 },
    {
      $push: {
        content: body,
      },
    }
  );
};

exports.findPostById = (PostId) => {
  return Post.findById(PostId).exec();
};

exports.getUserPostFormAuthorId = (authorId) => {
  return Post.find({ author: authorId }).populate("author").exec();
};

exports.getUserCommentPostFormAuthorId = (authorId) => {
  return User.find({ _id: authorId }).exec();
};
