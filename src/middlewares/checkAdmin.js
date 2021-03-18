const checkAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    return next()
  }

  return res.redirect('/')
}

module.exports = {
  checkAdmin,
}
