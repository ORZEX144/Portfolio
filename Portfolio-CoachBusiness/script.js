        /* Navigation scroll effect */
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 60) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
            lastScroll = scrollY;
        }, { passive: true });

        /* Mobile menu */
        const menuBtn = document.querySelector('.nav__menu-btn');
        const mobileMenu = document.querySelector('.nav__mobile');
        const mobileClose = document.querySelector('.nav__mobile-close');
        const mobileLinks = mobileMenu.querySelectorAll('a');

        function openMenu() {
            mobileMenu.classList.add('active');
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', openMenu);
        mobileClose.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

        /* Scroll reveal with IntersectionObserver */
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(el => observer.observe(el));

        /* Sticky mobile CTA */
        const stickyCta = document.querySelector('.sticky-cta');
        const heroSection = document.querySelector('.hero');
        const ctaFinal = document.querySelector('.cta-final');

        if (stickyCta && heroSection && ctaFinal) {
            const stickyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.target === heroSection) {
                        if (!entry.isIntersecting) {
                            stickyCta.classList.add('visible');
                        } else {
                            stickyCta.classList.remove('visible');
                        }
                    }
                    if (entry.target === ctaFinal) {
                        if (entry.isIntersecting) {
                            stickyCta.classList.remove('visible');
                        }
                    }
                });
            }, { threshold: 0.1 });

            stickyObserver.observe(heroSection);
            stickyObserver.observe(ctaFinal);
        }
