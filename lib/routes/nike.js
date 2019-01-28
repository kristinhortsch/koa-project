const nikeControl = require('../controllers/nike');
const Router = require('koa-router');
const nike = new Router();

nike.get('/nike', nikeControl.findAll);
nike.post('/nike', nikeControl.create);
nike.post('/nike/:id', nikeControl.update);
nike.delete('/nike/:id', nikeControl.destroy);

module.exports = nike.routes();
