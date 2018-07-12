/*
  global describe: true
  global it: true
  global expect: true
  global request: true
  global beforeEach: true
  global setUp: true
*/

describe('LearningFacilitator [POST] /api/v1/lfs/login', () => {
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
            done()
          })
      })
  })

  afterEach(done => {
    tearDown()
      .then(() => done())
  })

  it('should login a new learning facilitator', done => {
    let newLf = { email: 'killua@gmail.com', password: LF.password }
    request
      .post('/api/v1/lfs/login')
      .send(newLf)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(200)
        expect(typeof res.body.data.token).to.equal('string')
        done(err)
      })
  })

  it('should not login a learning facilitator with invalid password', done => {
    let newLf = { email: LF.email, password: 'LF.password' }
    request
      .post('/api/v1/lfs/login')
      .send(newLf)
      .expect(403)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(403)
        expect(res.body.error.message).to.equal('invalid email password combo')
        done(err)
      })
  })

  it('should not signup a learning facilitator with invalid email', done => {
    let newLf = { email: 'h@g.com', password: LF.password }
    request
      .post('/api/v1/lfs/login')
      .send(newLf)
      .expect(403)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(403)
        expect(res.body.error.message).to.equal('invalid email password combo')
        done(err)
      })
  })
})
