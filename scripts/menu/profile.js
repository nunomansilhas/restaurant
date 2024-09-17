document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token is being retrieved

    if (!token) {
        window.location.href = 'index.html'; // Redirect if not logged in
        return;
    }

    // Fetch and populate profile data
    await fetchUserProfile(token);

    // Profile update form submission (Name and Email)
    const saveProfileBtn = document.getElementById('saveProfile');
    if (saveProfileBtn) {
        console.log('Attaching saveProfile listener');
        saveProfileBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);

            try {
                const response = await fetch('http://localhost:3000/api/user/update', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData
                });

                if (response.ok) {
                    await showSuccessAlert('Profile updated successfully');
                    window.location.reload(); // Refresh the page after success
                } else {
                    const errorData = await response.json();
                    showErrorAlert('Error updating profile: ' + errorData.message);
                }
            } catch (error) {
                showErrorAlert('Error updating profile');
                console.error('Error updating profile:', error);
            }
        });
    }

    // Profile picture update
    const saveProfilePicBtn = document.getElementById('saveProfilePic');
    if (saveProfilePicBtn) {
        console.log('Attaching saveProfilePic listener');
        saveProfilePicBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            const profilePic = document.getElementById('profilePicInput').files[0]; // Get selected file

            if (!profilePic) {
                showErrorAlert('Please select a picture to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('profilePic', profilePic); // Append the profile picture

            try {
                const response = await fetch('http://localhost:3000/api/user/update', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData // FormData for file uploads
                });

                if (response.ok) {
                    await showSuccessAlert('Profile picture updated successfully');
                    window.location.reload(); // Refresh the page after success
                } else {
                    const errorData = await response.json();
                    showErrorAlert('Error updating profile picture: ' + errorData.message);
                }
            } catch (error) {
                showErrorAlert('Error updating profile picture');
                console.error('Error updating profile picture:', error);
            }
        });
    }

    // Password update form submission
    const savePasswordBtn = document.getElementById('savePassword');
    if (savePasswordBtn) {
        console.log('Attaching savePassword listener');
        savePasswordBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;

            if (!currentPassword || !newPassword) {
                showErrorAlert('Please enter both current and new passwords.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/user/update', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        currentPassword,
                        newPassword,
                    }),
                });

                if (response.ok) {
                    await showSuccessAlert('Password updated successfully');
                    window.location.reload(); // Refresh the page after success
                } else {
                    const errorData = await response.json();
                    showErrorAlert('Error updating password: ' + errorData.message);
                }
            } catch (error) {
                showErrorAlert('Error updating password');
                console.error('Error updating password:', error);
            }
        });
    }

    // SweetAlert2 for Success Notification
    async function showSuccessAlert(message) {
        return Swal.fire({
            title: 'Success',
            text: message,
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true
        });
    }

    // SweetAlert2 for Error Notification
    function showErrorAlert(message) {
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    // Fetch user profile data
    async function fetchUserProfile(token) {
        try {
            const response = await fetch('http://localhost:3000/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                document.getElementById('name').value = data.name;
                document.getElementById('email').value = data.email;

                const profilePic = data.profilePic ? `${data.profilePic}` : 'img/undraw_profile.svg';
                document.getElementById('profile-pic').src = profilePic;
            } else {
                console.error('Error fetching profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }
});
