document.addEventListener("DOMContentLoaded", function () {
    const welcomePage = document.getElementById('welcome-page');
    const mainContent = document.getElementById('main-content');
    const enterButton = document.getElementById('enter-btn');

    // Transisi halaman masuk
    enterButton.addEventListener('click', function () {
        welcomePage.style.opacity = '0';
        setTimeout(() => {
            welcomePage.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                setupObservers();
            }, 50);
        }, 1000);
    });

    // Intersection Observer untuk animasi saat scrolling
    function setupObservers() {
        const sectionsToAnimate = document.querySelectorAll('.animated-section');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // Fungsi untuk menandai menu aktif saat scrolling
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - navbarHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.href.includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Fungsi autoscroll saat klik menu
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: "smooth"
            });
        });
    });

    // Kode untuk Grafik (Chart.js)
    const ctx = document.getElementById('wasteChart');

    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Sampah Terolah (ton)',
                    data: [1200, 1500, 1800, 2200, 2500],
                    backgroundColor: 'rgba(0, 123, 255, 0.7)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
});