import composeWaterfall from 'lib/waterfall'
import db from '_db'

function checkQuery (req, res, callback) {
  const data = {}
  return callback(null, data, res)
}

function findAllStudents (data, res, callback) {
  return db('users')
    .select(['firstname', 'lastname', 'id', 'cohort', 'stack'])
    .then(users => {
      data.users = users
      return callback(null, data, res)
    })
}

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 200, users: data.users })
}

export default function (...args) {
  return composeWaterfall(args, [
    checkQuery,
    findAllStudents,
    fmtResult
  ])
}
