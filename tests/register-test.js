/**
 * Created by Vova on 07.04.2017.
 */
const request = require('supertest');
const app = require('../server');

describe('GET /users', function() {
  it('respond with json', function(done) {
    var app = express();

    request(app)
      .post('/users/register')
      .send({ name: 'tobi' })
      .expect(200, done)
      .end(function(err, res){
        var body = res.body;
        done(err)
      })
  });
});
