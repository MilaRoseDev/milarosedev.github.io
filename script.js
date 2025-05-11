// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your backend
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-level');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
};

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Project Detail Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all project detail buttons
    const detailButtons = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.project-details-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Function to open modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    // Function to close modal
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Add click event listeners to detail buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Add click event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-details-modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
});

// Pull to Refresh Implementation
document.addEventListener('DOMContentLoaded', function() {
    const pullToRefresh = document.createElement('div');
    pullToRefresh.className = 'pull-to-refresh';
    pullToRefresh.innerHTML = '<div class="pull-to-refresh-spinner"></div>';
    document.body.appendChild(pullToRefresh);

    const pullIndicator = document.createElement('div');
    pullIndicator.className = 'pull-indicator';
    pullIndicator.textContent = 'Pull down to refresh';
    document.body.appendChild(pullIndicator);

    let startY = 0;
    let pullDistance = 0;
    const threshold = 60;
    let isPulling = false;
    let isRefreshing = false;

    // Touch events for mobile
    document.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0 && !isRefreshing) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    });

    document.addEventListener('touchmove', function(e) {
        if (!isPulling || isRefreshing) return;

        pullDistance = e.touches[0].clientY - startY;
        
        if (pullDistance > 0) {
            e.preventDefault();
            pullToRefresh.style.transform = `translateY(${Math.min(pullDistance, threshold)}px)`;
            
            if (pullDistance > threshold) {
                pullIndicator.textContent = 'Release to refresh';
            } else {
                pullIndicator.textContent = 'Pull down to refresh';
            }
            
            pullIndicator.classList.add('visible');
        }
    });

    document.addEventListener('touchend', function() {
        if (!isPulling || isRefreshing) return;

        if (pullDistance > threshold) {
            refreshContent();
        } else {
            resetPull();
        }
    });

    // Mouse events for desktop testing
    document.addEventListener('mousedown', function(e) {
        if (window.scrollY === 0 && !isRefreshing) {
            startY = e.clientY;
            isPulling = true;
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (!isPulling || isRefreshing) return;

        pullDistance = e.clientY - startY;
        
        if (pullDistance > 0) {
            pullToRefresh.style.transform = `translateY(${Math.min(pullDistance, threshold)}px)`;
            
            if (pullDistance > threshold) {
                pullIndicator.textContent = 'Release to refresh';
            } else {
                pullIndicator.textContent = 'Pull down to refresh';
            }
            
            pullIndicator.classList.add('visible');
        }
    });

    document.addEventListener('mouseup', function() {
        if (!isPulling || isRefreshing) return;

        if (pullDistance > threshold) {
            refreshContent();
        } else {
            resetPull();
        }
    });

    function refreshContent() {
        isRefreshing = true;
        pullToRefresh.classList.add('active');
        pullIndicator.classList.remove('visible');

        // Simulate content refresh
        setTimeout(function() {
            // Here you can add your actual refresh logic
            // For example, reloading data or refreshing the page
            window.location.reload();
            
            resetPull();
        }, 1500);
    }

    function resetPull() {
        isPulling = false;
        pullDistance = 0;
        pullToRefresh.style.transform = 'translateY(-100%)';
        pullIndicator.classList.remove('visible');
    }
});
