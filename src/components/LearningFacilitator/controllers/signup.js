import check from 'body-checker'
import validator from 'validator'
import composeWaterfall from 'lib/waterfall'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '_db'
// import { errorHandler } from 'lib/error'

function checkBody (req, res, callback) {
  return check(req.body, {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    }
  }, (err, body) => {
    if (err) return callback({ message: `User ${err}`, code: 400 }) // eslint-disable-line
    body.auth = req.auth
    return callback(null, body, res)
  })
}

function validateUniqueness (data, res, callback) {
  return db('learningFacilitators')
    .where({ email: data.email })
    .select('*')
    .then(users => {
      return users.length > 0
        ? callback({ message: 'User with email already exists', code: 409 })
        : callback(null, data, res)
    })
}

function validateEmail (data, res, callback) {
  if (!validator.isEmail(data.email)) {
    return callback({ message: 'Email is invalid', code: 400 })
  }
  return callback(null, data, res)
}

function validatePassword (data, res, callback) {
  if (data.password.length < 8) {
    return callback({ message: 'Password must be at least 8 characters', code: 400 })
  }
  return callback(null, data, res)
}

function hashPassword (data, res, callback) {
 return bcrypt.hash(data.password, 10).then(hash => {
    data.hash = hash
    return callback(null, data, res)
 })
}

function createUser (data, res, callback) {
  const user = {
    email: data.email,
    password: data.hash,
    firstName: data.firstName,
    lastName: data.lastName
  }
  data.user = user
  return callback(null, data, res)
}

function saveUser (data, res, callback) {
  return db('learningFacilitators')
    .insert(data.user)
    .returning('*')
    .then(res => {
      data.user = res[0]
      return callback(null, data, res)
    })
}

function generateToken (data, res, callback) {
  const token = jwt
    .sign({ email: data.user.email, id: data.user.id }, process.env.SECRET, { expiresIn: '2h' })
  data.token = token
  return callback(null, data, res)
}

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 201, token: data.token })
}

export default function (...args) {
  return composeWaterfall(args, [
    checkBody,
    validateUniqueness,
    validateEmail,
    validatePassword,
    hashPassword,
    createUser,
    saveUser,
    generateToken,
    fmtResult
  ])
}
