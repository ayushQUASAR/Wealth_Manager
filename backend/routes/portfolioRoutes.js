const express = require('express');
const router = express.Router();
const {
  getHoldings,
  getAllocation,
  getPerformance,
  getSummary
} = require('../controllers/portfolioController');

router.get('/holdings', getHoldings);
router.get('/allocation', getAllocation);
router.get('/performance', getPerformance);
router.get('/summary', getSummary);

module.exports = router;
