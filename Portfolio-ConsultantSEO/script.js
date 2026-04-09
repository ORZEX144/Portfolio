// ========== NAV SCROLL ==========
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
}, { passive: true });

// ========== STICKY MOBILE CTA ==========
const stickyCta = document.getElementById('stickyCta');
const heroSection = document.getElementById('hero');
const footerEl = document.querySelector('footer');

window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const footerTop = footerEl.getBoundingClientRect().top;
    if (heroBottom < 0 && footerTop > window.innerHeight) {
        stickyCta.classList.add('visible');
    } else {
        stickyCta.classList.remove('visible');
    }
}, { passive: true });

// ========== MOBILE NAV ==========
function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('active');
}

// ========== SCROLL REVEAL ==========
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate progress bars
            const bars = entry.target.querySelectorAll('.progress-fill');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .section-label').forEach(el => {
    observer.observe(el);
});

// ========== COUNT-UP ANIMATION ==========
function animateCount(el, target, suffix = '', prefix = '+') {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out expo
        const eased = 1 - Math.pow(2, -10 * progress);
        const current = Math.round(eased * target);

        el.textContent = prefix + current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Hero big number
const heroNumber = document.querySelector('.hero-big-number');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(heroNumber, 312, '%', '+');
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
heroObserver.observe(heroNumber);

// Mini stats
document.querySelectorAll('.mini-stat-value').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(el, target, suffix, '');
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statObserver.observe(el);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
