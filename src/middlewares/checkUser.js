const UserModel = require('../models/user.model');

const checkUser = async (req, res, next) => {
  const userId = req.session?.user?.id;

  if (userId) {
    const currentUser = await UserModel.findById(userId);
    req.userRole = currentUser.role;
    return next()
  }

  return res.redirect('/user/registr')
};

module.exports = {
  checkUser,
};
