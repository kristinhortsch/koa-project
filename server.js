const Koa = require('koa');
const Cors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const respond = require('koa-respond');
const mongoose = require('mongoose');
const connection = require('./lib/middleware/connection');
const { handler } = require('./lib/middleware/error');
const notFound = require('./lib/middleware/notFound');

const app = new Koa();

app.use(Cors());

app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function(err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));

app.use(respond());
const nike = require('./lib/routes/nike');
app.use(nike, connection);

app.use(require('koa-static')('./build'));

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
app.use(notFound);
app.use(handler);

module.exports = app;
