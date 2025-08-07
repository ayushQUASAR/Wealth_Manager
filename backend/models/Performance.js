const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  portfolioValue: { type: Number, required: true },
  nifty50: { type: Number, required: true },
  gold: { type: Number, required: true },
  portfolioReturnPercent: { type: Number, required: true },
  nifty50ReturnPercent: { type: Number, required: true },
  goldReturnPercent: { type: Number, required: true },
});

const Performance = mongoose.model('Performance', PerformanceSchema);
module.exports = Performance;