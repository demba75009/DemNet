// const { NewAuth } = require("../queries/Auth.queries");
const passport = require("passport");

exports.AuthCo = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.render("User/Auth-Form", { error: info.message });
    } else {
      req.login(user, (err) => {
        if (err) {
          next(err);
        } else {
          res.redirect("/");
        }
      });
    }
  })(req, res, next);
};

exports.AuthForm = (req, res, next) => {
  res.render("User/Auth-Form");
};

exports.Deconnexion = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
