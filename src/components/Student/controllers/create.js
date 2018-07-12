import check from 'body-checker'
import composeWaterfall from 'lib/waterfall'
import db from '_db'

function checkBody (req, res, callback) {
  const data = {}
  return check(req.body, {
    cohort: {
      type: 'integer',
      required: true
    },
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    rating: {
      type: 'number',
      required: true
    },
    stack: {
      type: 'string',
      required: true
    },
    is_active: {
      type: 'boolean',
      default: true
    }
  }, (err, body) => {
    if (err) return callback({ message: `Student ${err}`, code: 400 }) // eslint-disable-line
    data.student = body
    data.auth = req.auth
    return callback(null, data, res)
  })
}

function addCreator (data, res, callback) {
  data.student.created_by = data.auth.id
  return callback(null, data, res) 
}

function saveStudent (data, res, callback) {
  db('users')
    .insert(data.student)
    .returning('*')
    .then(res => {
      data.student = res
      return callback(null, data, res)
    })
    .catch(error => errorHandler(error, res))
} 

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 200, student: data.student[0] })
}

export default function (...args) {
  return composeWaterfall(args, [
    checkBody,
    addCreator,
    saveStudent,
    fmtResult
  ])
}
