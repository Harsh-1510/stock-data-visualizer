# Stock Market Data Visualizer

A web application that displays stock market data from a CSV file. The app shows a list of companies on the left side and when a company is clicked, it displays an interactive chart with the selected company's stock data on the right side.

## Features

- Display a list of stock market indices/companies
- Interactive line chart showing Open, Close, High, and Low values
- Detailed company information panel showing key metrics
- Responsive design using Bootstrap
- Real-time data visualization with Chart.js

## Tech Stack

- **Frontend**: HTML, CSS, Bootstrap, Chart.js
- **Backend**: Node.js with Express

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Harsh-1510/stock-data-visualizer.git
   cd stock-market-data-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Prepare the data**:
   - Place your CSV file in the `data` folder as `dump.csv`
   - Or use the sample data that's automatically generated when the app runs

4. **Start the server**:
   ```bash
   node server.js
   ```

5. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`

## CSV Data Format

The CSV file should have the following columns:
- `index_name`: Name of the stock index/company
- `index_date`: Date of the trading day
- `open_index_value`: Opening value
- `high_index_value`: Highest value during the trading day
- `low_index_value`: Lowest value during the trading day
- `closing_index_value`: Closing value
- `points_change`: Change in points
- `change_percent`: Percentage change
- `volume`: Trading volume
- `turnover_rs_cr`: Turnover in Rs. Crores
- `pe_ratio`: Price-to-Earnings ratio
- `pb_ratio`: Price-to-Book ratio
- `div_yield`: Dividend yield

## File Structure

```
stock-data-visualizer/
│
├── data/
│   └── dump.csv
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── index.html
│
├── server.js
├── package.json
└── README.md
```

## Future Enhancements

- Add date range filtering
- Implement additional chart types (candlestick, bar, etc.)
- Add comparison feature to compare multiple indices
- Add data export functionality (CSV, PDF)
- Implement user authentication for personalized dashboards

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Data source: Stock market indices data
- [Bootstrap](https://getbootstrap.com/) - For responsive design
- [Chart.js](https://www.chartjs.org/) - For data visualization
