require('dotenv').config();
const request = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');

const createShoe = async(shoe) => {
  await request(app.callback())
    .post('/nike')
    .send({
      shoe: shoe,
      type: 'Running Shoe',
      price: '$180'
    });
};
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

  it('can list all the nike shoes in the database', async() => {
    const shoes = ['pegasus', 'air force mids', 'air jordans', 'tanjun'];
    await Promise.all(shoes.map(createShoe));
    const response = await request(app.callback()).get('/nike');
    expect(response.body).toHaveLength(4);
  });
});

