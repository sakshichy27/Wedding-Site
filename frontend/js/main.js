// Main site JS: mobile nav, smooth scroll, reveal animations
const toggleNav = () => {
  const mobile = document.querySelector('.mobile-nav');
  if (!mobile) return;
  mobile.classList.toggle('open');
};

// Close mobile nav when clicking a link
const closeMobileNav = () => document.querySelector('.mobile-nav')?.classList.remove('open');

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-toggle');
  if (button) button.addEventListener('click', toggleNav);
  document.querySelectorAll('.mobile-nav a').forEach(a=>a?.addEventListener('click', closeMobileNav));

  // Smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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
