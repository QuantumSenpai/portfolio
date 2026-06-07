/*
  KISU PORTFOLIO — script.js  v3.0
  FIXED:  Hero stats labels · Roles ticker height · Desktop name overflow
  ADDED:  Particle burst + motion-blur on card shuffle
  Mobile-first optimised · Pure JS, zero deps
  © 2025 Krishnendu Adak (QuantumSenpai)
*/

'use strict';

/* ─── Utility ─────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const isMobile = () => window.innerWidth < 769;
const isTouch  = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

/* ═══════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════ */
function initLoader() {
  const loader   = qs('#loader');
  const progress = qs('#loader-progress');
  const pct      = qs('#loader-pct');
  if (!loader) return;

  let value = 0;
  document.body.style.overflow = 'hidden';

  const step = () => {
    const inc = value < 70 ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
    value = Math.min(value + inc, 100);
    if (progress) progress.style.width = value + '%';
    if (pct)      pct.textContent = Math.floor(value) + '%';

    if (value < 100) {
      setTimeout(step, 60 + Math.random() * 80);
    } else {
      setTimeout(() => {
        loader.classList.add('out');
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.style.overflow = '';
        }, 550);
      }, 180);
    }
  };

  setTimeout(step, 80);

  setTimeout(() => {
    if (loader.style.display !== 'none') {
      loader.classList.add('out');
      setTimeout(() => { loader.style.display = 'none'; document.body.style.overflow = ''; }, 550);
    }
  }, 4000);
}

/* ═══════════════════════════════════════════════════
   CUSTOM CURSOR (desktop pointer:fine only)
═══════════════════════════════════════════════════ */
function initCursor() {
  if (!window.matchMedia('(pointer:fine)').matches) return;

  const dot  = qs('#cursor-dot');
  const ring = qs('#cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  const animateRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  };
  animateRing();

  const hoverEls = qsa('a, button, .proj-card, .skill-panel, .reel-card, .intro-card, .filter-pill, .reel-tab, .soc-pill, .clink, .stack-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });
  document.addEventListener('mousedown', () => dot.classList.add('clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

/* ═══════════════════════════════════════════════════
   THEME
═══════════════════════════════════════════════════ */
function initTheme() {
  const btn  = qs('#theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('kisu-theme') || 'dark';
  root.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('kisu-theme', next);
  });
}

/* ═══════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════ */
function initNavbar() {
  const navbar   = qs('#navbar');
  const burger   = qs('#nav-burger');
  const drawer   = qs('#mobile-drawer');
  const navLinks = qsa('.nav-link');
  const logoBtn  = qs('#nav-logo-click');

  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 30);
    let current = '';
    qsa('section[id]').forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    drawer?.classList.toggle('open');
    document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
  });

  qsa('.drawer-link').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      drawer?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (drawer?.classList.contains('open') && !drawer.contains(e.target) && !burger?.contains(e.target)) {
      burger?.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  logoBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ═══════════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════════ */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = qs(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ═══════════════════════════════════════════════════
   GREETING TYPEWRITER
═══════════════════════════════════════════════════ */
function initGreeting() {
  const el = qs('#greeting-typed');
  if (!el) return;
  const phrases = ['hello, world', 'こんにちは', 'namaste', 'welcome!'];
  let pi = 0, ci = 0, deleting = false;

  const type = () => {
    const phrase = phrases[pi];
    if (!deleting) {
      ci++;
      el.textContent = phrase.slice(0, ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 55 : 80);
  };
  setTimeout(type, 1200);
}

/* ═══════════════════════════════════════════════════
   ROLES TICKER
═══════════════════════════════════════════════════ */
function initRolesTicker() {
  const items = qsa('.role-item');
  if (!items.length) return;
  let current = 0;

  setInterval(() => {
    items[current].classList.remove('active');
    items[current].classList.add('exit');
    const prev = current;
    setTimeout(() => items[prev].classList.remove('exit'), 520);
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }, 2800);
}

/* ═══════════════════════════════════════════════════
   STAT COUNTERS
═══════════════════════════════════════════════════ */
function initStatCounters() {
  const counters = qsa('.hstat-num');
  let started = false;

  const run = () => {
    counters.forEach(el => {
      const target = +el.dataset.count;
      let current = 0;
      const step  = Math.ceil(target / 35);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (target > 10 ? '+' : '');
        if (current >= target) clearInterval(timer);
      }, 36);
    });
  };

  const hero = qs('#hero');
  if (!hero || !('IntersectionObserver' in window)) { run(); return; }
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) { started = true; run(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(hero);
}

/* ═══════════════════════════════════════════════════
   BACKGROUND PARTICLE CANVAS
═══════════════════════════════════════════════════ */
function initParticles() {
  const canvas = qs('#particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };

  class Particle {
    constructor(init) { this.reset(init); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.6 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.a  = Math.random() * 0.35 + 0.12;
      this.c  = Math.random() > 0.55 ? 'rgba(0,102,255,' : 'rgba(0,212,255,';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < -10 || this.x < -20 || this.x > W + 20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c + this.a + ')';
      ctx.fill();
    }
  }

  const init = () => {
    particles = [];
    const count = isMobile() ? 18 : 40;
    for (let i = 0; i < count; i++) particles.push(new Particle(true));
  };

  let lastTime = 0;
  const loop = ts => {
    requestAnimationFrame(loop);
    if (ts - lastTime < 33) return;
    lastTime = ts;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
  };

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); init(); }, 200);
  }, { passive: true });

  resize(); init();
  requestAnimationFrame(loop);
}

/* ═══════════════════════════════════════════════════
   BURST PARTICLE SYSTEM
   Fires side-flash particles when card stack shuffles.
   Particles launch from card edges with motion-blur
   trails, then fade out quickly for a cinematic hit.
═══════════════════════════════════════════════════ */
const BurstSystem = (() => {
  const canvas = qs('#burst-canvas');
  if (!canvas) return { fire: () => {} };
  const ctx    = canvas.getContext('2d');
  let W = 0, H = 0;
  let particles = [];
  let rafId = null;

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COLORS = [
    '#00D4FF', '#0066FF', '#4D9FFF',
    '#1a7aff', '#00aaff', '#ffffff',
  ];

  class BurstParticle {
    constructor(x, y, side) {
      // side: 'left' | 'right' | 'top' | 'bottom' | 'center'
      this.x  = x;
      this.y  = y;

      // Direction based on emission side
      let baseAngle;
      if (side === 'left')   baseAngle = Math.PI;         // shoot left
      else if (side === 'right') baseAngle = 0;           // shoot right
      else if (side === 'top')   baseAngle = -Math.PI/2;  // shoot up
      else                       baseAngle = Math.random() * Math.PI * 2; // omnidirectional

      const spread = Math.PI * 0.55;
      const angle  = baseAngle + (Math.random() - 0.5) * spread;
      const speed  = 3 + Math.random() * 9;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.r  = 1.2 + Math.random() * 3.2;
      this.life   = 1.0;
      this.decay  = 0.035 + Math.random() * 0.055;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.trail  = []; // last N positions for motion-blur trail
      this.maxTrail = 5;
      this.glow = Math.random() > 0.5;
    }

    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.maxTrail) this.trail.shift();

      this.x    += this.vx;
      this.y    += this.vy;
      this.vy   += 0.18; // gravity
      this.vx   *= 0.96; // drag
      this.life -= this.decay;
    }

    draw() {
      if (this.life <= 0) return;

      // Draw motion-blur trail
      for (let i = 0; i < this.trail.length; i++) {
        const t     = this.trail[i];
        const ratio = i / this.trail.length;
        const alpha = ratio * this.life * 0.6;
        const r     = this.r * ratio * 0.85;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.round(alpha * 255).toString(16).padStart(2,'0');
        ctx.fill();
      }

      // Draw head
      if (this.glow) {
        ctx.shadowBlur  = 14;
        ctx.shadowColor = this.color;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + Math.round(this.life * 255).toString(16).padStart(2,'0');
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    isDead() { return this.life <= 0; }
  }

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    particles = particles.filter(p => !p.isDead());
    particles.forEach(p => { p.update(); p.draw(); });
    if (particles.length > 0) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  };

  /**
   * fire(cx, cy) — emit a burst of particles from card center,
   * also shooting from left and right edges
   */
  function fire(cx, cy, cardW, cardH) {
    const count = isMobile() ? 28 : 52;

    // Center explosion
    for (let i = 0; i < Math.floor(count * 0.5); i++) {
      particles.push(new BurstParticle(cx, cy, 'center'));
    }
    // Left edge
    for (let i = 0; i < Math.floor(count * 0.25); i++) {
      const py = cy + (Math.random() - 0.5) * (cardH || 200);
      particles.push(new BurstParticle(cx - (cardW || 140) / 2, py, 'left'));
    }
    // Right edge
    for (let i = 0; i < Math.floor(count * 0.25); i++) {
      const py = cy + (Math.random() - 0.5) * (cardH || 200);
      particles.push(new BurstParticle(cx + (cardW || 140) / 2, py, 'right'));
    }

    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  return { fire };
})();

/* ═══════════════════════════════════════════════════
   MOBILE CAROUSEL (touch/drag + auto-play)
═══════════════════════════════════════════════════ */
function initMobileCarousel() {
  const carousel = qs('#mobile-carousel');
  const track    = qs('#mc-track');
  const dots     = qsa('.mc-dot');
  const cards    = qsa('.mc-card', track);
  if (!carousel || !track || !cards.length) return;

  let current    = 0;
  let startX     = 0;
  let dragDelta  = 0;
  let isDragging = false;
  let autoTimer;

  const getCardWidth = () => carousel.offsetWidth - 40;
  const getOffset    = (idx) => 20 + idx * (getCardWidth() + 14);

  const goTo = (idx, animated = true) => {
    idx = clamp(idx, 0, cards.length - 1);
    current = idx;

    if (!animated) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    track.style.transform = `translateX(-${getOffset(idx)}px)`;

    cards.forEach((c, i) => c.classList.toggle('active', i === idx));
    dots.forEach((d, i)  => d.classList.toggle('active', i === idx));
  };

  requestAnimationFrame(() => { goTo(0, false); });
  window.addEventListener('resize', () => goTo(current, false), { passive: true });

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(() => goTo((current + 1) % cards.length), 3200);
  };
  const stopAuto = () => clearInterval(autoTimer);

  startAuto();
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  const onStart = (clientX) => {
    isDragging = true;
    startX     = clientX;
    dragDelta  = 0;
    stopAuto();
    track.style.transition = 'none';
  };

  const onMove = (clientX) => {
    if (!isDragging) return;
    dragDelta = clientX - startX;
    const base = getOffset(current);
    track.style.transform = `translateX(${-base + dragDelta}px)`;
  };

  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    const threshold = getCardWidth() * 0.25;
    if      (dragDelta < -threshold && current < cards.length - 1) goTo(current + 1);
    else if (dragDelta >  threshold && current > 0)                goTo(current - 1);
    else                                                           goTo(current);
    startAuto();
  };

  track.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove',  e => { e.preventDefault(); onMove(e.touches[0].clientX); },  { passive: false });
  track.addEventListener('touchend',   onEnd);

  track.addEventListener('mousedown', e => { onStart(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove', e => onMove(e.clientX));
  window.addEventListener('mouseup',   onEnd);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); stopAuto(); startAuto(); });
  });
}

/* ═══════════════════════════════════════════════════
   DESKTOP CARD STACK — 3D tilt + auto-cycle
   Enhanced with motion-blur class + particle burst
═══════════════════════════════════════════════════ */
function initCardStack() {
  const stack = qs('#card-stack');
  if (!stack || isMobile()) return;

  const hero = qs('#hero');
  hero?.addEventListener('mousemove', e => {
    const front = qs('.stack-card.card-front', stack);
    if (!front) return;
    const rect  = front.getBoundingClientRect();
    const rotY  = clamp((e.clientX - (rect.left + rect.width/2))  / rect.width  * 28, -14, 14);
    const rotX  = clamp(((rect.top + rect.height/2) - e.clientY)  / rect.height * 20, -10, 10);
    front.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-8px) scale(1.02)`;
  });

  hero?.addEventListener('mouseleave', () => {
    qsa('.stack-card', stack).forEach(c => {
      c.style.transform = '';
      c.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => { c.style.transition = ''; }, 600);
    });
  });
}

function initStackCycle() {
  const stack = qs('#card-stack');
  if (!stack) return;
  const cards = qsa('.stack-card', stack);
  if (cards.length < 2) return;

  const positions = ['card-front','card-back-1','card-back-2','card-back-3','card-back-4'];
  let order = [...cards];

  const applyPositions = () => {
    order.forEach((card, i) => {
      card.classList.remove(...positions);
      card.style.transform = '';
      card.classList.add(positions[i] || 'card-back-4');
    });
  };

  /** Get rect of front card for burst origin */
  const getFrontRect = () => {
    const front = order[0];
    if (!front) return null;
    return front.getBoundingClientRect();
  };

  const shuffle = () => {
    // ── 1. Grab front card position before shuffle ──
    const rect = getFrontRect();

    // ── 2. Apply motion-blur class to ALL cards briefly ──
    order.forEach(card => {
      card.classList.add('shuffling');
      setTimeout(() => card.classList.remove('shuffling'), 720);
    });

    // ── 3. Rotate order ──
    order.push(order.shift());
    applyPositions();

    // ── 4. Fire burst particles at the front card position ──
    if (rect) {
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      BurstSystem.fire(cx, cy, rect.width, rect.height);
    }
  };

  applyPositions();

  let timer = setInterval(shuffle, 2800);

  stack.addEventListener('click', () => {
    clearInterval(timer);
    shuffle();
    timer = setInterval(shuffle, 2800);
  });

  stack.addEventListener('mouseenter', () => clearInterval(timer));
  stack.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(shuffle, 2800);
  });
}

/* ═══════════════════════════════════════════════════
   MAGNETIC BUTTONS (desktop only)
═══════════════════════════════════════════════════ */
function initMagneticButtons() {
  if (isTouch()) return;

  qsa('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx   = e.clientX - (rect.left + rect.width/2);
      const dy   = e.clientY - (rect.top  + rect.height/2);
      btn.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });
}

/* ═══════════════════════════════════════════════════
   REVEAL ON SCROLL
═══════════════════════════════════════════════════ */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    qsa('.reveal-up, .reveal-left, .reveal-right').forEach(el => el.classList.add('visible'));
    triggerSkillBars();
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skill-panel')) animateSkillBars(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  qsa('.reveal-up, .reveal-left, .reveal-right, .skill-panel').forEach(el => obs.observe(el));

  qsa('.proj-card, .reel-card, .intro-card, .clink').forEach((el, i) => {
    if (!el.classList.contains('reveal-up')) {
      el.classList.add('reveal-up');
      el.style.transitionDelay = (i % 4) * 0.07 + 's';
      obs.observe(el);
    }
  });
}

function animateSkillBars(panel) {
  qsa('.sr-fill', panel).forEach((bar, i) => {
    setTimeout(() => { bar.style.width = (bar.dataset.w || 0) + '%'; }, i * 90);
  });
}
function triggerSkillBars() {
  qsa('.sr-fill').forEach(bar => { bar.style.width = (bar.dataset.w || 0) + '%'; });
}

/* ═══════════════════════════════════════════════════
   PROJECT FILTER
═══════════════════════════════════════════════════ */
function initProjectFilter() {
  qsa('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      qsa('.proj-card').forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '0'; card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1'; card.style.transform = '';
          }));
        } else {
          card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 260);
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════
   REEL TABS
═══════════════════════════════════════════════════ */
function initReelTabs() {
  qsa('.reel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.reel-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      qsa('.reel-panel').forEach(p => { p.classList.remove('active'); p.style.opacity = '0'; });
      const target = qs(`#tab-${tab.dataset.tab}`);
      if (target) {
        target.classList.add('active');
        requestAnimationFrame(() => {
          target.style.transition = 'opacity 0.35s ease';
          target.style.opacity = '1';
        });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════ */
function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = qs('#form-submit');
    const txt = qs('#submit-text');
    const msg = qs('#form-msg');

    if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }
    if (txt) txt.textContent = '// Sending...';
    if (msg) { msg.style.color = 'var(--text-3)'; msg.textContent = ''; }

    try {
      const res = await fetch('https://formspree.io/f/xreydgqn', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { form.reset(); showThankyou(); }
      else { if (msg) { msg.style.color = '#ff6b6b'; msg.textContent = '⚠ Something went wrong. Try again.'; } }
    } catch {
      if (msg) { msg.style.color = '#ff6b6b'; msg.textContent = '⚠ Network error. Please try again.'; }
    } finally {
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
      if (txt) txt.textContent = 'Send Message ✉';
    }
  });
}

/* ═══════════════════════════════════════════════════
   THANK YOU OVERLAY
═══════════════════════════════════════════════════ */
function showThankyou() {
  const overlay = qs('#thankyou-overlay');
  if (!overlay) return;
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeThankyou() {
  const overlay = qs('#thankyou-overlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; z-index: 9997;
    height: 2px; width: 0%;
    background: linear-gradient(90deg, var(--blue), var(--cyan));
    box-shadow: 0 0 8px var(--cyan);
    transition: width 0.1s ease;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    bar.style.width = clamp((scrollTop / (scrollHeight - clientHeight)) * 100, 0, 100) + '%';
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   CARD TILT (desktop only)
═══════════════════════════════════════════════════ */
function initCardTilt() {
  if (isTouch()) return;

  qsa('.proj-card, .skill-panel, .intro-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rotX = clamp(-((e.clientY - rect.top)  / rect.height - 0.5) * 8, -5, 5);
      const rotY = clamp( ((e.clientX - rect.left) / rect.width  - 0.5) * 8, -5, 5);
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s var(--ease-out)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ═══════════════════════════════════════════════════
   THANK YOU CLOSE BUTTON
═══════════════════════════════════════════════════ */
function initThankyouClose() {
  qs('#ty-close-btn')?.addEventListener('click', closeThankyou);
}

/* ═══════════════════════════════════════════════════
   INIT ALL
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoader();
  initCursor();
  initNavbar();
  initSmoothScroll();
  initGreeting();
  initRolesTicker();
  initStatCounters();
  initParticles();
  initMagneticButtons();
  initCardStack();
  initStackCycle();    // ← burst + motion-blur wired in here
  initMobileCarousel();
  initReveal();
  initProjectFilter();
  initReelTabs();
  initContactForm();
  initThankyouClose();
  initScrollProgress();
  initCardTilt();
});

window.closeThankyou = closeThankyou;
