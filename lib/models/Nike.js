const mongoose = require('mongoose');

const nikeSchema = new mongoose.Schema({
  shoe: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Nike', nikeSchema);

