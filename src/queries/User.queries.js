const User = require("../database/models/User.model");

exports.NewUser = async (user) => {
  try {
    const hashPassword = await User.hashPassword(user.password);

    const NewUser = new User({
      pseudo: user.pseudo,
      local: {
        email: user.email,
        password: hashPassword,
      },
    });

    NewUser.save();
  } catch (e) {
    throw e;
  }
};

exports.AddUserForCurrentFollow = (currentUser, userId) => {
  currentUser.following = [...currentUser.following, userId];
  return currentUser.save();
};

exports.RemoveUserForCurrentFollow = (currentUser, userId) => {
  currentUser.following = currentUser.following.filter(
    (objId) => objId.toString() !== userId
  );
  return currentUser.save();
};

exports.FindUserById = async (id) => {
  return User.findById(id).exec();
};

exports.FindUserByPseudo = async (pseudo) => {
  return User.findOne({ pseudo }).exec();
};

exports.UserSingle = (pseudo) => {
  const regex = `${pseudo}`;

  const reg = new RegExp(regex);

  return User.find({ pseudo: { $regex: reg } });
};
