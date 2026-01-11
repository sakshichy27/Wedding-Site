// Main site JS: mobile nav, smooth scroll, reveal animations
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  // Mobile nav toggle (hamburger)
  const toggleNav = () => {
    if (!nav || !button) return;
    const isOpen = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  if (button) {
    button.addEventListener('click', toggleNav);
  }

  // Close nav when clicking a link (on mobile)
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      nav?.classList.remove('open');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for nav anchors (same-page links)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      // Only intercept if it's a real in-page anchor (not just "#" or external)
      if (!href || href.length <= 1) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Simple reveal on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // (Removed modal invite playback to avoid duplicate video bar at the bottom)
});
