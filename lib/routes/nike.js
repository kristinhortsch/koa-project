// const Boom = require('boom');
const Nike = require('../models/Nike');
const request = require('superagent');
const Router = require('koa-router');
const nike = new Router({ prefix: '/nike' });


nike
  .post('/', async function(ctx, next) {
    const person = ctx.request.body.person;
    ctx.body = { message: `hi ${person}` };
      // .catch(err => {
      //   next(err);
      // });
  });

module.exports = nike;

// .get('/', async(ctx, next) => {
//   Nike.find({

//   })
//   await request
//     .get()
//     .then(res => {
//       ctx.body = res.body;
//     })
//     .catch(err => {
//       next(err);
//     });
// })

