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

  it('gets a shoe by id', async() => {
    const createdShoe = async() => await createShoe('air max');
    var path = '/users/' + createdShoe._id;
    const response = await request(app.callback()).get('/nike/' + path);
    expect(response.body).toEqual({
      shoe: 'air max',
      price: '$180',
      type: 'Running Shoe',
      _id: expect.any(String),
      __v: 0
    });
  });

  it('updates a shoe with :id and returns the update', async() => {
    const updatedShoe = async() => await createShoe('air force mids');
    updatedShoe.type = 'new shoe';
    const id = updatedShoe._id;
    const response = await request(app.callback())
      .put(`/nike/${id}`)
      .send(updatedShoe);
    expect(response.body).toEqual({
      shoe: 'new shoe',
      price: '$180',
      type: 'Running Shoe',
      _id: expect.any(String),
      __v: 0
    });
  });

  it('deletes a shoe with :id and returns the delete count', async() => {
    const createdShoe = async() => await createShoe('lebrons');
    const id = createdShoe._id;
    const response = await request(app.callback()).delete(`/nike/${id}`);
    expect(response.body).toBeDefined();
  });
});


