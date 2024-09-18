import { fetchAllOrders } from './orders-data.js';

let pendingOrders = [];
let completedOrders = [];

async function loadTodayOrders() {
    const { pendingOrders: pending, completedOrders: completed } = await fetchAllOrders();
    pendingOrders = pending;
    completedOrders = completed;

    renderOrders(pendingOrders, 'pending');
    renderOrders(completedOrders, 'completed');
    startOrderTimers();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadTodayOrders();
    startOrderTimers();
});

// Function to render orders with service type labels
function renderOrders(orders, type) {
    const container = type === 'pending' ? document.getElementById('pending-orders') : document.getElementById('completed-orders');
    container.innerHTML = '';

    orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    orders.forEach(order => {
        const serviceTypeBadge = order.categoryBadge === 'Takeaway' ? '<span class="badge badge-service badge-takeaway">Takeaway</span>' :
            '<span class="badge badge-service badge-room-service">Room Service</span>';
        const timer = order.completedAt ? calculateElapsedTime(order.createdAt, order.completedAt) : '00:00';
        const dishes = Array.isArray(order.dishes) ? order.dishes.join(', ') : 'No dishes available';

        const orderCard = `
            <div class="col-xl-4 col-md-6 mb-4">
                <div class="card ${type === 'pending' ? 'border-left-warning' : 'border-left-success'} shadow h-100 py-2 order-card" data-id="${order.id}">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-md font-weight-bold ${type === 'pending' ? 'text-warning' : 'text-success'} text-uppercase mb-1">
                                    Order #${order.id} ${serviceTypeBadge}
                                </div>
                                <div class="order-info">
                                    <span>Dishes: ${dishes}</span><br>
                                    <span>Table Number: ${order.tableNumber}</span><br>
                                    <span>Staff: ${order.staffName}</span>
                                </div>
                            </div>
                            <div class="col-auto">
                                ${type === 'pending' ? `<a href="#" class="btn btn-outline-success btn-circle btn-lg" onclick="completeOrder(${order.id})">
                                    <i class="fas fa-check"></i>
                                </a>` : `<i class="fas fa-utensils fa-2x text-gray-300"></i>`}
                            </div>
                            <div class="order-timer" id="timer-${order.id}">${timer}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += orderCard;
    });
}

// Start and manage timers for orders
function startOrderTimers() {
    setInterval(() => {
        const now = new Date();
        pendingOrders.forEach(order => {
            const orderDate = new Date(order.createdAt);
            const elapsedMs = now - orderDate;

            const elapsedMinutes = Math.floor(elapsedMs / 60000);
            const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);

            const timerElement = document.getElementById(`timer-${order.id}`);
            if (timerElement) {
                timerElement.textContent = `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' + elapsedSeconds : elapsedSeconds}`;

                const orderCard = document.querySelector(`.order-card[data-id="${order.id}"]`);
                const titleElement = orderCard.querySelector('.text-md');

                if (elapsedMinutes >= 5) {
                    orderCard.classList.add('waiting-long');
                    titleElement.classList.replace('text-warning', 'text-warning-long');
                } else if (elapsedMinutes >= 3) {
                    timerElement.classList.replace('timer-normal', 'timer-medium');
                } else {
                    timerElement.classList.add('timer-normal');
                }
            }
        });
    }, 1000);
}

function calculateElapsedTime(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const elapsedMs = end - start;

    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);

    return `${elapsedMinutes}:${elapsedSeconds < 10 ? '0' + elapsedSeconds : elapsedSeconds}`;
}

async function completeOrder(orderId) {
    const orderIndex = pendingOrders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        const completedOrder = pendingOrders.splice(orderIndex, 1)[0];
        const timeToComplete = calculateElapsedTime(completedOrder.createdAt, new Date().toISOString());

        await markOrderAsCompleted(orderId, timeToComplete);
        completedOrders.push(completedOrder);

        Swal.fire({
            title: 'Success!',
            text: `Order #${orderId} marked as completed.`,
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        });

        renderOrders(pendingOrders, 'pending');
        renderOrders(completedOrders, 'completed');
    }
}

// Function to filter orders by service type (All, Takeaway, Room Service)
function filterOrders(serviceType) {
    let filteredOrders;
    if (serviceType === 'all') {
        filteredOrders = pendingOrders;  // Show all pending orders
    } else {
        filteredOrders = pendingOrders.filter(order => order.categoryBadge === serviceType);
    }

    // Re-render filtered pending orders
    renderOrders(filteredOrders, 'pending');
}