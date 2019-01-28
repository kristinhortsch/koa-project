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
    const response = await request(app.callback())
      .post('/nike')
      .send({
        shoe: 'Nike Zoom Pegasus Turbo',
        type: 'Running Shoe',
        price: '$180'
      });
    expect(response.body).toEqual({
      shoe: 'Nike Zoom Pegasus Turbo',
      type: 'Running Shoe',
      price: '$180',
      __v: 0, 
      _id: expect.any(String)
    });
  });
});

