document.addEventListener("DOMContentLoaded", function () {
    // Navbar Scroll Effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const navMenu = document.querySelector("nav ul");

    mobileMenuButton.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Hero Animation
    function animateHero() {
        document.querySelector(".hero h1").classList.add("visible");
        document.querySelector(".hero p").classList.add("visible");
        document.querySelectorAll(".cta-button").forEach(button => button.classList.add("visible"));
    }

    // Features Animation
    function animateFeatures() {
        const features = document.querySelectorAll(".feature-card");
        features.forEach((feature, index) => {
            setTimeout(() => feature.classList.add("visible"), index * 300);
        });
    }

    animateHero();
    animateFeatures();
});
