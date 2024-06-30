const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  content: { type: String, required: true },
  category: { type: String, required: true },
  reply: { type: String, required: true },
  labels: [String],
});

module.exports = mongoose.model('Email', emailSchema);
