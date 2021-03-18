const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  password: {
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
  role: String,
  applicants: [{
    type: Schema.Types.ObjectId,
    ref: 'Applicants',
  }],
  photo: {
    type: String,
  },
});

const UserModel = model('Users', userSchema);
module.exports = UserModel;
