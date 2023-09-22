const mongoose = require('mongoose');

const methodSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('Method', methodSchema);
