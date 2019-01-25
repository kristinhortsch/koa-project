const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const nike = require('./routes/nike');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(logger());
app.use(nike.routes());
app.use(nike.allowedMethods());

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });


app.use(async ctx => {
  ctx; // is the Context
  ctx.request; // is a Koa Request
  ctx.response; // is a Koa Response
});

app.listen(7891, () => {
  console.log('Server started on port 7891');
});


module.exports = app;
