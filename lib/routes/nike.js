const nikeControl = require('../controllers/nike');
const Router = require('koa-router');
const nike = new Router();

nike.get('/nike', nikeControl.findAll);
nike.get('/nike/:id', nikeControl.findOne);
nike.post('/nike', nikeControl.create);
nike.put('/nike/:id', nikeControl.update);
nike.delete('/nike/:id', nikeControl.destroy);

module.exports = nike.routes();
