import composeWaterfall from 'lib/waterfall'
import db from '_db'

function findStudent (req, res, callback) {
  return db('users')
    .where({ id: req.params.id })
    .select('*')
    .then(students => {
      return students.length === 0
        ? callback({ message: 'student not found', code: 404 })
        : callback(null, { student: students[0] } , res)
    })
    .catch(error => errorHandler(error, res))
}


function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 200, student: data.student })
}

export default function (...args) {
  return composeWaterfall(args, [
    findStudent,
    fmtResult
  ])
}
