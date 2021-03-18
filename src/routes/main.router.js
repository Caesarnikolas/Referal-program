const router = require("express").Router();
const bcrypt = require("bcrypt");
const ApplicantModel = require("../models/applicant.model");
const UserModel = require("../models/user.model");
const passport = require("passport");

router.get("/", async (req, res) => {
  res.render("index");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = 10;
    const hashesPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      email,
      password: hashesPassword,
    });
    req.session.user = user;

    res.sredirect("/user");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/register",
    failureFlash: true,
  })
);

router.get("/login", async (req, res) => {
  res.render("login");
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (email && password) {
//     const currentUser = await UserModel.findOne({ email });
//     if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
//       req.session.user = currentUser;

//       return res.redirect("/");
//     }
//     return res.status(418).redirect("/login");
//   }
//   return res.status(418).redirect("/login");
// });

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/");

    res.clearCookie(req.app.get("cookieName"));
    return res.redirect("/");
  });
});
module.exports = router;
