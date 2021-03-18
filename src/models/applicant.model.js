const { model, Schema } = require('mongoose');

const applicantSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  telegram: {
    type: String,
  },
  status: {
    type: String,
    default: 'заявка подана',
  },
  photo: String,

  startDate: {
    type: String,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
});

const ApplicantModel = model('Applicants', applicantSchema);
module.exports = ApplicantModel;
