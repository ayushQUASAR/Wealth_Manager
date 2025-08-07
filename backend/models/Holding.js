const mongoose = require('mongoose');

const HoldingSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  quantity: { type: Number, required: true },
  avgPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  sector: { type: String, required: true },
  marketCap: { type: String, required: true },
  exchange: { type: String, required: true },
  value: { type: Number, required: true },
  gainLoss: { type: Number, required: true },
  gainLossPercent: { type: Number, required: true },
});

// The conflicting virtual properties have been removed.

const Holding = mongoose.model('Holding', HoldingSchema);
module.exports = Holding;
