const router = require('express').Router();
const bcrypt = require('bcrypt');
const ApplicantModel = require('../models/applicant.model');
const UserModel = require('../models/user.model');

router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  try {
    const salt = 10;
    const hashesPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      email,
      password: hashesPassword,
    });
    req.session.user = user;

    res.sredirect('/user');
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/login', async (req, res) => {
  res.render('index');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const currentUser = await UserModel.findOne({ email });
    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      req.session.user = currentUser;

      return res.redirect('/');
    }
    return res.status(418).redirect('/login');
  }
  return res.status(418).redirect('/login');
});

router.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/');

    res.clearCookie(req.app.get('cookieName'));
    return res.redirect('/');
  });
});
module.exports = router;
