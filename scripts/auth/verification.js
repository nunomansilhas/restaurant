document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    // If no token, redirect to login
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Populate user info (for displaying the username)
    const userName = getUserNameFromToken(token);
    document.getElementById('user-name').innerText = userName;

    // Handle logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');  // Remove JWT token
        window.location.href = 'index.html';  // Redirect to login page
    });
});

// Decode JWT and extract role
function getUserRoleFromToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.role;
}

// Decode JWT and extract username
function getUserNameFromToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.name || 'Admin';
}
