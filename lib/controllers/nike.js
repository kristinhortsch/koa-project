const Nike = require('../models/Nike');

async function findAll(ctx) {
  // Fetch all Nikes from the database and return as payload
  const nikes = await Nike.find({});
  ctx.body = nikes;
}

async function findOne(ctx) {
  const id = ctx.params.id;
  console.log(ctx.params);  
  const foundNike = await Nike.findById(id);
  ctx.body = foundNike;
}

async function create(ctx) {
  // Create New Nike from payload sent and save to database
  const newNike = new Nike(ctx.request.body);
  const savedNike = await newNike.save();
  ctx.body = savedNike;
}

async function destroy(ctx) {
  // Get id from url parameters and find Nike in database
  const id = ctx.params.id;
  const nike = await Nike.findById(id);

  // Delete nike from database and return deleted object as reference
  const deletedNike = await nike.remove();
  ctx.body = deletedNike;
}

async function update(ctx) {
  // Find nike based on id, then toggle done on/off
  const id = ctx.params.id;
  const nike = await Nike.findById(id);
  nike.done = !nike.done;

  // Update nike in database
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
