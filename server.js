const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const Cors = require('@koa/cors');
const BodyParser = require('koa-bodyparser');
const respond = require('koa-respond');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

if(process.env.NODE_ENV === 'development') {
  app.use(Logger());
}

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

// API routes
const nike = require('./lib/routes/nike');
app.use(nike);

app.use(require('koa-static')('./build'));

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

module.exports = app;
