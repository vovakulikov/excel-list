/**
 * Created by Vova on 07.04.2017.
 */
const request = require('supertest');
const app = require('../server.js');
const firebase = require('../server/db.js');
const should = require('chai').should();


describe('API test', function() {

  const testInformation = {};
  const testUser = {
    email: 'testing3@test.com',
    password: 'test',
    firstName: 'Valerio',
    lastName: 'Gheri'
  };

  before(function(done) {
    firebase.removeUser(testUser)
      .then(() => {
        done();
      })
  });

  after(function(done) {
    firebase.removeUser(testUser)
      .then(() => {
        done();
      });
  });

  it('should register user ', function(done) {
    request(app)
      .post('/users/register')
      .send(testUser)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else if (!res.body.success) {
          throw new Error(res.body.msg)
        }
          done();
      });
  });

  it('should return error trying to save duplicate username', function(done){
    request(app)
      .post('/users/register')
      .send(testUser)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property('success');
        res.body.success.should.equal(false);
        done();
      });
  })

  it('should auth user after registration', function (done){
    request(app)
      .post('/users/auth')
      .send(testUser)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('token');
        res.body.user.should.equal(testUser.email);

        testInformation.token = res.body.token;
        done();
      });
  })

  it('should return error auth user which was not registered ', function (done){
    request(app)
      .post('/users/auth')
      .send(Object.assign({}, testUser, {email: 'wrongEmail@mail.com'}))
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property('success');
        res.body.success.should.equal(false);
        done();
      });
  });

  it('should return profile of user ', function (done){
    request(app)
      .get('/users/profile')
      .set('Authorization',testInformation.token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.email.should.equal(testUser.email);
          done();
      });
  });

  it('should return error because we are not add auth header to request', function (done){
    request(app)
      .get('/users/profile')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.success.should.equal(false);
        done();
      });
  });

  it("should return array of user's document", function(done){
    request(app)
      .get('/users/docs')
      .set('Authorization',testInformation.token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.an('array');
        res.body.length.should.equal(0);
        done();
      });
  })

  it("should return error because auth token was not send by request to getting document of user", function(done){
    request(app)
      .get('/users/docs')
      .set('Authorization',testInformation.token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.an('array');
        done();
      });
  });

  it('should upload file on server', function (done){
    request(app)
      .post('/users/upload-user-file')
      .set('Authorization',testInformation.token)
      .attach('uploads', './../../exceltes/cars.xlsx')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  })
});
