// const Boom = require('boom');
const Nike = require('../models/Nike');
const request = require('superagent');

module.exports = ({ nikeRouter }) => {
  nikeRouter.get('/', async(ctx, next) => {
    await request
      .get()
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        next(err);
      });
  });
};

