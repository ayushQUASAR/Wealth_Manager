const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Holding = require('../models/Holding');

dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

// Correctly formatted hardcoded data from the CSV file
const holdingsData = [
  {
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    quantity: 50,
    avgPrice: 2450,
    currentPrice: 2680.5,
    sector: 'Energy',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 134025,
    gainLoss: 11525,
    gainLossPercent: 0.0939
  },
  {
    symbol: 'INFY',
    companyName: 'Infosys Limited',
    quantity: 100,
    avgPrice: 1800,
    currentPrice: 2010.75,
    sector: 'Technology',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 201075,
    gainLoss: 21075,
    gainLossPercent: 0.1171
  },
  {
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    quantity: 75,
    avgPrice: 3200,
    currentPrice: 3450.25,
    sector: 'Technology',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 258768.8,
    gainLoss: 18768.75,
    gainLossPercent: 0.0782
  },
  {
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Limited',
    quantity: 80,
    avgPrice: 1650,
    currentPrice: 1580.3,
    sector: 'Banking',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 126424,
    gainLoss: -5576,
    gainLossPercent: -0.0422
  },
  {
    symbol: 'ICICIBANK',
    companyName: 'ICICI Bank Limited',
    quantity: 60,
    avgPrice: 1100,
    currentPrice: 1235.8,
    sector: 'Banking',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 74148,
    gainLoss: 8148,
    gainLossPercent: 0.1234
  },
  {
    symbol: 'BHARTIARTL',
    companyName: 'Bharti Airtel Limited',
    quantity: 120,
    avgPrice: 850,
    currentPrice: 920.45,
    sector: 'Telecommunications',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 110454,
    gainLoss: 8454,
    gainLossPercent: 0.0828
  },
  {
    symbol: 'ITC',
    companyName: 'ITC Limited',
    quantity: 200,
    avgPrice: 420,
    currentPrice: 465.2,
    sector: 'Consumer Goods',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 93040,
    gainLoss: 9040,
    gainLossPercent: 0.1076
  },
  {
    symbol: 'SBIN',
    companyName: 'State Bank of India',
    quantity: 150,
    avgPrice: 550,
    currentPrice: 590.7,
    sector: 'Banking',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 88605,
    gainLoss: 6105,
    gainLossPercent: 0.074
  },
  {
    symbol: 'KOTAKBANK',
    companyName: 'Kotak Mahindra Bank',
    quantity: 40,
    avgPrice: 1900,
    currentPrice: 1850.5,
    sector: 'Financial Services',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 74020,
    gainLoss: -1980,
    gainLossPercent: -0.0261
  },
  {
    symbol: 'HINDUNILVR',
    companyName: 'Hindustan Unilever Limited',
    quantity: 30,
    avgPrice: 2600,
    currentPrice: 2750.9,
    sector: 'Consumer Discretionary',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 82527,
    gainLoss: 4527,
    gainLossPercent: 0.058
  },
  {
    symbol: 'LT',
    companyName: 'Larsen & Toubro Limited',
    quantity: 25,
    avgPrice: 2800,
    currentPrice: 2950.6,
    sector: 'Infrastructure',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 73765,
    gainLoss: 3765,
    gainLossPercent: 0.0538
  },
  {
    symbol: 'BAJFINANCE',
    companyName: 'Bajaj Finance Limited',
    quantity: 15,
    avgPrice: 7200,
    currentPrice: 7500.8,
    sector: 'Financial Services',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 112512,
    gainLoss: 4512,
    gainLossPercent: 0.0418
  },
  {
    symbol: 'MARUTI',
    companyName: 'Maruti Suzuki India Limited',
    quantity: 30,
    avgPrice: 9500,
    currentPrice: 10250.3,
    sector: 'Automotive',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 307509,
    gainLoss: 22509,
    gainLossPercent: 0.0789
  },
  {
    symbol: 'TATAMOTORS',
    companyName: 'Tata Motors Limited',
    quantity: 100,
    avgPrice: 600,
    currentPrice: 645.85,
    sector: 'Automotive',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 64585,
    gainLoss: 4585,
    gainLossPercent: 0.0764
  },
  {
    symbol: 'ASIANPAINT',
    companyName: 'Asian Paints Limited',
    quantity: 25,
    avgPrice: 3200,
    currentPrice: 2980.5,
    sector: 'Consumer Goods',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 74512.5,
    gainLoss: -5487.5,
    gainLossPercent: -0.0686
  },
  {
    symbol: 'SUNPHARMA',
    companyName: 'Sun Pharmaceutical Industries',
    quantity: 50,
    avgPrice: 1400,
    currentPrice: 1494.35,
    sector: 'Healthcare',
    marketCap: 'Large',
    exchange: 'NSE',
    value: 74717.5,
    gainLoss: 4717.5,
    gainLossPercent: 0.0674
  }
];


const importData = async () => {
  await connectDB();
  try {
    console.log('Clearing existing holdings data...');
    await Holding.deleteMany();
    console.log('Holdings data cleared.');

    if (holdingsData.length > 0) {
      await Holding.insertMany(holdingsData);
      console.log(`Holdings data imported successfully! ${holdingsData.length} records added.`);
    } else {
      console.log('No hardcoded data found to import.');
    }
  } catch (error) {
    console.error(`Error during data import: ${error}`);
  } finally {
    // Use finally to ensure process.exit() is called
    mongoose.connection.close();
    process.exit();
  }
};

importData();
