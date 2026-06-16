document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            if (isVisible) {
                navLinks.style.display = 'none';
                menuToggle.textContent = '☰';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--bg)';
                navLinks.style.padding = '32px 24px';
                navLinks.style.gap = '20px';
                navLinks.style.boxShadow = 'var(--shadow-md)';
                menuToggle.textContent = '✕';
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                navLinks.removeAttribute('style');
                menuToggle.textContent = '☰';
            }
        });
    }

    // Intersection Observer for scroll animations (fade-up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.position = 'fixed';
            navbar.style.padding = '16px 0';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navbar.style.position = 'absolute';
            navbar.style.padding = '24px 0';
        }
    });
});
