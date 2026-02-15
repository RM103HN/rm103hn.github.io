/* ═══════════════════════════════════════════════════════
   RITIK MOREY — PORTFOLIO JS
   Navbar scroll, fade-in animations, lightbox
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Scroll-triggered fade-in ──
    const fadeTargets = document.querySelectorAll(
        '.project-card, .contact-links, .contact-text, .section-title, .section-divider'
    );
    fadeTargets.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeTargets.forEach(el => observer.observe(el));

    // ── Lightbox for screenshots ──
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <img src="" alt="Screenshot preview" />
  `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });

    // ── Smooth scroll for nav links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
