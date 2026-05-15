document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.dataset.animation) {
                    entry.target.classList.add(entry.target.dataset.animation);
                }
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Special Offer Popup ---
    const popup = document.getElementById('special-offer-popup');
    const closePopup = document.querySelector('.popup-close');
    const popupBtn = document.querySelector('.popup-content .btn');

    // Show popup after 3 seconds if not shown this session
    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            popup.classList.add('active');
        }, 3000);
    }

    function hidePopup() {
        popup.classList.remove('active');
        sessionStorage.setItem('popupShown', 'true');
    }

    if (closePopup) closePopup.addEventListener('click', hidePopup);
    if (popupBtn) popupBtn.addEventListener('click', hidePopup);
    
    // Close on overlay click
    popup.addEventListener('click', (e) => {
        if (e.target === popup) hidePopup();
    });

    // --- Active Link Highlighting ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-item');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Mobile Bottom Nav Feedback ---
    // (Optional: add haptic-like scale effect)
    const mobileItems = document.querySelectorAll('.mobile-nav-item');
    mobileItems.forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = 'scale(0.95)';
        });
        item.addEventListener('touchend', () => {
            item.style.transform = 'scale(1)';
        });
    });
});
