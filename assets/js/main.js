// Team carousel — 3D coverflow · physics · auto-rotate
(function () {
  'use strict';

  var stage    = document.getElementById('team-carousel');
  if (!stage) return;
  var dotsBox  = document.getElementById('carousel-dots');
  var prevBtn  = document.getElementById('carousel-prev');
  var nextBtn  = document.getElementById('carousel-next');
  var hintEl   = document.getElementById('carousel-hint');
  var cursorEl = document.getElementById('cursor');
  var isFine   = window.matchMedia('(pointer: fine)').matches;

  var members = [
    {
      name: 'Gustavo Jesus',
      role: 'Sócio — Assessor de Investimentos',
      bio: '30 anos de experiência no mercado financeiro com passagem pelo JP Morgan. Engenheiro Politécnico e Mestre em Economia pela FGV, autor do livro "Investimentos: O Guia dos Céticos" Editora FGV.',
      img: 'assets/images/Slide_16_9__699.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(136,232,51,.1))'
    },
    {
      name: 'Guilherme Giron',
      role: 'Sócio — Assessor de Investimentos',
      bio: '20 anos de experiência no mercado financeiro com passagem pelo JP Morgan. Economista pela FEA-USP, Mestre em Economia pela FGV, monitor no mestrado da matéria de Investimentos.',
      img: 'assets/images/Slide_16_9__67.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(46,111,58,.28))'
    },
    {
      name: 'José Victor Cassiolato',
      role: 'Sócio — Assessor de Investimentos',
      bio: '20 anos de experiência no mercado financeiro. Certificação CGA (ANBIMA), passagem pelo JP Morgan. Economista com MBA em Desenv de Software Web pela UNIP, onde também atua como professor de IA.',
      img: 'assets/images/Slide_16_9__65.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(46,111,58,.32))'
    },
    {
      name: 'Marcio Marin',
      role: 'Desenvolvimento de Novos Negócios',
      bio: '30 anos de experiência no mercado financeiro - operações estruturadas no mercado de commodities. Formação em Gestão Ambiental e MBA em Inteligência Artificial. Atuando mais de uma década mercado de M&A (IGC Partner).',
      img: 'assets/images/Slide_16_9__66.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(136,232,51,.1))'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Assessor de Investimentos',
      bio: '5 anos de mercado financeiro. Graduando em Economia Política pela PUC-SP.',
      img: 'assets/images/Slide_16_9__68.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(46,111,58,.28))'
    },
    {
      name: 'Lucca Macieira',
      role: 'Assessor de Investimentos',
      bio: 'Graduando em dupla formação Economia e Administração de Empresas no INSPER.',
      img: 'assets/images/Slide_16_9__67.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(46,111,58,.32))'
    },
    {
      name: 'Victor Alcântara',
      role: 'Assessor de Investimentos',
      bio: 'Graduando em Economia na FAAP. Referência no programa VAI (Vire Assessor de Investimentos) organizado pela Melver, ABAI e o CIEE.',
      img: 'assets/images/Slide_16_9__699.png',
      grad: 'linear-gradient(170deg,rgba(14,28,14,.88),rgba(136,232,51,.1))'
    }
  ];

  var N    = members.length;
  var STEP = (2 * Math.PI) / N;

  // Build cards
  var cards = [];
  members.forEach(function (m) {
    var el = document.createElement('div');
    el.className = 'card-3d';
    el.innerHTML =
      '<div class="card-3d-body">' +
        '<div class="card-3d-img-wrap">' +
          '<div class="card-3d-img" style="background:' + m.grad + ',url(\'' + m.img + '\') center/cover no-repeat;"></div>' +
        '</div>' +
        '<div class="card-3d-content">' +
          '<div class="card-3d-name">' + m.name + '</div>' +
          '<div class="card-3d-role">' + m.role + '</div>' +
          '<div class="card-3d-sep"></div>' +
          '<div class="card-3d-bio">' + m.bio + '</div>' +
        '</div>' +
      '</div>';
    stage.appendChild(el);
    cards.push(el);
    // cursor hover
    if (isFine && cursorEl) {
      el.addEventListener('mouseenter', function () { cursorEl.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursorEl.classList.remove('hover'); });
    }
  });

  // Build dots
  var dots = [];
  members.forEach(function (_, i) {
    var d = document.createElement('button');
    d.className = 'dot-3d';
    d.setAttribute('aria-label', 'Membro ' + (i + 1));
    d.addEventListener('click', function () { goTo(i); });
    dotsBox.appendChild(d);
    dots.push(d);
  });

  // State
  var angle    = 0;
  var target   = 0;
  var dragVel  = 0;
  var dragging = false;
  var lastX    = 0, lastT = 0;
  var autoPlay = true;
  var autoTmr  = null;
  var hintGone = false;
  var cRect    = stage.getBoundingClientRect();

  function radius() {
    var w = cRect.width;
    if (w < 480) return 130;
    if (w < 700) return 200;
    if (w < 960) return 310;
    return 390;
  }

  function frontIdx() {
    var best = -99, bi = 0;
    for (var i = 0; i < N; i++) {
      var z = Math.cos(angle + i * STEP);
      if (z > best) { best = z; bi = i; }
    }
    return bi;
  }

  function render() {
    var r  = radius();
    var fi = frontIdx();
    for (var i = 0; i < N; i++) {
      var a     = angle + i * STEP;
      var sinA  = Math.sin(a);
      var cosA  = Math.cos(a);
      var depth = (cosA + 1) * 0.5;          // 0 = back, 1 = front
      var sc    = 0.50 + depth * 0.55;
      var op    = 0.10 + depth * 0.90;
      var ty    = (1 - depth) * 30;
      var tx    = Math.round(sinA * r);
      var blr   = depth < 0.35 ? (0.35 - depth) * 9 : 0;
      var zi    = Math.round(depth * 1000);
      var act   = (i === fi);

      cards[i].style.transform = 'translate3d(' + tx + 'px,' + Math.round(ty) + 'px,0) scale(' + sc.toFixed(3) + ')';
      cards[i].style.opacity   = op.toFixed(3);
      cards[i].style.zIndex    = zi;
      cards[i].style.filter    = blr > 0.3 ? 'blur(' + blr.toFixed(1) + 'px)' : 'none';
      cards[i].style.pointerEvents = depth > 0.65 ? 'auto' : 'none';
      cards[i].setAttribute('data-active', act ? 'true' : 'false');
    }
    dots.forEach(function (d, k) { d.classList.toggle('active', k === fi); });
  }

  function goTo(idx) {
    target   = -idx * STEP;
    autoPlay = false;
    reschedAuto();
    hideHint();
  }

  function reschedAuto() {
    clearTimeout(autoTmr);
    autoTmr = setTimeout(function () { autoPlay = true; }, 5000);
  }

  function hideHint() {
    if (hintGone || !hintEl) return;
    hintGone = true;
    hintEl.classList.add('hidden');
  }

  // RAF loop
  function tick() {
    if (autoPlay && !dragging) target -= 0.0032;
    var ease = dragging ? 0.20 : 0.062;
    angle += (target - angle) * ease;
    render();
    requestAnimationFrame(tick);
  }

  // Drag
  function onDown(e) {
    dragging = true; autoPlay = false;
    clearTimeout(autoTmr); hideHint();
    lastX = e.touches ? e.touches[0].clientX : e.clientX;
    lastT = performance.now(); dragVel = 0;
    if (isFine && cursorEl) cursorEl.classList.add('dragging');
  }
  function onMove(e) {
    if (!dragging) return;
    var x   = e.touches ? e.touches[0].clientX : e.clientX;
    var now = performance.now();
    var dt  = now - lastT;
    var dx  = x - lastX;
    if (dt > 0) dragVel = (dx / dt) * 2.2;
    target += dx * (3.2 / Math.max(cRect.width, 1));
    lastX = x; lastT = now;
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    target += dragVel * 0.65;
    // snap to nearest card after momentum settles
    setTimeout(function () {
      var ni = Math.round(-target / STEP);
      ni = ((ni % N) + N) % N;
      target = -ni * STEP;
    }, 680);
    reschedAuto();
    if (isFine && cursorEl) cursorEl.classList.remove('dragging');
  }

  // Mouse hover drift (subtle, non-dragging)
  stage.addEventListener('mousemove', function (e) {
    if (dragging) return;
    var cx  = cRect.left + cRect.width * 0.5;
    var off = (e.clientX - cx) / (cRect.width * 0.5);
    target -= off * 0.0022;
    autoPlay = false;
    clearTimeout(autoTmr);
    reschedAuto();
    hideHint();
  });
  stage.addEventListener('mouseleave', function () {
    if (!dragging) reschedAuto();
  });

  // Wheel
  stage.addEventListener('wheel', function (e) {
    e.preventDefault();
    target -= (e.deltaX || e.deltaY) * 0.0028;
    autoPlay = false; reschedAuto(); hideHint();
  }, { passive: false });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { prevBtn.click(); }
    if (e.key === 'ArrowRight') { nextBtn.click(); }
  });

  stage.addEventListener('mousedown',  onDown);
  stage.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseup',   onUp);
  window.addEventListener('touchend',  onUp);

  prevBtn.addEventListener('click', function () { target += STEP; autoPlay = false; reschedAuto(); hideHint(); });
  nextBtn.addEventListener('click', function () { target -= STEP; autoPlay = false; reschedAuto(); hideHint(); });

  window.addEventListener('resize', function () { cRect = stage.getBoundingClientRect(); });
  window.addEventListener('load',   function () { cRect = stage.getBoundingClientRect(); });

  requestAnimationFrame(tick);
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
