function allow (role) {
  switch (role) {
    case 'auth':
      return require('./auth')
    default:
      return all
  }
}

function all (req, res, next) {
  return next()
}

module.exports = allow
