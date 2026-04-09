// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

mobileToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// Mobile sticky CTA
const stickyCta = document.getElementById('stickyMobileCta');
if (stickyCta) {
    window.addEventListener('scroll', () => {
        stickyCta.classList.toggle('visible', window.scrollY > 600);
    });
}

// Scroll reveal with stagger
const reveals = document.querySelectorAll('.reveal');
let revealIndex = 0;
reveals.forEach(el => el.dataset.revealIndex = revealIndex++);
const observer = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), delay);
            delay += 80;
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));
