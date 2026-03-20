/* ═══════════════════════════════════
   SAKURA PETALS
═══════════════════════════════════ */
const sakura = document.getElementById('sakura');
const PETAL_COLORS = ['#f48fb1','#fce4ec','#f8bbd9','#ffe0f0','#ffb7c5'];
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const s = Math.random() * 10 + 5;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${s}px; height: ${s}px;
    background: ${PETAL_COLORS[Math.floor(Math.random() * 5)]};
    animation-duration: ${Math.random() * 10 + 8}s;
    animation-delay: ${Math.random() * 15}s;
    transform: rotate(${Math.random() * 360}deg);
  `;
  sakura.appendChild(p);
}

/* ═══════════════════════════════════
   CURSOR
═══════════════════════════════════ */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function animTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
  requestAnimationFrame(animTrail);
})();
document.querySelectorAll('a, button, .project-card, .skill-card, .reel-card, .intro-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
    cursor.style.background = 'var(--blue)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursor.style.background = 'var(--pink)';
  });
});

/* ═══════════════════════════════════
   NAVBAR
═══════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
}
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ═══════════════════════════════════
   ROTATING ROLES
═══════════════════════════════════ */
const roles = document.querySelectorAll('.hero-roles .role');
let currentRole = 0;
setInterval(() => {
  roles[currentRole].classList.remove('active');
  roles[currentRole].classList.add('exit');
  setTimeout(() => {
    roles[currentRole].classList.remove('exit');
    currentRole = (currentRole + 1) % roles.length;
    roles[currentRole].classList.add('active');
  }, 500);
}, 2800);

/* ═══════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════ */
function revealAll() {
  document.querySelectorAll('.ani').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60)
      el.classList.add('show');
  });
}
window.addEventListener('scroll', revealAll);
window.addEventListener('load', revealAll);
setTimeout(revealAll, 100);
setTimeout(revealAll, 500);

/* ═══════════════════════════════════
   SKILL BARS
═══════════════════════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
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
    card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
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
   + Thank You Overlay
═══════════════════════════════════ */
const contactForm = document.getElementById('kisu-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = contactForm.querySelector('button[type="submit"]');
    const note = document.getElementById('form-note');
    btn.disabled = true;
    btn.innerHTML = '🌸 Sending... please wait';
    btn.style.opacity = '0.7';
    note.style.color = 'var(--blue)';
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
   ENHANCED PARTICLE CANVAS
═══════════════════════════════════ */
const cvs = document.createElement('canvas');
cvs.id = 'particle-canvas';
cvs.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;';
document.body.prepend(cvs);
const pctx = cvs.getContext('2d');
let PW, PH;

function resizeCvs() { PW = cvs.width = window.innerWidth; PH = cvs.height = window.innerHeight; }

const P_COLORS = ['79,195,247','244,143,177','255,213,79','105,240,174','149,117,205'];

class Dot {
  constructor(init) {
    this.reset(init);
  }
  reset(init) {
    this.x    = Math.random() * PW;
    this.y    = init ? Math.random() * PH : PH + 10;
    this.vx   = (Math.random() - 0.5) * 0.7;
    this.vy   = -(Math.random() * 0.55 + 0.1);
    this.r    = Math.random() * 2.2 + 0.3;
    this.life = Math.random() * 0.9 + 0.2;
    this.max  = this.life;
    this.dec  = 0.0015 + Math.random() * 0.001;
    this.col  = P_COLORS[Math.floor(Math.random() * P_COLORS.length)];
    this.type = Math.floor(Math.random() * 5);
    this.rot  = Math.random() * Math.PI * 2;
    this.rotV = (Math.random() - 0.5) * 0.025;
  }
  update() {
    this.x   += this.vx;
    this.y   += this.vy;
    this.life -= this.dec;
    this.rot  += this.rotV;
    if (this.life <= 0 || this.y < -10) this.reset(false);
  }
  draw() {
    const a = (this.life / this.max) * 0.6;
    const c = `rgba(${this.col},${a})`;
    pctx.save();
    pctx.translate(this.x, this.y);
    pctx.rotate(this.rot);
    pctx.strokeStyle = c;
    pctx.fillStyle   = c;
    pctx.lineWidth   = 0.9;
    switch(this.type) {
      case 0: // dot
        pctx.beginPath();
        pctx.arc(0, 0, this.r, 0, Math.PI * 2);
        pctx.fill();
        break;
      case 1: // ring
        pctx.beginPath();
        pctx.arc(0, 0, this.r * 2, 0, Math.PI * 2);
        pctx.stroke();
        break;
      case 2: // cross
        const s = this.r * 2.5;
        pctx.beginPath();
        pctx.moveTo(-s,0); pctx.lineTo(s,0);
        pctx.moveTo(0,-s); pctx.lineTo(0,s);
        pctx.stroke();
        break;
      case 3: // diamond
        const d = this.r * 2;
        pctx.beginPath();
        pctx.moveTo(0,-d); pctx.lineTo(d,0);
        pctx.lineTo(0,d);  pctx.lineTo(-d,0);
        pctx.closePath();
        pctx.stroke();
        break;
      case 4: // tiny sakura shape
        for(let i=0;i<4;i++){
          pctx.beginPath();
          pctx.ellipse(this.r, 0, this.r*1.5, this.r*0.7, i*Math.PI/2, 0, Math.PI*2);
          pctx.fill();
        }
        break;
    }
    pctx.restore();
  }
}

function drawConnections(dots) {
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 160) {
        const a = 0.09 * (1 - d/160) * Math.min(dots[i].life/dots[i].max, dots[j].life/dots[j].max);
        pctx.beginPath();
        pctx.moveTo(dots[i].x, dots[i].y);
        pctx.lineTo(dots[j].x, dots[j].y);
        pctx.strokeStyle = `rgba(244,143,177,${a})`;
        pctx.lineWidth = 0.5;
        pctx.stroke();
      }
    }
  }
}

let pmx = -999, pmy = -999;
document.addEventListener('mousemove', e => {
  pmx = e.clientX; pmy = e.clientY;
  dots.forEach(p => {
    const dx = p.x - pmx, dy = p.y - pmy;
    const d  = Math.sqrt(dx*dx + dy*dy);
    if (d < 110 && d > 0) { p.vx += (dx/d)*0.4; p.vy += (dy/d)*0.4; }
  });
});

// Click burst
document.addEventListener('click', e => {
  for (let i = 0; i < 10; i++) {
    const p = new Dot(false);
    p.x = e.clientX; p.y = e.clientY;
    p.vx = (Math.random()-0.5) * 4;
    p.vy = (Math.random()-0.5) * 4;
    p.life = p.max = 0.7;
    p.col = P_COLORS[Math.floor(Math.random()*P_COLORS.length)];
    dots.push(p);
  }
  while (dots.length > COUNT + 40) dots.shift();
});

const COUNT = 120;
let dots = [];
function initDots() { dots = []; for(let i=0;i<COUNT;i++) dots.push(new Dot(true)); }

function pLoop() {
  pctx.clearRect(0, 0, PW, PH);
  dots.forEach(p => { p.update(); p.draw(); });
  drawConnections(dots);
  requestAnimationFrame(pLoop);
}

window.addEventListener('resize', () => { resizeCvs(); initDots(); });
resizeCvs(); initDots(); pLoop();

/* ═══════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});