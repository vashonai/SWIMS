document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const searchBar = document.getElementById("search-bar");
    const inventoryTable = document.querySelector(".inventory-table tbody");
    
    // Filter inventory based on search input
    searchBtn.addEventListener("click", function () {
        const searchText = searchBar.value.toLowerCase();
        const rows = inventoryTable.querySelectorAll("tr");
        
        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const itemName = cells[0].textContent.toLowerCase();
            const categoryName = cells[1].textContent.toLowerCase();
            
            if (itemName.includes(searchText) || categoryName.includes(searchText)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    // Add item button functionality (just a placeholder for now)
    const addItemBtn = document.getElementById("add-item-btn");
    addItemBtn.addEventListener("click", function () {
        alert("Add item functionality goes here!");
    });

    // Toggle sidebar menu for mobile view
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    menuToggle.addEventListener("click", function () {
        sidebar.style.transform = sidebar.style.transform === "translateX(0px)" ? "translateX(-100%)" : "translateX(0px)";
    });
});
