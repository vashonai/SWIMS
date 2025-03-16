document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
});

async function handleLogin(event) {
    event.preventDefault();

    const companyCode = document.getElementById("companyCode").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitButton = document.querySelector(".btn");

    // Validate company code and password
    if (!companyCode) {
        showAlert("Please enter your company code.", "error");
        return;
    }

    if (!password) {
        showAlert("Please enter your password.", "error");
        return;
    }

    // Disable button to prevent multiple submissions
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";

    try {
        // Make an API call to your backend for login validation
        const response = await fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ companyCode, password })
        });

        const data = await response.json();

        if (response.status === 200) {
            showAlert(data.message, "success");

            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } else {
            showAlert(data.message, "error");
            submitButton.disabled = false;
            submitButton.textContent = "Login";
        }
    } catch (err) {
        showAlert("An error occurred. Please try again.", "error");
        submitButton.disabled = false;
        submitButton.textContent = "Login";
    }
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
