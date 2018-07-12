/*
  global describe: true
  global it: true
  global expect: true
  global request: true
  global beforeEach: true
  global setUp: true
*/

describe('Student [POST] /api/v1/student/:id', () => {
  let authorization = null
  let student = null
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
            return request
              .post('/api/v1/students')
              .set('authorization', authorization)
              .send(defaultStudent)
              .expect(201)
              .end((err, res) => {
                expect(res.body.status.code).to.equal(201)
                expect(res.body.data.student.firstname).to.equal('Richard')
                student = res.body.data.student
                done()
              })
          })
      })
  })

  afterEach(done => {
    tearDown()
      .then(() => done())
  })

  it('should delete a student', done => {
    request
      .delete(`/api/v1/student/${student.id}`)
      .set('authorization', authorization)
      .expect(204)
      .end((err, res) => {
        done()
      })
  })

  it('should not create students if unauthenticated', done => {
    request
      .delete(`/api/v1/student/${student.id}`)
      .expect(403)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(403)
        expect(res.body.error.message).to.equal('Unauthorized! You cannot access this resource')
        done()
      })
  })
})
