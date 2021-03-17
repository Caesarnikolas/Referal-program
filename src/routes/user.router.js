const router = require('express').Router();

router.get('/', async (req, res) => {
  const allStudents = await Student.find();
  res.render('profile', { allStudents });
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    date,
  } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      phone,
      date,
    });
    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(500);
  }

});
module.exports = router;
