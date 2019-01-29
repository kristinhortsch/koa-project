const Nike = require('../models/Nike');

async function findAll(ctx) {
  const nikes = await Nike.find({});
  ctx.body = nikes;
}

async function findOne(ctx) {
  const id = ctx.params.id;
  const foundNike = await Nike.findById(id);
  ctx.body = foundNike;
}

async function create(ctx) {
  const newNike = new Nike(ctx.request.body);
  const savedNike = await newNike.save();
  ctx.body = savedNike;
}

async function destroy(ctx) {
  const id = ctx.params.id;
  const nike = await Nike.findById(id);
  const deletedNike = await nike.remove();
  ctx.body = deletedNike;
}

async function update(ctx) {
  const id = ctx.params.id;
  const nike = await Nike.findByIdAndUpdate(id, ctx.request.body);
  const updatedNike = await nike.save();
  ctx.body = updatedNike;
}

module.exports = {
  findAll,
  findOne,
  create,
  destroy,
  update
};
