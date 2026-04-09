// Team carousel — infinite · mouse-driven · physics
(function () {
  const carousel   = document.getElementById('team-carousel');
  if (!carousel) return;

  const track      = carousel.querySelector('.carousel-track');
  const hint       = carousel.querySelector('.carousel-hint');
  const thumb      = carousel.querySelector('.carousel-progress-thumb');
  const originals  = Array.from(track.querySelectorAll('.partner:not(.partner-clone)'));
  const N          = originals.length;
  const isFine     = window.matchMedia('(pointer: fine)').matches;
  const cursorEl   = document.getElementById('cursor');

  // Physics constants
  const MAX_VEL  = 4.2;   // px/frame at edges
  const LERP     = 0.052; // velocity acceleration smoothness
  const FRICTION = 0.91;  // coast-to-stop friction when mouse leaves

  // State
  let pos         = 0;
  let vel         = 0;
  let targetVel   = 0;
  let isOver      = false;
  let isDragging  = false;
  let dragStartX  = 0, dragStartPos = 0, prevDragX = 0, dragVel = 0;
  let hintDone    = false;
  let itemW       = 0, gap = 0, totalW = 0;

  /* ── Setup: measure + clone ── */
  function setup() {
    track.querySelectorAll('.partner-clone').forEach(c => c.remove());

    const W  = carousel.offsetWidth;
    const pp = W >= 900 ? 3 : W >= 560 ? 2 : 1;
    gap    = pp > 1 ? 32 : 0;
    itemW  = (W - gap * (pp - 1)) / pp;
    totalW = N * (itemW + gap);

    originals.forEach(el => {
      el.style.flex  = `0 0 ${itemW}px`;
      el.style.width = `${itemW}px`;
    });

    originals.forEach(el => {
      const clone = el.cloneNode(true);
      clone.classList.add('partner-clone');
      track.appendChild(clone);
      if (isFine && cursorEl) {
        clone.addEventListener('mouseenter', () => cursorEl.classList.add('hover'));
        clone.addEventListener('mouseleave', () => cursorEl.classList.remove('hover'));
      }
    });

    track.style.gap = `${gap}px`;
    pos = ((pos % totalW) + totalW) % totalW;
    commit();
  }

  /* ── Commit position to DOM ── */
  function commit() {
    const safe = ((pos % totalW) + totalW) % totalW;
    track.style.transform = `translateX(-${safe}px)`;
    if (thumb) thumb.style.left = `${(safe / totalW) * 72}px`; // 100px bar − 28px thumb
  }

  /* ── Mouse zone → velocity ── */
  carousel.addEventListener('mouseenter', () => { isOver = true; });
  carousel.addEventListener('mouseleave', () => { isOver = false; targetVel = 0; });

  carousel.addEventListener('mousemove', e => {
    if (isDragging) return;
    dismissHint();

    const { left, width } = carousel.getBoundingClientRect();
    const cx = ((e.clientX - left) / width) * 2 - 1; // −1 … +1
    const DEAD = 0.28;

    if (Math.abs(cx) < DEAD) {
      targetVel = 0;
    } else {
      const sign = Math.sign(cx);
      const t    = (Math.abs(cx) - DEAD) / (1 - DEAD); // 0 … 1 outside dead zone
      targetVel  = sign * t * t * MAX_VEL;              // quadratic — slow near centre, fast at edge
    }
  });

  /* ── Drag / touch ── */
  function startDrag(clientX) {
    isDragging  = true;
    dragStartX  = prevDragX = clientX;
    dragStartPos = pos;
    dragVel     = 0;
    dismissHint();
    if (isFine && cursorEl) cursorEl.classList.add('dragging');
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    dragVel  = prevDragX - clientX;
    prevDragX = clientX;
    pos = dragStartPos + (dragStartX - clientX);
    commit();
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    vel = dragVel * 1.5; // hand off momentum to physics
    if (isFine && cursorEl) cursorEl.classList.remove('dragging');
  }

  carousel.addEventListener('mousedown',  e => { startDrag(e.clientX); e.preventDefault(); });
  carousel.addEventListener('touchstart', e => startDrag(e.touches[0].clientX), { passive: true });
  window.addEventListener('mousemove',    e => moveDrag(e.clientX));
  window.addEventListener('touchmove',    e => moveDrag(e.touches[0].clientX), { passive: true });
  window.addEventListener('mouseup',  endDrag);
  window.addEventListener('touchend', endDrag);

  /* ── Hint ── */
  function dismissHint() {
    if (hintDone || !hint) return;
    hintDone = true;
    hint.classList.add('hidden');
  }

  /* ── RAF physics loop ── */
  function tick() {
    if (!isDragging) {
      vel += (targetVel - vel) * LERP;
      if (!isOver) vel *= FRICTION;
      if (Math.abs(vel) > 0.005) { pos += vel; commit(); }
    }
    requestAnimationFrame(tick);
  }

  /* ── Resize ── */
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(setup, 150);
  });

  setup();
  tick();
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
