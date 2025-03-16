document.addEventListener("DOMContentLoaded", function () {
    // Handle password change form submission
    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Simulate password change
        alert("Password successfully changed!");
    });

    // Handle email preferences form submission
    const emailForm = document.getElementById('emailForm');
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailNotifications = document.getElementById('email-notifications').checked;

        // Simulate saving email preferences
        alert(emailNotifications ? "Email notifications enabled!" : "Email notifications disabled!");
    });

    // Handle theme selection
    const themeSelect = document.getElementById('theme-select');
    themeSelect.addEventListener('change', function () {
        const selectedTheme = themeSelect.value;
        document.body.className = selectedTheme;
        alert(`Theme switched to ${selectedTheme}`);
    });
});
