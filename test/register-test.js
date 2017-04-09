/**
 * Created by Vova on 07.04.2017.
 */
const request = require('supertest');
const app = require('../server.js');


describe('POST users', function() {
  it('respond with json', function(done) {

    var profile = {
      email: 'testing3@test.com',
      password: 'test',
      firstName: 'Valerio',
      lastName: 'Gheri'
    };

    request(app)
      .post('/users/register')
      .send(profile)
      // end handles the response
      .end(function(err, res) {
        console.log(res.body);
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        //res.should.have.status(400);
        done();
      });
  });
});
