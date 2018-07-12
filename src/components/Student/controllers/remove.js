import composeWaterfall from 'lib/waterfall'
import db from '_db'

function findStudent (req, res, callback) {
  return db('users')
    .where({ id: req.params.id })
    .select('*')
    .then(students => {
      return students.length === 0
        ? callback({ message: 'student not found', code: 404 })
        : callback(null, { id: req.params.id } , res)
    })
}

function deleteStudent (data, res, callback) {
  db('users')
    .where({ id: data.id })
    .del()
    .then(res =>  callback(null, data, res))
    .catch(error => errorHandler(error, res))
} 

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 204 })
}

export default function (...args) {
  return composeWaterfall(args, [
    findStudent,
    deleteStudent,
    fmtResult
  ])
}
