import check from 'body-checker'
import validator from 'validator'
import composeWaterfall from 'lib/waterfall'
import db from '_db'

function checkBody (req, res, callback) {
  const data = {}
  return check(req.body, {
    cohort: {
      type: 'integer',
    },
    firstname: {
      type: 'string',
    },
    lastname: {
      type: 'string',
    },
    rating: {
      type: 'number',
    },
    stack: {
      type: 'string',
    },
    is_active: {
      type: 'boolean',
    }
  }, (err, body) => {
    if (err) return callback({ message: `Student ${err}`, code: 400 }) // eslint-disable-line
    data.student = body
    data.student.id = req.params.id
    data.auth = req.auth
    return callback(null, data, res)
  })
}

function findStudent (data, res, callback) {
  return db('users')
    .where({ id: data.student.id })
    .select('*')
    .then(students => {
      return students.length === 0
        ? callback({ message: 'student not found', code: 404 })
        : callback(null, data, res)
    })
}

function saveStudent (data, res, callback) {
  db('users')
    .where({ id: data.student.id })
    .update(data.student)
    .then(res =>  callback(null, data, res))
} 

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 204 })
}

export default function (...args) {
  return composeWaterfall(args, [
    checkBody,
    findStudent,
    saveStudent,
    fmtResult
  ])
}
