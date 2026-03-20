/* ═══════════════════════════════════
   SAKURA PETALS
═══════════════════════════════════ */
const sakura = document.getElementById('sakura');
const COLORS = ['#f48fb1','#fce4ec','#f8bbd9','#ffe0f0','#ffb7c5'];
for (let i = 0; i < 25; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  const s = Math.random() * 9 + 5;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${s}px;
    height: ${s}px;
    background: ${COLORS[Math.floor(Math.random() * 5)]};
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
   SCROLL REVEAL — .ani elements
═══════════════════════════════════ */
function revealAll() {
  document.querySelectorAll('.ani').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealAll);
window.addEventListener('load',   revealAll);
setTimeout(revealAll, 100);
setTimeout(revealAll, 500);

/* ═══════════════════════════════════
   SKILL BARS
═══════════════════════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
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
    if (cat === 'all' || card.dataset.cat === cat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
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
   CONTACT FORM
═══════════════════════════════════ */
function submitForm(e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  note.style.color = 'var(--green)';
  note.textContent = "✓ Message sent! I'll get back to you soon 🌸";
  e.target.reset();
  setTimeout(() => { note.textContent = ''; }, 4000);
}

/* ═══════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});