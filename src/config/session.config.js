const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = require("../app.js");

app.use(
  session({
    secret: "je suis un secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      name: "demba",
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://donkey:dembaleboss@cluster0.m3r9p.mongodb.net/DemNet?retryWrites=true&w=majority",
      ttl: 60 * 60 * 24,
    }),
  })
);
