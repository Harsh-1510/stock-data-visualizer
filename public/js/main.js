// Variables
let stockChart = null;
let currentCompany = null;

// Fetch the list of companies when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchCompanies();
});

// Fetch companies from the API
async function fetchCompanies() {
  try {
    const response = await fetch('/api/companies');
    const companies = await response.json();
    displayCompanies(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
}

// Display companies in the left sidebar
function displayCompanies(companies) {
  const companyList = document.getElementById('company-list');
  companyList.innerHTML = '';
  
  companies.forEach(company => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = company;
    listItem.addEventListener('click', () => {
      // Highlight the selected company
      document.querySelectorAll('#company-list .list-group-item').forEach(item => {
        item.classList.remove('active');
      });
      listItem.classList.add('active');
      
      // Fetch and display data for the selected company
      fetchCompanyData(company);
    });
    companyList.appendChild(listItem);
  });
}

// Fetch data for a specific company
async function fetchCompanyData(company) {
  try {
    const response = await fetch(`/api/data/${encodeURIComponent(company)}`);
    const data = await response.json();
    currentCompany = company;
    displayChart(data);
    displayCompanyDetails(data);
  } catch (error) {
    console.error('Error fetching company data:', error);
  }
}

// Display the chart using Chart.js
function displayChart(data) {
  const ctx = document.getElementById('stock-chart').getContext('2d');
  
  // Sort data by date
  data.sort((a, b) => new Date(a.index_date) - new Date(b.index_date));
  
  // Format data for Chart.js
  const labels = data.map(item => item.index_date);
  const openValues = data.map(item => parseFloat(item.open_index_value));
  const closeValues = data.map(item => parseFloat(item.closing_index_value));
  const highValues = data.map(item => parseFloat(item.high_index_value));
  const lowValues = data.map(item => parseFloat(item.low_index_value));
  
  // Update chart title
  document.getElementById('chart-title').textContent = `${currentCompany} - Stock Performance`;
  
  // Destroy previous chart if it exists
  if (stockChart) {
    stockChart.destroy();
  }
  
  // Create new chart
  stockChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Open',
          data: openValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        },
        {
          label: 'Close',
          data: closeValues,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
        },
        {
          label: 'High',
          data: highValues,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1
        },
        {
          label: 'Low',
          data: lowValues,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86,.2)',
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${currentCompany} Stock Data`
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    }
  });
}

// Display company details
function displayCompanyDetails(data) {
  // Get the most recent data point
  const latestData = data[data.length - 1];
  
  const detailsContainer = document.getElementById('company-details');
  detailsContainer.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${latestData.index_date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Open:</span>
          <span class="detail-value">${parseFloat(latestData.open_index_value).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">High:</span>
          <span class="detail-value">${parseFloat(latestData.high_index_value).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Low:</span>
          <span class="detail-value">${parseFloat(latestData.low_index_value).toFixed(2)}</span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="detail-row">
          <span class="detail-label">Close:</span>
          <span class="detail-value">${parseFloat(latestData.closing_index_value).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Points Change:</span>
          <span class="detail-value">${parseFloat(latestData.points_change).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Change %:</span>
          <span class="detail-value">${parseFloat(latestData.change_percent).toFixed(2)}%</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Volume:</span>
          <span class="detail-value">${parseInt(latestData.volume).toLocaleString()}</span>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <div class="detail-row">
          <span class="detail-label">Turnover (Rs Cr):</span>
          <span class="detail-value">${parseFloat(latestData.turnover_rs_cr).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">PE Ratio:</span>
          <span class="detail-value">${parseFloat(latestData.pe_ratio).toFixed(2)}</span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="detail-row">
          <span class="detail-label">PB Ratio:</span>
          <span class="detail-value">${parseFloat(latestData.pb_ratio).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Dividend Yield:</span>
          <span class="detail-value">${parseFloat(latestData.div_yield).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  `;
}