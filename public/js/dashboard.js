// Sample data for the chart
const data = {
    labels: ['Aluminium Sheets', 'Aluminium Rods', 'Aluminium Foil', 'Aluminium Ingots', 'Aluminium Cans', 
             'Aluminium Wires', 'Aluminium Billets', 'Aluminium Plates', 'Aluminium Extrusions', 'Aluminium Scrap'],
    datasets: [{
        label: 'Items Sold',
        data: [150, 120, 80, 60, 50, 90, 70, 100, 130, 140],  // Example sales data for each item
        backgroundColor: 'rgba(255, 99, 132, 0.2)',  // Color for the bars
        borderColor: 'rgba(255, 99, 132, 1)',  // Border color for the bars
        borderWidth: 1
    }]
};

// Chart options
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',  // Position of the legend
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;  // Custom tooltip display
                }
            }
        }
    },
    scales: {
        x: {
            beginAtZero: true
        },
        y: {
            beginAtZero: true
        }
    }
};

// Initialize the chart
window.onload = function () {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    const inventoryChart = new Chart(ctx, {
        type: 'bar',  // Bar chart type
        data: data,  // Pass the data
        options: options  // Pass the options
    });
}
