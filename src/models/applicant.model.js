const { model, Schema } = require('mongoose');

const applicantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  telegram: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  startDate: {
    type: String,
  },
});

const ApplicantModel = model('Applicants', applicantSchema);
module.exports = ApplicantModel;
