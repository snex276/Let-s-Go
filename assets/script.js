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

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    autoSlide();
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

    modal.style.display = "flex";

    video.play();
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("myVideo");

    modal.style.display = "none";
    document.body.style.overflow = "auto"; // enable scroll

    video.pause();
    video.currentTime = 0;
}
