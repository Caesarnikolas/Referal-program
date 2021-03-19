const router = require('express').Router();
const UserModel = require('../models/user.model');

router.get('/', async (req, res) => {
  const users = await UserModel.find();
  console.log('====> USERS', users);
  res.render('adminPage', { users });
});

router.get('/edit/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  console.log('====> USER', user);
  res.render('edit', { user });
});

module.exports = router;
