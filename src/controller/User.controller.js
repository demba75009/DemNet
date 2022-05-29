const {
  NewUser,
  FindUserByPseudo,
  FindUserById,
  AddUserForCurrentFollow,
  RemoveUserForCurrentFollow,
  UserSingle,
} = require("../queries/User.queries");

const { getUserPostFormAuthorId } = require("../queries/Post.queries");

const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/avatars"));
    },

    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

exports.UnFollow = async (req, res, next) => {
  const userId = req.params.user;

  const [, user] = await Promise.all([
    RemoveUserForCurrentFollow(req.user, userId),
    FindUserById(userId),
  ]);

  res.redirect(`/User/${user.pseudo}`);
};

exports.Follow = async (req, res, next) => {
  try {
    const userId = req.params.user;

    const [, user] = await Promise.all([
      AddUserForCurrentFollow(req.user, userId),
      FindUserById(userId),
    ]);

    res.redirect(`/User/${user.pseudo}`);
  } catch (E) {
    next(E);
  }
};

exports.UserNew = async (req, res, next) => {
  try {
    const user = req.body;

    const User = await NewUser(user);
    res.redirect("/");
  } catch (E) {
    next(E);
  }
};

exports.UserSearchResult = async (req, res, next) => {
  try {
    const pseudo = req.query.pseudo;
    console.log(pseudo);

    const users = await UserSingle(pseudo);

    res.render("includes/UserMenu", { users });
  } catch (e) {
    next(e);
  }
};

exports.UserProfile = async (req, res, next) => {
  try {
    const id = req.params.pseudo;
    const user = await FindUserByPseudo(id);

    const post = await getUserPostFormAuthorId(user._id);
    res.render("Acceuil", { currentUser: req.user, user, post });
  } catch (e) {
    next(e);
  }
};

exports.UserForm = (req, res, next) => {
  res.render("User/User-Form");
};

exports.UserUpdateImage = [
  upload.single("avatar"),

  async (req, res, next) => {
    try {
      const user = req.user;

      user.avatar = `/images/avatars/${req.file.filename}`;

      await user.save();

      res.redirect("/");
    } catch (E) {
      throw E;
    }
  },
];
