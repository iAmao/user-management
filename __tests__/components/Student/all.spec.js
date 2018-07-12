/*
  global describe: true
  global it: true
  global expect: true
  global request: true
  global beforeEach: true
  global setUp: true
*/

describe('LearningFacilitator [POST] /api/v1/lfs/login', () => {
  let authorization = null
  beforeEach(done => {
    setUp()
      .then(() => {
        request
          .post('/api/v1/lfs')
          .send(Object.assign({}, LF, { email: 'killua@gmail.com' }))
          .expect(201)
          .end((err, res) => {
            expect(res.body.status.code).to.equal(201)
            expect(typeof res.body.data.token).to.equal('string')
            authorization = res.body.data.token
            done()
          })
      })
  })

  afterEach(done => {
    tearDown()
      .then(() => done())
  })

  it('should retrieve all students', done => {
    request
      .get('/api/v1/students')
      .set('authorization', authorization)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(200)
        expect(Array.isArray(res.body.data.students)).to.equal(true)
        done()
      })
  })

  it('should not retrieve students if unauthenticated', done => {
    request
      .get('/api/v1/students')
      .expect(403)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(403)
        expect(res.body.error.message).to.equal('Unauthorized! You cannot access this resource')
        done()
      })
  })
})
