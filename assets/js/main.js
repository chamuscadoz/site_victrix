/* ═══════════════════════════════════════════════════════════════
   VICTRIX CAPITAL — main.js v5 (motion engine)
   ═══════════════════════════════════════════════════════════════
   MÓDULOS (todos respeitam prefers-reduced-motion e pointer):

   1. NAV scrolled        — fundo da nav ao rolar (mantido do v4)
   2. AURORA              — injeta camadas de gradiente animado nos
                            heros (#gateway, #hero, .page-hero) e #closing
   3. PAGE VEIL           — transição de rota (fade + slide curto)
                            ao navegar entre as páginas .html
   4. REVEALS             — IntersectionObserver para .reveal (mantido)
   5. SPLIT HEADLINES     — reveal por palavra nos headlines dos heros
   6. PARALLAX            — profundidade sutil das camadas de blur
                            (desktop + pointer fine apenas)
   7. TILT 3D             — hover 3D sutil em .team-card, .insight-card,
                            .card e .btn-path (inline, sem conflito com .reveal)
   8. MAGNETIC NAV        — links da nav atraídos levemente pelo cursor
   9. CURSOR v2           — anel + ponto, estados hover/click (evolução do #cursor)
  10. COUNT-UP            — [data-count] anima números ao entrar na viewport
  11. SCROLL-SPY          — estado ativo dos links de âncora da nav
   ═══════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE    = window.matchMedia('(pointer: fine)').matches;
  const DESKTOP = window.matchMedia('(min-width: 769px)').matches;

  /* ── 1. NAV SCROLLED ─────────────────────────────────────── */
  const nav = document.getElementById('nav');
  let navTick = false;
  window.addEventListener('scroll', () => {
    if (!navTick) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        navTick = false;
      });
      navTick = true;
    }
  }, { passive: true });

  /* ── 2. AURORA — gradiente animado nos heros e closing ────── */
  if (!REDUCED) {
    document.querySelectorAll('#gateway, #hero, .page-hero, #closing').forEach(sec => {
      const aurora = document.createElement('div');
      aurora.className = 'aurora';
      aurora.setAttribute('aria-hidden', 'true');
      aurora.innerHTML = '<span></span><span></span><span></span>';
      const overlay = sec.querySelector('.overlay');
      (overlay || sec).insertAdjacentElement(overlay ? 'afterend' : 'afterbegin', aurora);
    });
  }

  /* ── 3. PAGE VEIL — transições de rota ─────────────────────── */
  if (!REDUCED) {
    const veil = document.createElement('div');
    veil.className = 'page-veil';
    veil.setAttribute('aria-hidden', 'true');
    document.body.prepend(veil);

    document.querySelectorAll('a[href$=".html"]').forEach(a => {
      a.addEventListener('click', e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
        e.preventDefault();
        document.body.classList.add('leaving');
        veil.classList.add('active');
        setTimeout(() => { location.href = a.getAttribute('href'); }, 400);
      });
    });
    /* bfcache: ao voltar com o botão "voltar", restaura o estado */
    window.addEventListener('pageshow', e => {
      if (e.persisted) {
        veil.classList.remove('active');
        document.body.classList.remove('leaving');
      }
    });
  }

  /* ── 4. REVEALS ─────────────────────────────────────────────── */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

  /* ── 5. SPLIT HEADLINES — reveal por palavra ───────────────── */
  function splitWords(el) {
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const line = document.createElement('span');
            line.className = 'split-line';
            const w = document.createElement('span');
            w.className = 'split-word';
            w.textContent = part;
            line.appendChild(w);
            frag.appendChild(line);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.querySelectorAll('.split-word').forEach((w, i) => w.style.setProperty('--wi', i));
  }

  if (!REDUCED) {
    /* [seletor, atraso ms — coreografado com a entrada do logo] */
    [['.gateway-welcome', 700], ['.hero-tagline', 850], ['.page-hero h1', 250]].forEach(([sel, delay]) => {
      const el = document.querySelector(sel);
      if (!el) return;
      splitWords(el);
      el.classList.add('is-split');
      if (el.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => el.classList.add('split-in'), delay);
      } else {
        const io = new IntersectionObserver(es => {
          es.forEach(e => {
            if (e.isIntersecting) { el.classList.add('split-in'); io.disconnect(); }
          });
        }, { threshold: 0.3 });
        io.observe(el);
      }
    });
  }

  /* ── 6. PARALLAX — profundidade entre blur e conteúdo ──────── */
  if (!REDUCED && FINE && DESKTOP) {
    const layers = [...document.querySelectorAll('section .blur-layer .blur-img')].map(img => ({
      img,
      sec: img.closest('section'),
      amp: img.closest('.blur-layer').classList.contains('blur-subtle') ? 14 : 26
    }));
    layers.forEach(l => { l.img.style.willChange = 'transform'; });

    let pTick = false;
    const parallax = () => {
      const vh = window.innerHeight;
      layers.forEach(l => {
        const r = l.sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const prog = (r.top + r.height / 2 - vh / 2) / vh; /* ~-1 … 1 */
        l.img.style.transform = `translate3d(0, ${(-prog * l.amp).toFixed(1)}px, 0) scale(1.08)`;
      });
      pTick = false;
    };
    window.addEventListener('scroll', () => {
      if (!pTick) { requestAnimationFrame(parallax); pTick = true; }
    }, { passive: true });
    parallax();
  }

  /* ── 7. TILT 3D — hover sutil (inline, não conflita c/ .reveal) ── */
  if (!REDUCED && FINE && DESKTOP) {
    const MAX = 3.2; /* graus — sutileza institucional */
    document.querySelectorAll('.team-card, .insight-card, .card, .btn-path').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform .18s ease-out';
      });
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const ry = ((e.clientX - r.left) / r.width - .5) * 2 * MAX;
        const rx = ((e.clientY - r.top) / r.height - .5) * -2 * MAX;
        el.style.transform =
          `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform .45s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 460);
      });
    });
  }

  /* ── 8. MAGNETIC NAV — atração leve dos links ──────────────── */
  if (!REDUCED && FINE) {
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('mousemove', e => {
        const r = a.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .25;
        const y = (e.clientY - r.top - r.height / 2) * .35;
        a.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      a.addEventListener('mouseleave', () => { a.style.transform = ''; });
      a.style.display = 'inline-block';
      a.style.transition = 'transform .25s cubic-bezier(0.4, 0, 0.2, 1), color .25s';
    });
  }

  /* ── 9. CURSOR v2 — anel + ponto (evolução do #cursor) ─────── */
  if (FINE) {
    const cursor = document.getElementById('cursor');
    let cx = 0, cy = 0, px = 0, py = 0;
    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
    (function loop() {
      px += (cx - px) * 0.16;
      py += (cy - py) * 0.16;
      cursor.style.left = px + 'px';
      cursor.style.top = py + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('[data-hover], a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('down'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('down'));
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');
  }

  /* ── 10. COUNT-UP — KPIs com [data-count] ──────────────────── */
  /* Uso: <span data-count="700" data-suffix="+">0</span>         */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const fmt = n => Math.round(n).toLocaleString('pt-BR');
    const countIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        countIO.unobserve(el);
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (REDUCED) { el.textContent = fmt(target) + suffix; return; }
        const t0 = performance.now(), dur = 1400;
        (function step(t) {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = fmt(target * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIO.observe(el));
  }

  /* ── 11. SCROLL-SPY — estado ativo na nav ──────────────────── */
  const anchorLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (anchorLinks.length) {
    const spyIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const link = anchorLinks.find(a => a.getAttribute('href') === '#' + e.target.id);
        if (link && e.isIntersecting) {
          anchorLinks.forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    anchorLinks.forEach(a => {
      const sec = document.querySelector(a.getAttribute('href'));
      if (sec) spyIO.observe(sec);
    });
  }
  /* Página atual marcada na nav (links entre páginas) */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href$=".html"]').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });

})();
