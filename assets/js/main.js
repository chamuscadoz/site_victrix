// Team carousel
(function () {
  const carousel  = document.getElementById('team-carousel');
  if (!carousel) return;
  const track     = carousel.querySelector('.carousel-track');
  const items     = Array.from(track.querySelectorAll('.partner'));
  const prevBtn   = carousel.querySelector('.carousel-prev');
  const nextBtn   = carousel.querySelector('.carousel-next');
  const dotsWrap  = carousel.querySelector('.carousel-dots');
  const GAP       = 32;
  let page        = 0;

  function perPage() { return window.innerWidth >= 768 ? 3 : 1; }
  function totalPages() { return Math.ceil(items.length / perPage()); }

  function translateX() {
    const pp = perPage();
    const itemW = (carousel.offsetWidth - GAP * (pp - 1)) / pp;
    return page * (itemW + GAP) * pp;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalPages(); i++) {
      const btn = document.createElement('button');
      btn.className = 'dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', 'Página ' + (i + 1));
      btn.addEventListener('click', () => { page = i; render(); });
      dotsWrap.appendChild(btn);
    }
  }

  function render() {
    track.style.transform = `translateX(-${translateX()}px)`;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === page));
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page >= totalPages() - 1;
  }

  prevBtn.addEventListener('click', () => { if (page > 0) { page--; render(); } });
  nextBtn.addEventListener('click', () => { if (page < totalPages() - 1) { page++; render(); } });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { page = 0; buildDots(); render(); }, 150);
  });

  buildDots();
  render();
})();

// Nav scroll
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

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Custom cursor (desktop)
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.getElementById('cursor');
  let cx = 0, cy = 0, px = 0, py = 0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
  (function loop() {
    px += (cx - px) * 0.15;
    py += (cy - py) * 0.15;
    cursor.style.left = px + 'px';
    cursor.style.top = py + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('[data-hover], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');
}
