// Navigation scroll effect
const navbar = document.querySelector('.navbar');
const navMenus = document.querySelectorAll('.nav-menu');
const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenus.forEach(menu => {
            menu.classList.toggle('active');
        });
        hamburger.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navMenus.forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
});


// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 500;
    }
});

// Product cards hover effect
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        productCards.forEach((otherCard, otherIndex) => {
            if (otherIndex !== index) {
                otherCard.style.opacity = '0.5';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        productCards.forEach(card => {
            card.style.opacity = '1';
        });
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 1 ? ' ' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + ' ';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const target = parseInt(statNumber.getAttribute('data-target'));
                statNumber.classList.add('animated');
                animateCounter(statNumber, target);
            }

            // Timeline item activation
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease';
    observer.observe(stat);
});

document.querySelectorAll('.tech-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(item);
});

// Mouse move parallax effect for product cards
productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Tech items interactive effect
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.tech-icon');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'transform 0.6s ease';
    });

    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.tech-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Timeline scroll animation
let timelineItems = document.querySelectorAll('.timeline-item');
let currentStep = 1;

function updateTimeline() {
    timelineItems.forEach((item, index) => {
        if (index + 1 === currentStep) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Update timeline based on scroll
window.addEventListener('scroll', () => {
    const experienceSection = document.querySelector('#experience');
    if (experienceSection) {
        const rect = experienceSection.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.8)));
        currentStep = Math.ceil(scrollProgress * 3) || 1;
        updateTimeline();
    }
});

// Hero title word animation on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const words = document.querySelectorAll('.hero-title .word');
    
    if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollRatio = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        
        words.forEach((word, index) => {
            const speed = parseFloat(word.getAttribute('data-speed')) || 1;
            const offset = (1 - scrollRatio) * 100 * speed;
            word.style.transform = `translateX(${offset}px)`;
            word.style.opacity = scrollRatio;
        });
    }
});

// Cursor trail effect (optional enhancement)
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const optimizedScroll = debounce(() => {
    // Scroll-based animations are already handled by IntersectionObserver
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Product card click interaction
productCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
});


// Add ripple effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

console.log('🚀 Nike Reimagined - Just Do It Differently');

