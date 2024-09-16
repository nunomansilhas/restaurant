document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Set the username in the navbar
    const userName = getUserNameFromToken(token);
    document.getElementById('user-name').innerText = userName;

    // Handle Logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
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
