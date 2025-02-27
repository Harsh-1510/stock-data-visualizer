const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store parsed data
let stockData = [];

// Parse CSV file
fs.createReadStream('data/dump.csv')
  .pipe(csv())
  .on('data', (row) => {
    stockData.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// API endpoint to get all unique companies
app.get('/api/companies', (req, res) => {
  const companies = [...new Set(stockData.map(item => item.index_name))];
  res.json(companies);
});

// API endpoint to get data for a specific company
app.get('/api/data/:company', (req, res) => {
  const company = req.params.company;
  const companyData = stockData.filter(item => item.index_name === company);
  res.json(companyData);
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});