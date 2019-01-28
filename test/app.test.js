require('dotenv').config();
const request = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');

describe('nike app', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('creates a new nike shoe product', async() => {
    return request(app)
      .post('/nike')
      .send({
        shoe: 'Nike Zoom Pegasus Turbo',
        type: 'Running Shoe',
        price: '$180'
      })
      .then(res => {
        expect(res.body).toEqual({
          shoe: 'Nike Zoom Pegasus Turbo',
          type: 'Running Shoe',
          price: '$180'
        });
      });
  });
});
