document.addEventListener("DOMContentLoaded", function () {
    // Toggle sidebar menu
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    menuToggle.addEventListener("click", function () {
        sidebar.style.transform = sidebar.style.transform === "translateX(0px)" ? "translateX(-100%)" : "translateX(0px)";
    });

    // Create the category distribution chart
    const categoryChartCtx = document.getElementById("categoryChart").getContext("2d");
    const categoryChart = new Chart(categoryChartCtx, {
        type: "pie",
        data: {
            labels: ["Aluminium", "Copper", "Steel", "Plastic", "Wood"],
            datasets: [{
                label: "Item Categories",
                data: [45, 25, 15, 10, 5], // Data simulating inventory distribution
                backgroundColor: ["#FF6600", "#3366FF", "#66CC66", "#FFCC00", "#FF3366"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        }
    });

    // Create the monthly sales trend chart
    const salesChartCtx = document.getElementById("salesChart").getContext("2d");
    const salesChart = new Chart(salesChartCtx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Monthly Sales",
                data: [50, 60, 80, 70, 90, 110, 130, 140, 150, 170, 180, 200], // Simulated sales data
                borderColor: "#FF6600",
                backgroundColor: "rgba(255, 102, 0, 0.2)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Populate the top selling items table dynamically
    const salesTableBody = document.querySelector("#sales-table tbody");

    const topSellingItems = [
        { name: "Aluminium Sheets", sold: 200, stockRemaining: 100, revenue: "$5000" },
        { name: "Copper Wires", sold: 150, stockRemaining: 50, revenue: "$4000" },
        { name: "Steel Bars", sold: 120, stockRemaining: 80, revenue: "$3500" },
        { name: "Plastic Sheets", sold: 90, stockRemaining: 60, revenue: "$2500" },
        { name: "Wood Planks", sold: 60, stockRemaining: 40, revenue: "$1500" },
        { name: "Aluminium Pipes", sold: 110, stockRemaining: 90, revenue: "$3000" },
        { name: "Copper Plates", sold: 85, stockRemaining: 40, revenue: "$2200" },
        { name: "Steel Coils", sold: 130, stockRemaining: 60, revenue: "$4000" },
        { name: "Plastic Pipes", sold: 75, stockRemaining: 50, revenue: "$1800" },
        { name: "Wooden Beams", sold: 40, stockRemaining: 30, revenue: "$1200" }
    ];

    topSellingItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.sold}</td>
            <td>${item.stockRemaining}</td>
            <td>${item.revenue}</td>
        `;
        salesTableBody.appendChild(row);
    });
});
