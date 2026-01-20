
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

router.post('/stock', (req, res) => {
   const newStock = req.body;
    getStocks((err, stocks) => {
        if (err) {
            console.error('Error reading stocks.json:', err);
            return res.status(500).json({ error: 'Failed to read stocks data' });
        }

        const exists = stocks.some(stock => stock.symbol === newStock.symbol);
        if (exists) {
            return res.status(400).json({ error: 'Stock with this symbol already exists' });
        }
        // Add the new stock to the existing stocks
        stocks.push(newStock);

        // Write the updated stocks array back to stocks.json
        const stocksPath = path.join(__dirname, 'stocks.json');
        fs.writeFile(stocksPath, JSON.stringify(stocks, null, 2), (err) => {
            if (err) {
                console.error('Error adding new stock:', err);
                return res.status(500).json({ error: 'Failed to add new stock' });
            }
            res.status(200).json(newStock); // Respond with the newly added stock
        });
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
