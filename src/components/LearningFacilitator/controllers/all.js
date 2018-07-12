import check from 'body-checker'
import composeWaterfall from 'lib/waterfall'
// import { db } from '_models'
// import { errorHandler } from 'lib/error'

function checkQuery (req, res, callback) {
  
}

function fmtResult (data, res, callback) {
  return callback(null, { statusCode: 200, message: 'OK' })
}

export default function (...args) {
  return composeWaterfall(args, [
    fmtResult
  ])
}
