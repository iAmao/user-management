/*
  global describe: true
  global it: true
  global expect: true
  global request: true
  global beforeEach: true
  global setUp: true
  global tearDown: true
*/

describe('LearningFacilitator [POST] /api/v1/lfs', () => {
  beforeEach(done => {
    setUp()
      .then(() => done())
  })

  afterEach(done => {
    tearDown()
      .then(() => done())
  })

  it('should signup a new learning facilitator', done => {
    let newLf = {
      firstName: 'Fred',
      lastName: 'Wayne',
      email: 'fred.wayne@gmail.com',
      password: 'password'
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(201)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(201)
        expect(typeof res.body.data.token).to.equal('string')
        done(err)
      })
  })

  it('should not signup a learning validator without firstName field', done => {
    let newLf = {
      lastName: 'Wayne',
      email: 'fred.wayne@gmail.com',
      password: 'password'
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(400)
        expect(res.body.error.message).to.equal('User Error: Missing required parameter firstName')
        done(err)
      })
  })

  it('should not signup a learning validator without lastName field', done => {
    let newLf = {
      firstName: 'Fred',
      email: 'fred.wayne@gmail.com',
      password: 'password'
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(400)
        expect(res.body.error.message).to.equal('User Error: Missing required parameter lastName')
        done(err)
      })
  })

  it('should not signup a learning validator without email field', done => {
    let newLf = {
      firstName: 'Fred',
      lastName: 'Wayne',
      password: 'password'
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(400)
        expect(res.body.error.message).to.equal('User Error: Missing required parameter email')
        done(err)
      })
  })

  it('should not signup a learning validator without password field', done => {
    let newLf = {
      firstName: 'Fred',
      lastName: 'Wayne',
      email: 'fred.wayne@gmail.com',
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(400)
        expect(res.body.error.message).to.equal('User Error: Missing required parameter password')
        done(err)
      })
  })

  it('should not signup an existing learning facilitator ', done => {
    request
      .post('/api/v1/lfs')
      .send(LF)
      .expect(409)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(409)
        expect(res.body.error.message).to.equal('User with email already exists')
        done(err)
      })
  })

  it('should not signup a learning facilitator with an invalid email ', done => {
    let newLf = {
      firstName: 'Fred',
      lastName: 'Wayne',
      email: 'fred.waynegmail.com',
      password: 'password'
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(400)
        expect(res.body.error.message).to.equal('Email is invalid')
        done(err)
      })
  })

  it('should not signup a learning facilitator with an invalid password', done => {
    let newLf = {
      firstName: 'Fred',
      lastName: 'Wayne',
      email: 'fred.wyne@gmail.com',
      password: 'psswrd'
    }
    request
      .post('/api/v1/lfs')
      .send(newLf)
      .expect(400)
      .end((err, res) => {
        expect(res.body.status.code).to.equal(400)
        expect(res.body.error.message).to.equal('Password must be at least 8 characters')
        done(err)
      })
  })
})
