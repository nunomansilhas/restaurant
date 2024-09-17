document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the orders data from the API
        const response = await fetch('http://localhost:3000/api/orders');
        const orders = await response.json();

        // Process the orders data
        const dashboardData = processOrdersData(orders);

        // Populate the cards with the processed data
        populateDashboardCards(dashboardData);
    } catch (error) {
        console.error('Error fetching orders data:', error);
    }
});

// Function to process the orders and calculate the required metrics
function processOrdersData(orders) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();

    let monthlyOrders = 0;
    let annualOrders = 0;
    let dailyCompletedOrders = 0;
    let pendingOrders = 0;

    orders.forEach(order => {
        // Parse the order date from the "created_at" field
        const orderDate = new Date(order.created_at);
        const orderMonth = orderDate.getMonth();
        const orderYear = orderDate.getFullYear();
        const orderDay = orderDate.getDate();

        // Count annual orders (all orders for the year, regardless of status)
        if (orderYear === currentYear) {
            annualOrders++;

            // Count monthly orders (all orders for the month, regardless of status)
            if (orderMonth === currentMonth) {
                monthlyOrders++;
            }

            // Count daily completed and pending orders for today
            if (orderMonth === currentMonth && orderDay === currentDay) {
                if (order.status === 'Completed') {
                    dailyCompletedOrders++;
                } else if (order.status === 'Pending') {
                    pendingOrders++;
                }
            }
        }
    });

    // Calculate the completed orders percentage (based on completed and pending)
    const totalOrdersToday = dailyCompletedOrders + pendingOrders;
    const dailyCompletedPercentage = totalOrdersToday > 0 ? (dailyCompletedOrders / totalOrdersToday) * 100 : 0;

    return {
        monthlyOrders,
        annualOrders,
        dailyCompletedPercentage: dailyCompletedPercentage.toFixed(2),  // Rounded to 2 decimal places
        pendingOrders
    };
}



// Function to populate the dashboard cards with the processed data
function populateDashboardCards(data) {
    const dashboardCards = document.getElementById('dashboard-cards');

    // Clear existing content
    dashboardCards.innerHTML = '';

    // Populate Monthly Orders
    dashboardCards.innerHTML += `
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Monthly Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${data.monthlyOrders}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Populate Annual Orders
    dashboardCards.innerHTML += `
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Annual Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${data.annualOrders}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-box fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Populate Daily Completed Orders (Percentage)
    dashboardCards.innerHTML += `
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Completed Orders</div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">${data.dailyCompletedPercentage}%</div>
                                </div>
                                <div class="col">
                                    <div class="progress progress-sm mr-2">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: ${data.dailyCompletedPercentage}%"
                                             aria-valuenow="${data.dailyCompletedPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Populate Pending Orders
    dashboardCards.innerHTML += `
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Orders</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${data.pendingOrders}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
