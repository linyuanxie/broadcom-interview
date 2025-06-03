
const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
// Example: GET /api/stockslist

// get data from stocks.json
function getStocks(callback) {
    const stocksPath = path.join(__dirname, 'stocks.json');
    fs.readFile(stocksPath, 'utf-8', (err, data) => {
        if (err) return callback(err);
        try {
            const stocks = JSON.parse(data);
            callback(null, stocks);
        } catch (e) {
            callback(e);
        }
    });
}
router.get('/stocklist', (req, res) => {
    getStocks((err, stocks) => {
        if (err) {
            console.error('Error reading stocks.json:', err);
            return res.status(500).json({ error: 'Failed to read stocks data' });
        }
        res.json(stocks);
    });
});

router.delete('/stock/:symbol', (req, res) => {
    const { symbol } = req.params;
    getStocks((err, stocks) => {
        if (err) {
            console.error('Error reading stocks.json:', err);
            return res.status(500).json({ error: 'Failed to read stocks data' });
        }
        const newStocks = stocks.filter(stock => stock.symbol !== symbol);
        const stocksPath = path.join(__dirname, 'stocks.json');
        fs.writeFile(stocksPath, JSON.stringify(newStocks, null, 2), (err) => {
            if (err) {
                console.error('Error deleting stock:', err);
                return res.status(500).json({ error: 'Failed to delete stock' });
            }
            res.json({ message: `Stock with symbol ${symbol} deleted.` });
        });
    });
});


module.exports = router;
