const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const bcrypt = require("bcrypt");
const User = require("./src/models/user.model");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, { email: user.email, id: user._id });
  });
});

const authUser = async (req, email, pass, done) => {
  try {
    if (/login/.test(req.path)) {
      console.log(req.body, email, pass);
      const user = await User.findOne({ email }).lean().exec();
      if (!user) return done(null, false, { message: "Err email" });
      if (await bcrypt.compare(pass, user.password)) return done(null, user);
      return done(null, false, { message: "Err Pass" });
    }
    if (email && pass && req.body.email) {
      const user = await User.findOne({ email }).lean().exec();
      if (!user) {
        try {
          const hashPass = await bcrypt.hash(pass, 10);
          const newUser = new User({
            email,
            password: hashPass,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(null, false, { message: "Err1" });
        }
      } else {
        return done(null, false, { message: "Mail is already used" });
      }
    }
    return done(null, false, { message: "Err2" });
  } catch (error) {
    done(error);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    authUser
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: "16c66d74399a8733cda7",
      clientSecret: "edf668ee6868a9673b33e4c647cb4edc2e042bf2",
      callbackURL: "http://localhost:3000/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.create(
        {
          githubId: profile.id,
          firstname: profile.displayName,
          photo: profile.photos[0].value,
          email: profile.displayName,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
