document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // Decode the role from the token
    const userRole = getUserRoleFromToken(token);

    // Populate the sidebar based on the user's role
    populateSidebar(userRole);

    // Initialize the sidebar toggle functionality
    initializeSidebarToggle();
});

function populateSidebar(role) {
    const dynamicMenu = document.getElementById('accordionSidebar');
    dynamicMenu.innerHTML = '';

    // Sidebar Brand (common for all roles)
    dynamicMenu.innerHTML += `
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-utensils"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Admin<sup>v 1.0</sup></div>
        </a>
        <hr class="sidebar-divider">
    `;

    // If role is Admin
    if (role === 'Admin') {
        dynamicMenu.innerHTML += `
            <div class="sidebar-heading">Admin Manage</div>
            <li class="nav-item">
                <a class="nav-link" href="dashboard.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="users.html">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Users</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="tables.html">
                    <i class="fas fa-fw fa-chair"></i>
                    <span>Layout</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="orders-admin.html">
                    <i class="fas fa-fw fa-receipt"></i>
                    <span>Orders Admin</span>
                </a>
            </li>
            <hr class="sidebar-divider">
            <div class="sidebar-heading">Kitchen Manage</div>
            <li class="nav-item">
                <a class="nav-link" href="orders-kitchen.html">
                    <i class="fas fa-fw fa-receipt"></i>
                    <span>Orders Kitchen</span>
                </a>
            </li>
            <hr class="sidebar-divider">
            <div class="sidebar-heading">Staff Manage</div>
            <li class="nav-item">
                <a class="nav-link" href="orders-staff.html">
                    <i class="fas fa-fw fa-receipt"></i>
                    <span>Orders Staff</span>
                </a>
            </li>
            <hr class="sidebar-divider">
        `;
    }

    // If role is Staff
    if (role === 'Staff') {
        dynamicMenu.innerHTML += `
            <div class="sidebar-heading">Staff Manage</div>
            <li class="nav-item">
                <a class="nav-link" href="orders-staff.html">
                    <i class="fas fa-fw fa-receipt"></i>
                    <span>Orders</span>
                </a>
            </li>
            <hr class="sidebar-divider">
        `;
    }

    // If role is Kitchen
    if (role === 'Kitchen') {
        dynamicMenu.innerHTML += `
            <div class="sidebar-heading">Kitchen Manage</div>
            <li class="nav-item">
                <a class="nav-link" href="orders-kitchen.html">
                    <i class="fas fa-fw fa-utensils"></i>
                    <span>Kitchen Orders</span>
                </a>
            </li>
            <hr class="sidebar-divider">
        `;
    }

    // If role is Counter
    if (role === 'Counter') {
        dynamicMenu.innerHTML += `
            <div class="sidebar-heading">Counter Manage</div>
            <li class="nav-item">
                <a class="nav-link" href="orders-counter.html">
                    <i class="fas fa-fw fa-cash-register"></i>
                    <span>Counter Mode</span>
                </a>
            </li>
            <hr class="sidebar-divider">
        `;
    }

    // Sidebar Toggler (common for all roles)
    dynamicMenu.innerHTML += `
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    `;
}

// Function to initialize the sidebar toggle functionality
function initializeSidebarToggle() {
    // Ensure jQuery is loaded
    $(document).ready(function () {
        $('#sidebarToggle, #sidebarToggleTop').on('click', function (e) {
            $('body').toggleClass('sidebar-toggled');
            $('.sidebar').toggleClass('toggled');
            if ($('.sidebar').hasClass('toggled')) {
                $('.sidebar .collapse').collapse('hide');
            }
        });
    });
}

function getUserRoleFromToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.role || 'Staff';
}
