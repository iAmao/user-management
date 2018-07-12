/*
  global describe: true
  global it: true
  global expect: true
  global request: true
  global beforeEach: true
  global setUp: true
*/

describe('Student [POST] /api/v1/students', () => {
  let authorization = null
  let student = {
    "firstname": "Richard",
    "lastname": "Drake",
    "stack": "JS",
    "is_active": true,
    "cohort": 21,
    "rating": 3
  }
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

  it('should create a new student', done => {
    request
      .post('/api/v1/students')
      .set('authorization', authorization)
      .send(student)
      .expect(201)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(201)
        expect(res.body.data.student.firstname).to.equal('Richard')
        done()
      })
  })

  it('should not create students if unauthenticated', done => {
    request
      .post('/api/v1/students')
      .send(student)
      .expect(403)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(403)
        expect(res.body.error.message).to.equal('Unauthorized! You cannot access this resource')
        done()
      })
  })
})
