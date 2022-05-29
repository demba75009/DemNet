const passport = require("passport");
const User = require("../database/models/User.model");
const app = require("../app");
const LocalStrategy = require("passport-local").Strategy;
const { FindUserByPseudo } = require("../queries/User.queries");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "pseudo" },
    async (pseudo, password, done) => {
      try {
        const user = await FindUserByPseudo(pseudo);
        if (user) {
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "Password wrong" });
          }
        } else {
          done(null, false, { message: "User Not Found" });
        }
      } catch (e) {
        done(e, null);
      }
    }
  )
);
