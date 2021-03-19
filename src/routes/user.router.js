/* eslint-disable no-console */
const router = require('express').Router();
const multer = require('multer');

const ApplicantModel = require('../models/applicant.model');
const UserModel = require('../models/user.model');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
// const upload = multer({ storage: storageConfig });

router.use(multer({ storage: storageConfig }).single('photo'));

router.get('/', async (req, res) => {

  const id = req.session?.user?._id;

  const user = await UserModel.findById(id);
  console.log(user, 'TUT user');
  const allAplicants = await ApplicantModel.find({ addedBy: id });
  //{ addedBy: id }
  console.log(allAplicants);

  res.render('userPage', { allAplicants, user });
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

  const image = req.file;
  try {
    const id = req.session?.user._id;
    const applicant = await ApplicantModel.create({
      name,
      email,
      phone,
      startDate,
      telegram,
      photo: image.filename,
      addedBy: id,
    });
    // console.log(applicant);
    // eslint-disable-next-line no-underscore-dangle
    await UserModel.findByIdAndUpdate(id, { $push: { applicants: applicant } });
    return res.status(200).json(applicant);
  } catch (error) {
    // console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  console.log(user, 'TUT user');
  const allAplicants = await ApplicantModel.find({ addedBy: req.params.id });
  res.render('userPage', { allAplicants, user });
});

router.get('/edit/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  // console.log(user, 'EDit Get');
  res.render('edit', { user });
});
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id
  const { firstName,
    lastName,
    phone,
    photo,
  } = req.body;
  const image = req.file;
  // console.log(image);

  const user = await UserModel.findByIdAndUpdate(id, {
    firstName,
    lastName,
    phone,
    photo: image.filename,
  });
  if (user.role === 'user') {
    return res.redirect('/user');
  }
  return res.redirect('/admin');
});
module.exports = router;
