const router = require('express').Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const ApplicantModel = require('../models/applicant.model');
const UserModel = require('../models/user.model');

router.get('/', async (req, res) => {
  const allAplicants = await ApplicantModel.find();
  console.log(allAplicants);
  res.render('userPage', { allAplicants });
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    date,
  } = req.body;
  try {
    const applicant = await ApplicantModel.create({
      name,
      email,
      phone,
      date,
    });
    // eslint-disable-next-line no-underscore-dangle
    const id = req.session?._id;
    await UserModel.findByIdAndUpdate(id, { $push: { applicants: applicant } });
    res.status(200).json(applicant);
  } catch (error) {
    res.sendStatus(500);
  };

});
module.exports = router;
