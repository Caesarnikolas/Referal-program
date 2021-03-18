const router = require('express').Router();
const bcrypt = require('bcrypt');
const ApplicantModel = require('../models/applicant.model');
const UserModel = require('../models/user.model');

router.get('/', async (req, res) => {
  res.render('main');
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    date,
    password,
  } = req.body;
  try {
    const salt = 10;
    const hashesPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      name,
      email,
      phone,
      date,
      password: hashesPassword,
    });
    req.session.user = user;

    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
  }

});

module.exports = router;
