/*
  KISU PORTFOLIO — script.js
  Zero external deps. Pure JS, fully optimised.
  © 2025 Krishnendu Adak (QuantumSenpai)
*/

'use strict';

// ─── Utility ──────────────────────────────────────────────
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

// ─── State ────────────────────────────────────────────────
let state = {
  theme:     'dark',
  isMobile:  window.innerWidth < 768,
};

/* ═════════════════════════════════════════════════════════
   LOADER
═════════════════════════════════════════════════════════ */
function initLoader() {
  const loader    = qs('#loader');
  const progress  = qs('#loader-progress');
  const pct       = qs('#loader-pct');

  if (!loader) return;

  let value = 0;
  const step = () => {
    // Ease towards 100 with irregular increments for realism
    const inc = value < 70
      ? Math.random() * 8 + 4
      : Math.random() * 3 + 1;
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
      }, 200);
    }
  };

  document.body.style.overflow = 'hidden';
  setTimeout(step, 80);

  // Safety fallback
  setTimeout(() => {
    if (loader.style.display !== 'none') {
      loader.classList.add('out');
      setTimeout(() => { loader.style.display = 'none'; document.body.style.overflow = ''; }, 550);
    }
  }, 4000);
}

/* ═════════════════════════════════════════════════════════
   CUSTOM CURSOR
═════════════════════════════════════════════════════════ */
function initCursor() {
  if (state.isMobile) return;

  const dot  = qs('#cursor-dot');
  const ring = qs('#cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let rafId;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  const animateRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(animateRing);
  };
  animateRing();

  // Hover effects on interactive elements
  const hoverEls = qsa('a, button, .proj-card, .skill-panel, .reel-card, .intro-card, .filter-pill, .reel-tab, .soc-pill, .clink, .stack-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
  });

  document.addEventListener('mousedown', () => dot.classList.add('clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}

/* ═════════════════════════════════════════════════════════
   THEME TOGGLE
═════════════════════════════════════════════════════════ */
function initTheme() {
  const btn  = qs('#theme-toggle');
  const root = document.documentElement;

  const saved = localStorage.getItem('kisu-theme') || 'dark';
  state.theme = saved;
  root.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', state.theme);
    localStorage.setItem('kisu-theme', state.theme);
  });
}

/* ═════════════════════════════════════════════════════════
   NAVBAR
═════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar  = qs('#navbar');
  const burger  = qs('#nav-burger');
  const drawer  = qs('#mobile-drawer');
  const navLinks = qsa('.nav-link');

  // Scroll class
  const onScroll = () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 30);
    updateActiveLink(y);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlight
  function updateActiveLink(y) {
    let current = '';
    qsa('section[id]').forEach(sec => {
      if (y >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }

  // Mobile burger
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

  // Close drawer on outside click
  document.addEventListener('click', e => {
    if (drawer?.classList.contains('open') && !drawer.contains(e.target) && !burger?.contains(e.target)) {
      burger?.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ═════════════════════════════════════════════════════════
   SMOOTH SCROLL
═════════════════════════════════════════════════════════ */
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

/* ═════════════════════════════════════════════════════════
   HERO GREETING TYPEWRITER
═════════════════════════════════════════════════════════ */
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
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      ci--;
      el.textContent = phrase.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 55 : 80);
  };

  setTimeout(type, 1200);
}

/* ═════════════════════════════════════════════════════════
   ROLES TICKER
═════════════════════════════════════════════════════════ */
function initRolesTicker() {
  const items = qsa('.role-item');
  if (!items.length) return;

  let current = 0;
  setInterval(() => {
    items[current].classList.remove('active');
    items[current].classList.add('exit');
    setTimeout(() => items[current % items.length].classList.remove('exit'), 500);
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }, 2800);
}

/* ═════════════════════════════════════════════════════════
   HERO STAT COUNTER
═════════════════════════════════════════════════════════ */
function initStatCounters() {
  const counters = qsa('.hstat-num');
  let started = false;

  const runCounters = () => {
    counters.forEach(el => {
      const target = +el.dataset.count;
      let current = 0;
      const step  = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (target > 10 ? '+' : '');
        if (current >= target) clearInterval(timer);
      }, 40);
    });
  };

  const hero = qs('#hero');
  if (!hero || !('IntersectionObserver' in window)) { runCounters(); return; }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      runCounters();
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(hero);
}

/* ═════════════════════════════════════════════════════════
   PARTICLE CANVAS — hero particles
═════════════════════════════════════════════════════════ */
function initParticles() {
  const canvas = qs('#particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  class Particle {
    constructor(initial) {
      this.reset(initial);
    }
    reset(initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.8 + 0.6;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.a  = Math.random() * 0.4 + 0.15;
      this.c  = Math.random() > 0.55 ? 'rgba(0,102,255,' : 'rgba(0,212,255,';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10 || this.x < -20 || this.x > W + 20) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c + this.a + ')';
      ctx.shadowColor = this.c + '0.5)';
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.shadowBlur  = 0;
    }
  }

  const init = () => {
    particles = [];
    const count = state.isMobile ? 20 : 40;
    for (let i = 0; i < count; i++) particles.push(new Particle(true));
  };

  let lastTime = 0;
  const loop = (ts) => {
    requestAnimationFrame(loop);
    if (ts - lastTime < 33) return; // cap at ~30fps for performance
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

/* ═════════════════════════════════════════════════════════
   MAGNETIC BUTTONS
═════════════════════════════════════════════════════════ */
function initMagneticButtons() {
  if (state.isMobile) return;

  qsa('.magnetic').forEach(btn => {
    const strength = 0.35;

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx   = e.clientX - (rect.left + rect.width  / 2);
      const dy   = e.clientY - (rect.top  + rect.height / 2);
      btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });
}

/* ═════════════════════════════════════════════════════════
   CARD STACK: 3D tilt on mouse move
═════════════════════════════════════════════════════════ */
function initCardStack() {
  const stack = qs('#card-stack');
  if (!stack || state.isMobile) return;

  const hero = qs('#hero');
  hero?.addEventListener('mousemove', e => {
    const front = qs('.stack-card.card-front', stack);
    if (!front) return;

    const rect = front.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rotY = clamp((e.clientX - cx) / rect.width  * 28, -14, 14);
    const rotX = clamp((cy - e.clientY) / rect.height * 20, -10, 10);
    front.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-8px) scale(1.02)`;
  });

  hero?.addEventListener('mouseleave', () => {
    qsa('.stack-card', stack).forEach(card => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });
}

/* ═════════════════════════════════════════════════════════
   REVEAL ON SCROLL (IntersectionObserver)
═════════════════════════════════════════════════════════ */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    qsa('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
    triggerSkillBars();
    return;
  }

  const opts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');

      // Skill bars
      if (el.classList.contains('skill-panel')) {
        animateSkillBars(el);
      }

      observer.unobserve(el);
    });
  }, opts);

  qsa('.reveal-up, .reveal-left, .reveal-right, .skill-panel, .proj-card, .reel-card, .intro-card, .clink')
    .forEach(el => observer.observe(el));

  // Also add reveal-up to proj-cards, reel-cards etc on first pass
  qsa('.proj-card, .reel-card, .intro-card, .clink, .web3-stat-item').forEach((el, i) => {
    if (!el.classList.contains('reveal-up')) {
      el.classList.add('reveal-up');
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      observer.observe(el);
    }
  });
}

function animateSkillBars(panel) {
  qsa('.sr-fill', panel).forEach((bar, i) => {
    setTimeout(() => {
      bar.style.width = (bar.dataset.w || 0) + '%';
    }, i * 90);
  });
}

function triggerSkillBars() {
  qsa('.sr-fill').forEach(bar => {
    bar.style.width = (bar.dataset.w || 0) + '%';
  });
}

/* ═════════════════════════════════════════════════════════
   PROJECTS FILTER
═════════════════════════════════════════════════════════ */
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
          // Re-trigger reveal animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity    = '1';
              card.style.transform  = '';
            });
          });
        } else {
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 280);
        }
      });
    });
  });
}

/* ═════════════════════════════════════════════════════════
   REEL TABS
═════════════════════════════════════════════════════════ */
function initReelTabs() {
  qsa('.reel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.reel-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const id = tab.dataset.tab;
      qsa('.reel-panel').forEach(p => {
        p.classList.remove('active');
        p.style.opacity = '0';
      });

      const target = qs(`#tab-${id}`);
      if (target) {
        target.classList.add('active');
        requestAnimationFrame(() => {
          target.style.transition = 'opacity 0.35s ease';
          target.style.opacity    = '1';
        });
      }
    });
  });
}

/* ═════════════════════════════════════════════════════════
   CONTACT FORM
═════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = qs('#form-submit');
    const txt  = qs('#submit-text');
    const msg  = qs('#form-msg');

    if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }
    if (txt) txt.textContent = '// Sending...';
    if (msg) { msg.style.color = 'var(--text-3)'; msg.textContent = ''; }

    try {
      const res = await fetch('https://formspree.io/f/xreydgqn', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showThankyou();
      } else {
        if (msg) { msg.style.color = '#ff6b6b'; msg.textContent = '⚠ Something went wrong. Try again.'; }
      }
    } catch {
      if (msg) { msg.style.color = '#ff6b6b'; msg.textContent = '⚠ Network error. Please try again.'; }
    } finally {
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
      if (txt) txt.textContent = 'Send Message ✉';
    }
  });
}

/* ═════════════════════════════════════════════════════════
   THANK YOU OVERLAY
═════════════════════════════════════════════════════════ */
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

/* ═════════════════════════════════════════════════════════
   CARD STACK AUTO CYCLE (click to cycle cards)
═════════════════════════════════════════════════════════ */
function initStackCycle() {
  const stack = qs('#card-stack');
  if (!stack) return;

  const cards = qsa('.stack-card', stack);
  if (cards.length < 2) return;

  const positions = ['card-front', 'card-back-1', 'card-back-2', 'card-back-3', 'card-back-4'];
  let order = [...cards];

  const applyPositions = () => {
    order.forEach((card, index) => {
      card.classList.remove(...positions);
      card.style.transform = '';
      card.style.transition = '';
      card.classList.add(positions[index] || 'card-back-4');
    });
  };

  const shuffle = () => {
    stack.classList.remove('is-shuffling');
    void stack.offsetWidth;
    stack.classList.add('is-shuffling');

    order.push(order.shift());
    applyPositions();

    window.setTimeout(() => stack.classList.remove('is-shuffling'), 680);
  };

  applyPositions();

  let timer = setInterval(shuffle, 2600);

  // Manual click
  stack.addEventListener('click', () => {
    clearInterval(timer);
    shuffle();
    timer = setInterval(shuffle, 2600);
  });

  stack.addEventListener('mouseenter', () => clearInterval(timer));
  stack.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(shuffle, 2600);
  });
}

/* ═════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR (subtle)
═════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; z-index: 9997;
    height: 2px; width: 0%;
    background: linear-gradient(90deg, var(--blue), var(--cyan));
    box-shadow: 0 0 8px var(--cyan);
    transition: width 0.1s ease; pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
    bar.style.width = clamp(pct, 0, 100) + '%';
  }, { passive: true });
}

/* ═════════════════════════════════════════════════════════
   NAVBAR LOGO click → top
═════════════════════════════════════════════════════════ */
function initLogoClick() {
  qs('.nav-logo')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═════════════════════════════════════════════════════════
   RESIZE HANDLER
═════════════════════════════════════════════════════════ */
function initResize() {
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.isMobile = window.innerWidth < 768;
    }, 200);
  }, { passive: true });
}

/* ═════════════════════════════════════════════════════════
   GLASS CARD TILT (subtle, desktop only)
═════════════════════════════════════════════════════════ */
function initCardTilt() {
  if (state.isMobile) return;

  qsa('.proj-card, .skill-panel, .intro-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const dx    = (e.clientX - rect.left) / rect.width  - 0.5;
      const dy    = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotX  = clamp(-dy * 8, -5, 5);
      const rotY  = clamp(dx  * 8, -5, 5);
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s var(--ease-out)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ═════════════════════════════════════════════════════════
   INIT ALL
═════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Init order matters
  initTheme();
  initLoader();
  initCursor();
  initNavbar();
  initSmoothScroll();
  initLogoClick();
  initGreeting();
  initRolesTicker();
  initStatCounters();
  initParticles();
  initMagneticButtons();
  initCardStack();
  initStackCycle();
  initReveal();
  initProjectFilter();
  initReelTabs();
  initContactForm();
  initScrollProgress();
  initCardTilt();
  initResize();
});

// Expose globals
window.closeThankyou = closeThankyou;
