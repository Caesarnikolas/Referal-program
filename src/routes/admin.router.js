const router = require('express').Router();
const UserModel = require('../models/user.model');

router.get('/', async (req, res) => {
  const users = await UserModel.find();
  console.log(users)
  res.render('adminPage', { users });
});

module.exports = router;
