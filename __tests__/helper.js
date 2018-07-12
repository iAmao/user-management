import supertest from 'supertest'
import chai from 'chai'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'

import app from '../src/server'

const knex = require('knex')(require('../knexfile').test)

global.app = app
global.request = supertest(app)
global.expect = chai.expect
global.assert = chai.assert
global.jwt = jwt
global.tokenize = (id, email) => jwt.sign({ id, email }, process.env.TOKEN_SECRET)
global.sinon = sinon
global.admin = {}

global.authorization = null

global.LF = { firstName: 'Redd', lastName: 'Green', email: 'redd.green@gmail.com', password: 'password' }
global.setUp = () => {
  return knex('learningFacilitators')
    .insert(global.LF)
    .then(() => {
      return knex('learningFacilitators')
        .select('*')
        .then(lfs => {
          global.authorization = global.tokenize(lfs[0].id, lfs[0].email)
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
  
}

global.tearDown = () => {
  return Promise.all([
    knex('learningFacilitators').del(),
    knex('users').del()
  ])
}
