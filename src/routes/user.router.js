const router = require('express').Router();
const multer = require('multer');

const ApplicantModel = require('../models/applicant.model');
const UserModel = require('../models/user.model');

const upload = multer({ dest: 'src/public/uploads' });
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
router.use(multer({ storage: storageConfig }).single('photo'));

router.get('/', async (req, res) => {
  const allAplicants = await ApplicantModel.find();
  console.log(allAplicants, '<------')
  // const user = await UserModel.findById(req.session.user?.id);
  res.render('userPage', { allAplicants });
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    startDate,
    telegram,
    photo
  } = req.body;

  const image = req.file;
  console.log('====>', req.body);
  try {
    const applicant = await ApplicantModel.create({
      name,
      email,
      phone,
      startDate,
      telegram,
      photo: image.filename,
    });
    console.log('PALICANT', applicant);
    // eslint-disable-next-line no-underscore-dangle
    const id = req.session?._id;
    await UserModel.findByIdAndUpdate(id, { $push: { applicants: applicant } });
    return res.redirect('/user')
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
module.exports = router;
