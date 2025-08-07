const Holding = require('../models/Holding');

const getHoldings = async (req, res) => {
    try {
        const holdings = await Holding.find({});
        res.json(holdings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllocation = async (req, res) => {
    try {
        const holdings = await Holding.find({});
        const totalValue = holdings.reduce((acc, stock) => acc + stock.value, 0);

        const bySector = holdings.reduce((acc, stock) => {
            if (!acc[stock.sector]) {
                acc[stock.sector] = { value: 0 };
            }
            acc[stock.sector].value += stock.value;
            return acc;
        }, {});
        
        const byMarketCap = holdings.reduce((acc, stock) => {
            if (!acc[stock.marketCap]) {
                acc[stock.marketCap] = { value: 0 };
            }
            acc[stock.marketCap].value += stock.value;
            return acc;
        }, {});

        const formatAllocation = (data) => {
            return Object.keys(data).reduce((acc, key) => {
                acc[key] = {
                    value: data[key].value,
                    percentage: (data[key].value / totalValue) * 100,
                };
                return acc;
            }, {});
        };

        res.json({
            bySector: formatAllocation(bySector),
            byMarketCap: formatAllocation(byMarketCap)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPerformance = async (req, res) => {
    // Return hardcoded data as requested, now including the 'returns' object
    const performanceData = {
        "timeline": [
            { "date": "2024-01-01", "portfolio": 650000, "nifty50": 21000, "gold": 62000 },
            { "date": "2024-03-01", "portfolio": 680000, "nifty50": 22100, "gold": 64500 },
            { "date": "2024-06-01", "portfolio": 700000, "nifty50": 23500, "gold": 68000 }
        ],
        "returns": {
            "portfolio": { "1month": 2.3, "3months": 8.1, "1year": 15.7 },
            "nifty50": { "1month": 1.8, "3months": 6.2, "1year": 12.4 },
            "gold": { "1month": -0.5, "3months": 4.1, "1year": 8.9 }
        }
    };
    res.json(performanceData);
};

const getSummary = async (req, res) => {
    try {
        const holdings = await Holding.find({});
        if (holdings.length === 0) {
            return res.status(404).json({ message: 'No holdings found' });
        }

        const totalValue = holdings.reduce((acc, stock) => acc + stock.value, 0);
        const totalInvested = holdings.reduce((acc, stock) => acc + (stock.avgPrice * stock.quantity), 0);
        const totalGainLoss = totalValue - totalInvested;
        const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;
        const topPerformer = holdings.reduce((prev, curr) => curr.gainLossPercent > prev.gainLossPercent ? curr : prev);
        const worstPerformer = holdings.reduce((prev, curr) => curr.gainLossPercent < prev.gainLossPercent ? curr : prev);

        res.json({
            totalValue,
            totalInvested,
            totalGainLoss,
            totalGainLossPercent,
            holdingsCount: holdings.length,
            topPerformer: {
                symbol: topPerformer.symbol,
                name: topPerformer.companyName,
                gainPercent: topPerformer.gainLossPercent
            },
            worstPerformer: {
                symbol: worstPerformer.symbol,
                name: worstPerformer.companyName,
                gainPercent: worstPerformer.gainLossPercent
            },
            diversificationScore: 8.2,
            riskLevel: "Moderate"
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getHoldings, getAllocation, getPerformance, getSummary };