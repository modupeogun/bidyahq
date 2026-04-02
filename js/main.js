/* ============================================
   Bidya — Main JS
   ============================================ */

(function () {
  'use strict';

  // --- Scroll-triggered animations ---
  const animateElements = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll('.animate-in'))
            : [];
          const index = siblings.indexOf(entry.target);
          const delay = index >= 0 ? index * 60 : 0;

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animateElements.forEach((el) => observer.observe(el));

  // --- Navbar scroll state ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('mobile-menu--open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Hero staggered load ---
  window.addEventListener('load', () => {
    const heroItems = document.querySelectorAll('.hero .animate-in');
    heroItems.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 100);
    });
  });
})();
