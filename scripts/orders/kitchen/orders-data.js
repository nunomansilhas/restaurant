const apiUrl = "http://localhost:3000/api/orders";

// Function to check if the order was created today
function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

// Fetch all orders and triage them by date and status
async function fetchAllOrders() {
    try {
        const response = await fetch(apiUrl); // Assuming this fetches all orders
        const orders = await response.json();

        // Filter orders for today
        const todaysOrders = orders.filter(order => isToday(new Date(order.createdAt)));

        // Separate orders into pending and completed
        const pendingOrders = todaysOrders.filter(order => order.status === 'Pending');
        const completedOrders = todaysOrders.filter(order => order.status === 'Completed');

        return { pendingOrders, completedOrders };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { pendingOrders: [], completedOrders: [] }; // Return empty arrays on error
    }
}

export { fetchAllOrders };
