import db from '_db'

const async = require('async')
const jwt = require('jsonwebtoken')
const util = require('./util')

const auth = (req, res, next) => {
  async.waterfall([
    async.apply(check, req, res),
    decodeToken,
    getUser
  ], error => error
    ? res.status(403).json(util.response)
    : next()
  )
}

const check = (req, res, callback) => {
  if (!util.isAuth(req)) return callback(new Error({ message: 'unauthorized' }))
  return callback(null, req, res)
}

const decodeToken = (req, res, callback) => {
  const user = jwt.decode(
    req.headers.authorization,
    process.env.TOKEN_SECRET
  )
  return callback(null, req, res, user)
}

const getUser = (req, res, user, callback) => {
  return db('learningFacilitators')
    .where({ id: user.id })
    .select('*')
    .then(user => {
      req.auth = user[0]
      return callback(null)
    })
    .catch(error => { console.log(error); return res.status(403).json(util.response) })
}

module.exports = auth
