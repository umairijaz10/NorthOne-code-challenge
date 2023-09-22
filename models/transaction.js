// models/transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Posted'], required: true },
  counterpartyName: { type: String, required: true },
  methodCode: { type: String, required: true },
  note: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);
