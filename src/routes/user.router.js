const router = require('express').Router();
const multer = require('multer')

const upload = multer({ dest: 'uploads/' });
const ApplicantModel = require('../models/applicant.model');
const UserModel = require('../models/user.model');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
router.use(multer({ storage: storageConfig }).single('photo'));

router.get('/', async (req, res) => {
  const allAplicants = await ApplicantModel.find();
  // console.log(allAplicants);
  res.render('userPage', { allAplicants });
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    startDate,
    telegram,
    photo,
  } = req.body;
  console.log(req.body);
  try {
    const applicant = await ApplicantModel.create({
      name,
      email,
      phone,
      startDate,
      telegram,
      photo,
    });
    // eslint-disable-next-line no-underscore-dangle
    const id = req.session?._id;
    await UserModel.findByIdAndUpdate(id, { $push: { applicants: applicant } });
    res.status(200).json(applicant);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/:id', async(req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.render('userPage', { user });
})
module.exports = router;
