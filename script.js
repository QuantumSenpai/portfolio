/* ═══════════════════════════════════
   ICE PARTICLE DRIFT
   Blue/cyan palette, no red/pink
═══════════════════════════════════ */
const sakura = document.getElementById('sakura');
const ICE_COLORS = [
  'rgba(77,168,255,0.5)',
  'rgba(0,229,255,0.4)',
  'rgba(184,228,255,0.35)',
  'rgba(128,195,255,0.45)',
  'rgba(26,74,255,0.3)'
];
for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const s = Math.random() * 7 + 3;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${s}px;
    height: ${s * (Math.random() > 0.5 ? 1 : 1.8)}px;
    background: ${ICE_COLORS[Math.floor(Math.random() * ICE_COLORS.length)]};
    animation-duration: ${Math.random() * 12 + 9}s;
    animation-delay: ${Math.random() * 18}s;
    transform: rotate(${Math.random() * 360}deg);
    border-radius: ${Math.random() > 0.5 ? '50%' : '2px 8px 2px 8px'};
    box-shadow: 0 0 6px ${ICE_COLORS[Math.floor(Math.random() * ICE_COLORS.length)]};
  `;
  sakura.appendChild(p);
}

/* ═══════════════════════════════════
   CURSOR — smooth lerp trail
═══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
let animId;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function lerpTrail() {
  tx += (mx - tx) * 0.10;
  ty += (my - ty) * 0.10;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(lerpTrail);
})();

// Cursor enlarge on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-card, .reel-card, .intro-card, .filter-btn, .reel-tab').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.4)';
    cursor.style.background = 'var(--blue)';
    cursor.style.boxShadow = '0 0 18px var(--blue), 0 0 40px rgba(77,168,255,0.4)';
    trail.style.borderColor = 'rgba(77,168,255,0.5)';
    trail.style.transform = 'translate(-50%,-50%) scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--cyan)';
    cursor.style.boxShadow = '0 0 14px var(--cyan), 0 0 30px rgba(0,229,255,0.4)';
    trail.style.borderColor = 'rgba(77,168,255,0.35)';
    trail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

/* ═══════════════════════════════════
   NAVBAR
═══════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* Close mobile menu on outside click */
document.addEventListener('click', e => {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('.nav-burger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

/* ═══════════════════════════════════
   ROTATING ROLES — smooth
═══════════════════════════════════ */
const roles = document.querySelectorAll('.hero-roles .role');
let currentRole = 0;

setInterval(() => {
  roles[currentRole].classList.remove('active');
  roles[currentRole].classList.add('exit');
  const prev = currentRole;
  currentRole = (currentRole + 1) % roles.length;
  setTimeout(() => {
    roles[prev].classList.remove('exit');
    roles[currentRole].classList.add('active');
  }, 480);
}, 2800);

/* ═══════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   for smooth, GPU-accelerated reveals
═══════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObs.unobserve(e.target); // fire once
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.ani').forEach(el => revealObs.observe(el));

/* Staggered children inside grids */
document.querySelectorAll('.projects-grid, .skills-grid, .reel-grid, .intro-cards, .exp-timeline').forEach(grid => {
  grid.querySelectorAll('.ani').forEach((child, i) => {
    child.style.transitionDelay = `${i * 60}ms`;
  });
});

/* ═══════════════════════════════════
   SKILL BARS — animate on scroll
═══════════════════════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 80);
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));

/* ═══════════════════════════════════
   PROJECT FILTER
═══════════════════════════════════ */
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const hide = cat !== 'all' && card.dataset.cat !== cat;
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    if (hide) {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => card.classList.add('hidden'), 280);
    } else {
      card.classList.remove('hidden');
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = '';
      });
    }
  });
}

/* ═══════════════════════════════════
   REEL TABS
═══════════════════════════════════ */
function switchTab(id, btn) {
  document.querySelectorAll('.reel-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.reel-tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}

/* ═══════════════════════════════════
   CONTACT FORM — Formspree AJAX
═══════════════════════════════════ */
const contactForm = document.getElementById('kisu-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = contactForm.querySelector('button[type="submit"]');
    const note = document.getElementById('form-note');
    btn.disabled = true;
    btn.innerHTML = '💠 Sending...';
    btn.style.opacity = '0.7';
    note.style.color = 'var(--blue2)';
    note.textContent = 'Submitting your message...';
    try {
      const res = await fetch('https://formspree.io/f/xreydgqn', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        note.textContent = '';
        showThankyou();
      } else {
        note.style.color = '#ef4444';
        note.textContent = 'Something went wrong. Please try again.';
      }
    } catch {
      note.style.color = '#ef4444';
      note.textContent = 'Network error. Please try again.';
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message ✉';
      btn.style.opacity = '1';
    }
  });
}

function showThankyou() {
  document.getElementById('kisu-thankyou').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeThankyou() {
  document.getElementById('kisu-thankyou').classList.remove('show');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════════════════════
   PARTICLE CANVAS — Liquid blue dots
   Optimised: RAF throttled, 55 dots,
   no lines, GPU composite
═══════════════════════════════════ */
const cvs = document.createElement('canvas');
cvs.id = 'particle-canvas';
Object.assign(cvs.style, {
  position: 'fixed', inset: '0',
  pointerEvents: 'none', zIndex: '0',
  willChange: 'transform'
});
document.body.prepend(cvs);
const pctx = cvs.getContext('2d');
let PW, PH;

function resizeCvs() {
  PW = cvs.width  = window.innerWidth;
  PH = cvs.height = window.innerHeight;
}

const P_COLS = [
  [77,168,255],
  [0,229,255],
  [184,228,255],
  [128,195,255],
  [26,74,255]
];

class Particle {
  constructor(init) { this.reset(init); }

  reset(init) {
    this.x    = Math.random() * PW;
    this.y    = init ? Math.random() * PH : PH + 12;
    this.vx   = (Math.random() - 0.5) * 0.35;
    this.vy   = -(Math.random() * 0.3 + 0.06);
    this.r    = Math.random() * 2 + 0.5;
    this.life = this.max = Math.random() * 0.7 + 0.2;
    this.dec  = 0.001 + Math.random() * 0.0008;
    this.col  = P_COLS[Math.floor(Math.random() * P_COLS.length)];
    // 0=dot, 1=ring, 2=diamond
    this.type = Math.floor(Math.random() * 3);
    this.rot  = Math.random() * Math.PI;
    this.rotV = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.life -= this.dec;
    this.rot  += this.rotV;
    if (this.life <= 0 || this.y < -12) this.reset(false);
  }

  draw() {
    const a = Math.min((this.life / this.max) * 0.4, 0.4);
    const [r, g, b] = this.col;
    pctx.save();
    pctx.translate(this.x, this.y);
    pctx.rotate(this.rot);
    pctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
    pctx.fillStyle   = `rgba(${r},${g},${b},${a})`;
    pctx.lineWidth   = 0.8;

    if (this.type === 0) {
      // Dot
      pctx.beginPath();
      pctx.arc(0, 0, this.r, 0, Math.PI * 2);
      pctx.fill();
    } else if (this.type === 1) {
      // Ring
      pctx.beginPath();
      pctx.arc(0, 0, this.r * 2.5, 0, Math.PI * 2);
      pctx.stroke();
    } else {
      // Diamond
      const s = this.r * 2;
      pctx.beginPath();
      pctx.moveTo(0, -s);
      pctx.lineTo(s * 0.6, 0);
      pctx.lineTo(0, s);
      pctx.lineTo(-s * 0.6, 0);
      pctx.closePath();
      pctx.fill();
    }
    pctx.restore();
  }
}

// Click burst
let dots = [];
const COUNT = 55;

document.addEventListener('click', e => {
  for (let i = 0; i < 6; i++) {
    const p = new Particle(false);
    p.x = e.clientX; p.y = e.clientY;
    const angle = (i / 6) * Math.PI * 2;
    const speed = Math.random() * 2.5 + 1;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed;
    p.life = p.max = 0.55;
    dots.push(p);
  }
  while (dots.length > COUNT + 18) dots.shift();
});

function initDots() {
  dots = [];
  for (let i = 0; i < COUNT; i++) dots.push(new Particle(true));
}

let lastTime = 0;
function pLoop(ts) {
  // Throttle to ~60fps max, but still smooth
  if (ts - lastTime < 14) {
    requestAnimationFrame(pLoop);
    return;
  }
  lastTime = ts;
  pctx.clearRect(0, 0, PW, PH);
  for (let i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].draw();
  }
  requestAnimationFrame(pLoop);
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { resizeCvs(); initDots(); }, 150);
}, { passive: true });

resizeCvs();
initDots();
requestAnimationFrame(pLoop);

/* ═══════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ═══════════════════════════════════
   HERO NAME — subtle parallax tilt
═══════════════════════════════════ */
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  document.addEventListener('mousemove', e => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
    heroContent.style.transform = `perspective(1000px) rotateY(${xRatio * 1.5}deg) rotateX(${-yRatio * 1}deg)`;
  }, { passive: true });
  document.addEventListener('mouseleave', () => {
    heroContent.style.transform = '';
  });
}