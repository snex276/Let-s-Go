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

document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    autoSlide();

    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    // Set CSS variable for mobile menu top offset (accounts for fixed header)
    function updateMobileMenuOffset() {
        const header = document.querySelector('header');
        // Use header bottom so menu starts below header even if header is not at top 0
        const offset = header ? Math.round(header.getBoundingClientRect().bottom) : 72;
        document.documentElement.style.setProperty('--mobile-menu-top', offset + 'px');
    }
    updateMobileMenuOffset();
    window.addEventListener('resize', updateMobileMenuOffset);

    const closeMenu = () => {
        if (mobileToggle) {
            mobileToggle.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        }
        if (mobileMenu) {
            document.body.classList.remove('nav-open');
                // Re-enable body scroll when menu is closed
                document.body.style.overflow = '';
                document.body.style.overflowX = '';
        }
        submenuToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
            const submenuId = toggle.getAttribute('aria-controls');
            const submenu = submenuId ? document.getElementById(submenuId) : null;
            if (submenu) {
                submenu.classList.remove('show');
            }
        });
    };

    const toggleMenu = () => {
        if (!mobileToggle || !mobileMenu) return;

        const isOpen = mobileToggle.classList.toggle('open');
        document.body.classList.toggle('nav-open', isOpen);
        // When the menu is open, lock body scroll and let the menu scroll internally
        document.body.style.overflow = isOpen ? 'hidden' : '';
        document.body.style.overflowX = isOpen ? 'hidden' : '';
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        document.addEventListener('click', (event) => {
            const nav = document.querySelector('nav');
            if (!nav || nav.contains(event.target) || mobileToggle.contains(event.target)) {
                return;
            }
            if (document.body.classList.contains('nav-open')) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
                closeMenu();
            }
        });
    }

    const handleSubmenuToggle = (event, toggle) => {
        event.preventDefault();
        event.stopPropagation();

        const submenuId = toggle.getAttribute('aria-controls');
        const submenu = submenuId ? document.getElementById(submenuId) : null;
        if (!submenu) return;

        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        submenuToggles.forEach((otherToggle) => {
            if (otherToggle !== toggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
                const otherId = otherToggle.getAttribute('aria-controls');
                const otherDropdown = otherId ? document.getElementById(otherId) : null;
                if (otherDropdown) {
                    otherDropdown.classList.remove('show');
                }
            }
        });

        toggle.setAttribute('aria-expanded', String(!isExpanded));
        submenu.classList.toggle('show', !isExpanded);
        // If opening, ensure the submenu is visible inside the scrollable mobile menu
        if (!isExpanded) {
            setTimeout(() => {
                if (submenu && mobileMenu) {
                    const mobileRect = mobileMenu.getBoundingClientRect();
                    const submenuRect = submenu.getBoundingClientRect();
                    const offsetTop = submenuRect.top - mobileRect.top + mobileMenu.scrollTop - 8;
                    mobileMenu.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }, 260);
        }
    };

    submenuToggles.forEach((toggle) => {
        toggle.addEventListener('click', (event) => handleSubmenuToggle(event, toggle));
        toggle.addEventListener('touchstart', (event) => handleSubmenuToggle(event, toggle));
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            const isSubmenuToggle = link.classList.contains('submenu-toggle');
            if (isSubmenuToggle) {
                event.preventDefault();
                return;
            }
            closeMenu();
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Ignore bare hash links and submenu toggles
        if (href === '#' || this.classList.contains('submenu-toggle')) {
            return;
        }
        // Don't prevent default for modal links/closes
        if (href === '#privacy-policy' || href === '#terms-conditions' || this.classList.contains('modal-close')) {
            return;
        }

        e.preventDefault();
        let target = null;
        try {
            target = document.querySelector(href);
        } catch (error) {
            target = null;
        }
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

// Form submission handling (guarded)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields.');
            return;
        }

        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

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


