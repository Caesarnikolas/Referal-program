const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
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
  role: {
    type: String,
    default: 'user',
  },
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Applicants",
    },
  ],
  photo: {
    type: String,
  },
  githubId: String,
});

const UserModel = model("Users", userSchema);
module.exports = UserModel;
