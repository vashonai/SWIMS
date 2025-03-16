// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("More Info page loaded successfully!");

    // Smooth scrolling for navigation links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Close mobile menu on link click
                if (document.body.classList.contains("nav-open")) {
                    document.body.classList.remove("nav-open");
                }
            }
        });
    });

    // Reveal animations on scroll (optimized with debounce)
    const revealElements = document.querySelectorAll(".info-box, .benefit-box, .cta");

    function revealOnScroll() {
        let windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            let elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                el.classList.add("visible");
            }
        });
    }

    // Debounced scroll event listener for performance
    let scrollTimeout;
    function debounceReveal() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(revealOnScroll, 50);
    }

    window.addEventListener("scroll", debounceReveal);
    revealOnScroll(); // Run once on page load

    // CTA button hover effect with animation
    const ctaButton = document.querySelector(".cta-button");
    if (ctaButton) {
        ctaButton.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease";
        });

        ctaButton.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
        });
    }

    // Mobile navigation toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            document.body.classList.toggle("nav-open");
            navLinks.classList.toggle("active");
        });
    }
});
