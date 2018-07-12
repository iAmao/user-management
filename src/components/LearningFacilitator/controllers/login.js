import check from 'body-checker'
import validator from 'validator'
import composeWaterfall from 'lib/waterfall'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '_db'

function checkBody (req, res, callback) {
  return check(req.body, {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  }, (err, body) => {
    if (err) return callback({ message: `User ${err}`, code: 400 }) // eslint-disable-line
    body.auth = req.auth
    return callback(null, body, res)
  })
}

function validateEmailPassword (data, res, callback) {
  if (!validator.isEmail(data.email) || data.password < 8) {
    return callback({ message: 'invalid email password combo', code: 403 })
  }
  return callback(null, data, res)
}

function findUser (data, res, callback) {
  return db('learningFacilitators')
    .where({ email: data.email })
    .select('*')
    .then(res => {
      if (res.length > 0) {
        data.user = res[0]
        return bcrypt.compare(data.password, data.user.password).then(function(res) {
          if (!res) {
            return callback({ message: 'invalid email password combo', code: 403 })
          }
          return callback(null, data, res)
        });
      }
      return callback({ message:  'invalid email password combo', code: 403 })
    })
}

function generateToken (data, res, callback) {
  console.log(data)
  const token = jwt
    .sign({ email: data.user.email }, process.env.SECRET, { expiresIn: '2h' })
  data.token = token
  return callback(null, data, res)
}

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 200, token: data.token })
}

export default function (...args) {
  return composeWaterfall(args, [
    checkBody,
    validateEmailPassword,
    findUser,
    generateToken,
    fmtResult
  ])
}
