document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
});

async function handleLogin(event) {
    event.preventDefault();

    const companyCode = document.getElementById("companyCode").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitButton = document.querySelector(".btn");

    if (!companyCode || !password) {
        showAlert("Please enter both company code and password.", "error");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";

    try {
        const response = await fetch("http://localhost:5001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ company_code: companyCode, password })
        });

        const data = await response.json();

        if (response.ok) {
            showAlert("Login successful! Redirecting...", "success");

            // Store token in localStorage
            localStorage.setItem("token", data.token);

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1500);
        } else {
            showAlert(data.error || "Login failed. Try again.", "error");
        }
    } catch (error) {
        showAlert("Server error. Please try again later.", "error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Login";
    }
}

// Function to show alerts
function showAlert(message, type) {
    let alertBox = document.createElement("div");
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
