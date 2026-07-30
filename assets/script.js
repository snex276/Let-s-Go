// Carousel functionality
let slideIndex = 1;
let slideTimer;

function showSlides(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex += n);
    autoSlide();
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex = n);
    autoSlide();
}

function autoSlide() {
    slideTimer = setTimeout(() => {
        slideIndex++;
        showSlides(slideIndex);
        autoSlide();
    }, 5000); // Change slide every 5 seconds
}

// Initialize carousel on Transport page load
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    autoSlide();

    const TransportServicesBtn = document.getElementById('TransportServicesBtn');
    const transportDropdown = document.getElementById('TransportSDropdown');

    if (TransportServicesBtn && transportDropdown) {
        TransportServicesBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isMobile && !document.body.classList.contains('nav-open')) {
                document.body.classList.add('nav-open');
            }

            transportDropdown.classList.toggle('show');
            TransportServicesBtn.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!TransportServicesBtn.contains(e.target) && !transportDropdown.contains(e.target)) {
                transportDropdown.classList.remove('show');
                TransportServicesBtn.classList.remove('active');
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                transportDropdown.classList.remove('show');
                TransportServicesBtn.classList.remove('active');
            }
        });
    }

    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.type = 'button';
        menuToggle.innerText = '☰ Menu';
        menuToggle.setAttribute('aria-label', 'Toggle navigation');
        headerContainer.insertBefore(menuToggle, headerContainer.children[1]);

        menuToggle.addEventListener('click', function () {
            document.body.classList.toggle('nav-open');
            menuToggle.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            const nav = document.querySelector('nav');
            if (nav && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                document.body.classList.remove('nav-open');
                menuToggle.classList.remove('open');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function () {
                if (this.id === 'TransportServicesBtn') {
                    return;
                }
                document.body.classList.remove('nav-open');
                menuToggle.classList.remove('open');
            });
        });
    }
});

// Initialize carousel on Tours page load
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    autoSlide();

    const ToursServicesBtn = document.getElementById('ToursServicesBtn');
    const toursDropdown = document.getElementById('ToursSDropdown');

    if (ToursServicesBtn && toursDropdown) {
        ToursServicesBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isMobile && !document.body.classList.contains('nav-open')) {
                document.body.classList.add('nav-open');
            }

            toursDropdown.classList.toggle('show');
            ToursServicesBtn.classList.toggle('active');
        });

        document.addEventListener('click', function (e) {
            if (!ToursServicesBtn.contains(e.target) && !toursDropdown.contains(e.target)) {
                toursDropdown.classList.remove('show');
                ToursServicesBtn.classList.remove('active');
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                toursDropdown.classList.remove('show');
                ToursServicesBtn.classList.remove('active');
            }
        });
    }

    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.type = 'button';
        menuToggle.innerText = '☰ Menu';
        menuToggle.setAttribute('aria-label', 'Toggle navigation');
        headerContainer.insertBefore(menuToggle, headerContainer.children[1]);

        menuToggle.addEventListener('click', function () {
            document.body.classList.toggle('nav-open');
            menuToggle.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            const nav = document.querySelector('nav');
            if (nav && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                document.body.classList.remove('nav-open');
                menuToggle.classList.remove('open');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function () {
                if (this.id === 'ToursServicesBtn') {
                    return;
                }
                document.body.classList.remove('nav-open');
                menuToggle.classList.remove('open');
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Don't prevent default for modal links/closes
        const href = this.getAttribute('href');
        if (href === '#privacy-policy' || href === '#terms-conditions' || this.classList.contains('modal-close')) {
            // Allow default action for modal navigation
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target && !target.classList.contains('modal')) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal close button functionality
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = this.closest('.modal');
        if (modal) {
            window.location.hash = '';
        }
    });
});

// Close modal when clicking outside the modal content
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            window.location.hash = '';
        }
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all fields.');
        return;
    }

    // In a real application, you would send this data to a server
    // For now, just show a success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    this.reset();
});

// Add some animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});




function openVideo() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("myVideo");

    if (!modal || !video) {
        return;
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    video.currentTime = 0;
    video.play();
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("myVideo");

    if (!modal || !video) {
        return;
    }

    modal.style.display = "none";
    document.body.style.overflow = "auto"; // enable scroll

    video.pause();
    video.currentTime = 0;
}


