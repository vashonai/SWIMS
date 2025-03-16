document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();

    const companyName = document.getElementById("companyName").value.trim();
    const companyCode = document.getElementById("companyCode").value.trim();
    const emailVerification = document.getElementById("emailVerification").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitButton = document.querySelector(".btn");

    // Email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation Checks
    if (!companyName) {
        showAlert("Please enter your company name.", "error");
        return;
    }

    if (!companyCode) {
        showAlert("Please enter a valid company code.", "error");
        return;
    }

    if (!emailPattern.test(emailVerification)) {
        showAlert("Please enter a valid email address.", "error");
        return;
    }

    if (password.length < 6) {
        showAlert("Password must be at least 6 characters long.", "error");
        return;
    }

    // Disable button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";

    showAlert(`Welcome, ${companyName}! Registration successful.`, "success");

    // Simulate form submission delay for UX improvement
    setTimeout(() => {
        window.location.href = "dashboard.html"; // Redirect to dashboard
    }, 2000);
}

// Function to show custom alerts
function showAlert(message, type) {
    let alertBox = document.createElement("div");
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
