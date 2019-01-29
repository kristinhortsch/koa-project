require('dotenv').config();
const request = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');

const createShoe = async(shoe) => {
  return request(app.callback())
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

  it('gets a shoe by id', async() => {
    const createdShoe = await createShoe('lebrons');
    const id = createdShoe.body._id;
    const response = await request(app.callback()).get(`/nike/${id}`);
    expect(response.body).toEqual({
      shoe: 'lebrons',
      price: '$180',
      type: 'Running Shoe',
      _id: expect.any(String),
      __v: 0
    });
  });

  it('updates a shoe with :id and returns the update', async() => {
    const updatedShoe = await createShoe('air force mids');
    updatedShoe.body.shoe = 'newer';
    const id = updatedShoe.body._id;
    const response = await request(app.callback())
      .put(`/nike/${id}`)
      .send({
        shoe: 'newer',
        type: 'Running Shoe',
        price: '$180'
      });
    expect(response.body).toEqual({
      shoe: 'newer',
      price: '$180',
      type: 'Running Shoe',
      _id: expect.any(String),
      __v: 0
    });
  });

  it('deletes a shoe with :id and returns the delete count', async() => {
    const createdShoe = await createShoe('lebrons');
    const id = createdShoe.body._id;
    const response = await request(app.callback()).delete(`/nike/${id}`);
    expect(response.body).toEqual({
      __v: 0,
      _id: expect.any(String),
      price: '$180',
      shoe: 'lebrons',
      type: 'Running Shoe',
    });
  });
});


