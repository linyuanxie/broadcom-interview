
const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
// Example: GET /api/stockslist

// get data from stocks.json
function getStocks() {
    const stocksPath = path.join(__dirname, 'stocks.json');
    const data = fs.readFileSync(stocksPath, 'utf-8');
    return JSON.parse(data);
}

router.get('/stocklist', (req, res) => {
    res.json(getStocks());
});

router.delete('/stock/:symbol', (req, res) => {
    const { symbol } = req.params;
    const stocksPath = path.join(__dirname, 'stocks.json');
    let stocks = getStocks();

    // Filter out the stock with the given symbol
    const newStocks = stocks.filter(stock => stock.symbol !== symbol);

    // Save the updated list back to stocks.json
    fs.writeFileSync(stocksPath, JSON.stringify(newStocks, null, 2));

    res.json({ message: `Stock with symbol ${symbol} deleted.` });
});


module.exports = router;
