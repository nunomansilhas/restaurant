// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

let orders = []; // Store the fetched orders
let currentView = 'monthly'; // Track if viewing monthly or daily
let monthlyData = []; // Store the processed monthly data

// Fetch the order data from the API and populate the chart
async function fetchOrdersAndDrawChart() {
    try {
        const response = await fetch('http://localhost:3000/api/orders'); // Fetch orders from your API
        orders = await response.json();

        // Process the orders to get the total per month
        monthlyData = processMonthlyOrders(orders);
        drawMonthlyBarChart(monthlyData);

        // Set up back button functionality
        document.getElementById('backButton').addEventListener('click', () => {
            currentView = 'monthly';
            drawMonthlyBarChart(monthlyData);
            document.getElementById('backButton').style.display = 'none'; // Hide back button
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

// Process the orders into monthly totals
function processMonthlyOrders(orders) {
    const monthlyTotals = Array(12).fill(0); // Initialize an array for 12 months

    orders.forEach(order => {
        const orderDate = new Date(order.created_at);
        const orderMonth = orderDate.getMonth(); // 0 = January, 11 = December
        monthlyTotals[orderMonth]++;
    });

    return monthlyTotals;
}

// Process orders into daily totals for a specific month
function processDailyOrders(orders, month) {
  if (typeof month === 'undefined' || month < 0 || month > 11) {
      console.error("Invalid month:", month);
      return [];
  }

  const year = new Date().getFullYear();  // Use the current year
  const daysInMonth = new Date(year, month + 1, 0).getDate();  // Get number of days in the month

  if (isNaN(daysInMonth) || daysInMonth <= 0) {
      console.error("Invalid number of days for month", month);
      return [];
  }

  const dailyTotals = Array(daysInMonth).fill(0);  // Initialize array with 0 for each day

  orders.forEach(order => {
      const orderDate = new Date(order.created_at);
      if (orderDate.getMonth() === month) {
          const orderDay = orderDate.getDate();  // Get the day of the order
          if (orderDay >= 1 && orderDay <= daysInMonth) {
              dailyTotals[orderDay - 1]++;  // Increment the count for the correct day
          } else {
              console.error("Invalid order day", orderDay);
          }
      }
  });

  return dailyTotals;
}

// Draw the monthly bar chart
function drawMonthlyBarChart(data) {
  const ctx = document.getElementById('myBarChart').getContext('2d');

  if (window.myChart && typeof window.myChart.destroy === 'function') {
      window.myChart.destroy();
  }

  window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [{
              label: "Orders",
              backgroundColor: "#4e73df",
              hoverBackgroundColor: "#2e59d9",
              borderColor: "#4e73df",
              maxBarThickness: 25,
              data: data,
          }],
      },
      options: {
          maintainAspectRatio: false,
          layout: {
              padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
              }
          },
          scales: {
              xAxes: [{
                  time: {
                      unit: 'month'
                  },
                  gridLines: {
                      display: false,
                      drawBorder: false
                  },
                  ticks: {
                      maxTicksLimit: 12, // Ensure all months are shown
                      autoSkip: false     // Do not skip months
                  }
              }],
              yAxes: [{
                ticks: {
                    min: 0,
                    maxTicksLimit: 4, // This limits the number of ticks to a more reasonable number
                    padding: 10,
                    callback: function(value, index, values) {
                        return number_format(value) + ' orders'; // Adjusts the Y-axis labels
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                }
            }],
          },
          onClick: (e) => {
              const activePoints = window.myChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
              if (activePoints.length) {
                  const monthIndex = activePoints[0]._index; // Fix: Correctly get the index
                  handleMonthClick(monthIndex);
              }
          }
      }
  });
}

// Handle click on a specific month to show daily orders
function handleMonthClick(monthIndex) {
  currentView = 'daily';
  const dailyData = processDailyOrders(orders, monthIndex);
  
  if (dailyData.length > 0) {
      drawDailyChart(dailyData, monthIndex);
      document.getElementById('backButton').style.display = 'block';  // Show the back button
  } else {
      console.error("No valid daily data for month", monthIndex);
  }
}

// Draw the daily chart (when clicking on a month)
function drawDailyChart(data, monthIndex) {
    const ctx = document.getElementById('myBarChart').getContext('2d');
    const daysInMonth = data.length;

    if (window.myChart && typeof window.myChart.destroy === 'function') {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: daysInMonth }, (v, i) => i + 1),  // Create array of days in the month
            datasets: [{
                label: `Daily Orders in ${getMonthName(monthIndex)}`,
                data: data,
                backgroundColor: 'rgba(78, 115, 223, 0.2)',
                borderColor: 'rgba(78, 115, 223, 1)',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// Helper function to get the name of the month
function getMonthName(monthIndex) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex] || 'Unknown';
}

// Call the function to fetch orders and draw the chart
fetchOrdersAndDrawChart();
