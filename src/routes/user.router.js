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

  // const id = req.session?._id;

  // const user = await UserModel.findById({ id });
  // console.log(user);
  const allAplicants = await ApplicantModel.find(); //{ addedBy: id }

  res.render('userPage', { allAplicants });
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    startDate,
    telegram,
  } = req.body;

  const image = req.file;
  console.log('====>', req.body);
  try {
    // const id = req.session?._id;
    const applicant = await ApplicantModel.create({
      name,
      email,
      phone,
      startDate,
      telegram,
      photo: image.filename,
      // addedBy: id,
    });
    // eslint-disable-next-line no-underscore-dangle
    await UserModel.findByIdAndUpdate(id, { $push: { applicants: applicant } });
    return res.status(200).json(applicant);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:id', async(req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.render('userPage', { user });
})
module.exports = router;
