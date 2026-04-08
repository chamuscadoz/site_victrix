// ── Nav scroll state ──
const nav = document.getElementById('nav');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
    ticking = true;
  }
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// ── Custom cursor (desktop only) ──
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');
  let cx = 0, cy = 0, px = 0, py = 0;
  
  document.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
  });
  
  function animateCursor() {
    px += (cx - px) * 0.15;
    py += (cy - py) * 0.15;
    cursor.style.left = px + 'px';
    cursor.style.top = py + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('[data-hover], a, button, .btn-lime, .btn-ghost').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');
}
