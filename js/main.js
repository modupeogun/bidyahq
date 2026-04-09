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
  const forceDark = nav && nav.classList.contains('nav--force-dark');
  let lastScroll = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60 || forceDark) {
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

  // --- Dropdown click toggle ---
  document.querySelectorAll('.nav__dropdown').forEach((dropdown) => {
    const trigger = dropdown.querySelector('.nav__dropdown-trigger');
    const menu = dropdown.querySelector('.nav__dropdown-menu');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('nav__dropdown--open');
        trigger.setAttribute('aria-expanded', isOpen);
      });
    }

    // Close after clicking a link inside the menu
    if (menu) {
      menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          dropdown.classList.remove('nav__dropdown--open');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav__dropdown--open').forEach((d) => {
      d.classList.remove('nav__dropdown--open');
      const t = d.querySelector('.nav__dropdown-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Playbook category tab filtering ---
  const categoryTabs = document.querySelectorAll('.category-tab');
  const resourceCards = document.querySelectorAll('.resource-card');

  if (categoryTabs.length && resourceCards.length) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Update active tab
        categoryTabs.forEach((t) => t.classList.remove('category-tab--active'));
        tab.classList.add('category-tab--active');

        const category = tab.textContent.trim().toLowerCase();

        resourceCards.forEach((card) => {
          const tag = card.querySelector('.resource-card__tag');
          const cardCategory = tag ? tag.textContent.trim().toLowerCase() : '';

          if (category === 'all' || cardCategory === category) {
            card.style.display = '';
            // Re-trigger animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 300ms ease, transform 300ms ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
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
