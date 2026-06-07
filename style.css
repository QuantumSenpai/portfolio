/* ═══════════════════════════════════════════════════
   KISU PORTFOLIO — style.css  v3.0
   Mobile-first · Deep Navy · Electric Blue · Liquid Glass
   FIXED: Hero text overflow · Stats label · Ticker height
   ADDED: Burst canvas · Motion blur card transitions
   © 2025 Krishnendu Adak (QuantumSenpai)
═══════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cabinet+Grotesk:wght@300;400;500;700;800;900&display=swap');

/* ─── CSS Variables ─────────────────────────────── */
:root {
  --navy:        #030814;
  --navy-2:      #050c1a;
  --navy-3:      #070f20;
  --surface:     #0a1628;
  --surface-2:   #0d1c33;
  --blue:        #0066FF;
  --blue-bright: #1a7aff;
  --blue-glow:   rgba(0, 102, 255, 0.35);
  --cyan:        #00D4FF;
  --cyan-glow:   rgba(0, 212, 255, 0.25);
  --electric:    #4D9FFF;
  --white:       #FFFFFF;
  --text:        #D4E2F8;
  --text-2:      #9BB5D8;
  --text-3:      #5A7A9E;
  --muted:       #304260;
  --glass-bg:    rgba(10, 22, 40, 0.55);
  --glass-bg-2:  rgba(13, 28, 51, 0.75);
  --glass-border:rgba(0, 102, 255, 0.18);
  --glass-border-hover: rgba(0, 212, 255, 0.4);
  --accent-gold: #FFB347;
  --accent-pink: #FF6B9D;
  --accent-purple:#A78BFA;
  --green:       #4ADE80;
  --font-display: 'Syne', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
  --font-body:    'Cabinet Grotesk', 'Syne', sans-serif;
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="light"] {
  --navy:        #F0F4FF;
  --navy-2:      #E8EEFF;
  --navy-3:      #DDE5FF;
  --surface:     #FFFFFF;
  --surface-2:   #F5F8FF;
  --text:        #0A1628;
  --text-2:      #2D4A6E;
  --text-3:      #5A7A9E;
  --muted:       #A0B4CC;
  --glass-bg:    rgba(255, 255, 255, 0.65);
  --glass-bg-2:  rgba(255, 255, 255, 0.85);
  --glass-border:rgba(0, 102, 255, 0.12);
}

/* ─── Reset ──────────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; -webkit-text-size-adjust: 100%; }
body {
  background: var(--navy);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  transition: background 0.5s var(--ease-smooth), color 0.5s var(--ease-smooth);
}

/* Grid overlay */
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(0,102,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,102,255,0.025) 1px, transparent 1px);
  background-size: 64px 64px;
  pointer-events: none;
  z-index: 0;
  animation: grid-drift 40s linear infinite;
}
@keyframes grid-drift { to { background-position: 64px 64px; } }

/* ─── Scrollbar ──────────────────────────────────── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--navy-2); }
::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 2px; }
::selection { background: rgba(0,102,255,0.35); color: var(--white); }
a { text-decoration: none; color: inherit; }

/* ═══════════════════════════════════════════════════
   BURST CANVAS — particle flash on card shuffle
═══════════════════════════════════════════════════ */
#burst-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9990;
  width: 100%;
  height: 100%;
}

/* ═══════════════════════════════════════════════════
   LOADER
═══════════════════════════════════════════════════ */
#loader {
  position: fixed; inset: 0;
  background: var(--navy);
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.5s var(--ease-smooth), transform 0.5s var(--ease-smooth);
}
#loader.out { opacity: 0; transform: scale(1.03); pointer-events: none; }
.loader-inner { display: flex; flex-direction: column; align-items: center; gap: 24px; }
.loader-logo-anim {
  font-family: var(--font-display);
  font-size: clamp(56px, 15vw, 72px); font-weight: 800;
  animation: loader-pulse 1.4s ease-in-out infinite alternate;
}
.ll-k { color: var(--white); }
.ll-dot { color: var(--cyan); text-shadow: 0 0 20px var(--cyan); }
@keyframes loader-pulse {
  from { opacity: 0.7; }
  to   { opacity: 1; text-shadow: 0 0 30px var(--blue-glow); }
}
.loader-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.loader-bar { width: 180px; height: 2px; background: rgba(0,102,255,0.12); border-radius: 2px; overflow: hidden; }
.loader-progress {
  height: 100%; width: 0; border-radius: 2px;
  background: linear-gradient(90deg, var(--blue), var(--cyan));
  box-shadow: 0 0 12px var(--cyan);
  transition: width 0.1s ease;
}
.loader-pct { font-family: var(--font-mono); font-size: 11px; color: var(--text-3); letter-spacing: 3px; }
.loader-tag { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 3px; }

/* ═══════════════════════════════════════════════════
   CURSOR (desktop only)
═══════════════════════════════════════════════════ */
.cursor-dot {
  width: 7px; height: 7px; background: var(--cyan); border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.1s, background 0.2s;
  box-shadow: 0 0 10px var(--cyan); mix-blend-mode: screen;
  display: none;
}
.cursor-ring {
  width: 36px; height: 36px; border: 1.5px solid rgba(0,212,255,0.4); border-radius: 50%;
  position: fixed; pointer-events: none; z-index: 9997;
  transform: translate(-50%, -50%);
  transition: border-color 0.3s, width 0.3s var(--ease-out), height 0.3s var(--ease-out);
  display: none;
}
.cursor-dot.hovered  { transform: translate(-50%,-50%) scale(2.5); background: var(--blue-bright); }
.cursor-ring.hovered { width: 52px; height: 52px; border-color: rgba(0,102,255,0.6); }
.cursor-dot.clicking { transform: translate(-50%,-50%) scale(0.5); }

@media (hover: hover) and (pointer: fine) {
  body { cursor: none; }
  .cursor-dot, .cursor-ring { display: block; }
}

/* ═══════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════ */
.theme-toggle {
  position: fixed; top: 12px; right: 62px;
  z-index: 200;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: var(--cyan);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.3s var(--ease-smooth);
}
.theme-toggle:hover { border-color: var(--glass-border-hover); box-shadow: 0 0 20px var(--blue-glow); }
.theme-toggle svg { width: 16px; height: 16px; }
.icon-sun, .icon-moon { position: absolute; transition: opacity 0.3s, transform 0.3s; }
[data-theme="dark"]  .icon-moon { opacity: 0; transform: scale(0.5); }
[data-theme="dark"]  .icon-sun  { opacity: 1; }
[data-theme="light"] .icon-sun  { opacity: 0; transform: scale(0.5); }
[data-theme="light"] .icon-moon { opacity: 1; }

@media (min-width: 769px) {
  .theme-toggle { top: 20px; right: 20px; width: 42px; height: 42px; }
}

/* ═══════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════ */
#navbar {
  position: fixed; top: 0; left: 0; right: 0; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
  z-index: 100;
  transition: all 0.4s var(--ease-smooth);
}
#navbar.scrolled {
  background: var(--glass-bg);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 40px rgba(0,0,0,0.4);
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  cursor: pointer;
}
.nav-logo-k { color: var(--white); }
.nav-logo-rest { color: var(--text-2); }
.nav-logo-dot { color: var(--cyan); text-shadow: 0 0 12px var(--cyan); }

.nav-links { display: none; gap: 36px; list-style: none; align-items: center; }
.nav-link {
  font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 3px;
  color: var(--text-3); position: relative; padding-bottom: 4px; transition: color 0.2s;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
  background: linear-gradient(90deg, var(--blue), var(--cyan));
  transition: width 0.3s var(--ease-out);
}
.nav-link:hover, .nav-link.active { color: var(--white); }
.nav-link:hover::after, .nav-link.active::after { width: 100%; }

.nav-burger {
  display: flex; flex-direction: column; gap: 5px;
  cursor: pointer; padding: 6px; background: none; border: none;
}
.nav-burger span {
  width: 22px; height: 1.5px; background: var(--text-2); border-radius: 2px;
  display: block; transition: all 0.3s var(--ease-smooth);
}
.nav-burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nav-burger.open span:nth-child(2) { opacity: 0; transform: translateX(-6px); }
.nav-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.mobile-drawer {
  position: fixed; top: 0; right: -100%; bottom: 0;
  width: min(300px, 85vw);
  background: var(--glass-bg-2);
  backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
  border-left: 1px solid var(--glass-border);
  z-index: 99;
  transition: right 0.4s var(--ease-out);
  display: flex; flex-direction: column; justify-content: center;
}
.mobile-drawer.open { right: 0; }
.drawer-inner { padding: 48px 36px; display: flex; flex-direction: column; gap: 6px; }
.drawer-link {
  font-family: var(--font-display); font-size: 26px; font-weight: 700;
  color: var(--text-2); padding: 12px 0;
  border-bottom: 1px solid var(--glass-border);
  transition: color 0.2s, padding-left 0.3s;
}
.drawer-link:hover { color: var(--white); padding-left: 8px; }

@media (min-width: 769px) {
  #navbar { height: 66px; padding: 0 56px; }
  .nav-links { display: flex; }
  .nav-burger { display: none; }
}

/* ═══════════════════════════════════════════════════
   GLASS CARD
═══════════════════════════════════════════════════ */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  position: relative; overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s var(--ease-out);
}
.glass-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(0,102,255,0.5), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.glass-card:hover::before { opacity: 1; }
.glass-card:hover {
  border-color: var(--glass-border-hover);
  box-shadow: 0 0 0 1px rgba(0,212,255,0.08), 0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,102,255,0.08);
}

/* ═══════════════════════════════════════════════════
   SECTION BASE
═══════════════════════════════════════════════════ */
.section {
  padding: 90px 16px 80px;
  position: relative; z-index: 2;
}
@media (min-width: 769px) { .section { padding: 120px 56px 100px; } }
@media (min-width: 1100px) { .section { padding: 120px 80px 100px; } }

.section-label {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px;
  color: var(--blue-bright); text-shadow: 0 0 14px var(--blue-glow);
  margin-bottom: 14px;
  display: flex; align-items: center; gap: 14px;
}
.section-label::after {
  content: ''; flex: 1; max-width: 80px; height: 1px;
  background: linear-gradient(90deg, rgba(0,102,255,0.5), transparent);
}
.section-title {
  font-family: var(--font-display); font-weight: 800;
  font-size: clamp(36px, 8vw, 80px);
  color: var(--white); line-height: 1; letter-spacing: 1px;
  margin-bottom: 48px;
}
.grad-text {
  background: linear-gradient(135deg, var(--blue-bright), var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 20px var(--blue-glow));
}
.accent-dot { color: var(--cyan); text-shadow: 0 0 14px var(--cyan); }

/* ═══════════════════════════════════════════════════
   REVEAL ANIMATIONS
═══════════════════════════════════════════════════ */
.reveal-up {
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}
.reveal-left {
  opacity: 0; transform: translateX(-40px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}
.reveal-right {
  opacity: 0; transform: translateX(40px);
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
}
.reveal-up.visible, .reveal-left.visible, .reveal-right.visible {
  opacity: 1; transform: translate(0);
}
[data-delay="1"] { transition-delay: 0.1s; }
[data-delay="2"] { transition-delay: 0.2s; }
[data-delay="3"] { transition-delay: 0.3s; }

/* ═══════════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════════ */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--blue), var(--blue-bright));
  color: var(--white);
  padding: 14px 28px; border-radius: 10px; border: none;
  font-family: var(--font-mono); font-size: 12px; font-weight: 500;
  letter-spacing: 1.5px; cursor: pointer; text-decoration: none;
  box-shadow: 0 0 30px rgba(0,102,255,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.3s var(--ease-out);
  position: relative; overflow: hidden;
  -webkit-tap-highlight-color: transparent;
}
.btn-primary::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--cyan), var(--blue));
  opacity: 0; transition: opacity 0.3s;
}
.btn-primary:hover::after { opacity: 0.25; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(0,102,255,0.5); }
.btn-primary svg { width: 15px; height: 15px; flex-shrink: 0; position: relative; z-index: 1; }
.btn-primary span { position: relative; z-index: 1; }
.btn-full { width: 100%; justify-content: center; }

.btn-glass {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  color: var(--text); border: 1px solid var(--glass-border);
  padding: 14px 28px; border-radius: 10px;
  font-family: var(--font-mono); font-size: 12px; font-weight: 500;
  letter-spacing: 1.5px; cursor: pointer; text-decoration: none;
  transition: all 0.3s var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}
.btn-glass svg { width: 15px; height: 15px; flex-shrink: 0; }
.btn-glass:hover { border-color: var(--glass-border-hover); color: var(--cyan); transform: translateY(-3px); }

/* ═══════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════ */
#hero {
  min-height: 100svh;
  min-height: 100vh;
  padding: 0;
  display: flex; align-items: center;
  position: relative; overflow: hidden;
}

.hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.mesh-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.55;
  animation: orb-float var(--duration, 12s) ease-in-out infinite alternate;
  will-change: transform;
}
.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,102,255,0.4), transparent 70%); top: -20%; left: -10%; --duration: 14s; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(0,212,255,0.25), transparent 70%); top: 10%; right: 5%; --duration: 18s; animation-delay: -5s; }
.orb-3 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(0,50,180,0.3), transparent 70%); bottom: -10%; left: 35%; --duration: 20s; animation-delay: -8s; }
.orb-4 { width: 250px; height: 250px; background: radial-gradient(circle, rgba(77,159,255,0.2), transparent 70%); top: 50%; right: 30%; --duration: 16s; animation-delay: -3s; }
@keyframes orb-float {
  0%   { transform: translate(0,0) scale(1); }
  33%  { transform: translate(30px,-20px) scale(1.05); }
  66%  { transform: translate(-15px,25px) scale(0.97); }
  100% { transform: translate(10px,-10px) scale(1.02); }
}
#particle-canvas { position: absolute; inset: 0; pointer-events: none; }
.hero-grid-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--navy) 100%);
}

/* ── Hero Layout ──────────────────────────────────
   KEY FIX: overflow:hidden removed from hero-content
   so the card stack never clips the hero name text
   Instead we use proper flex constraints + min-width:0
   ─────────────────────────────────────────────────── */
.hero-content {
  position: relative; z-index: 2;
  width: 100%; max-width: 1420px; margin: 0 auto;
  padding: 80px 16px 50px;
  display: flex; flex-direction: column; align-items: center;
  gap: 40px;
}

/* Mobile: full-width centred text */
.hero-left {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  text-align: center;
  /* Ensure text is never occluded by anything */
  position: relative;
  z-index: 3;
}
.hero-cta  { justify-content: center; }
.hero-stats { justify-content: center; }

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2);
  backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 30px;
  font-family: var(--font-mono); font-size: 10px; color: var(--green); letter-spacing: 2px;
  margin-bottom: 20px;
  animation: badge-in 0.8s var(--ease-out) forwards; opacity: 0;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--green);
  box-shadow: 0 0 8px var(--green);
  animation: badge-pulse 2s ease-in-out infinite;
}
@keyframes badge-pulse {
  0%,100% { box-shadow: 0 0 8px var(--green); }
  50%      { box-shadow: 0 0 16px var(--green); }
}
@keyframes badge-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-greeting {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
  color: var(--text-3); margin-bottom: 14px;
  animation: greeting-in 0.9s 0.1s var(--ease-out) forwards; opacity: 0;
  /* FIX: prevent ticker from collapsing */
  white-space: nowrap;
}
.greeting-typed { color: var(--text-2); }
@keyframes greeting-in {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Hero Name ─────────────────────────────────────
   CRITICAL FIX: clamp ensures it never overflows
   viewport on any device (even 320px phones)
   ─────────────────────────────────────────────────── */
.hero-name {
  font-family: var(--font-display); font-weight: 900;
  line-height: 1.05; letter-spacing: -1px;
  /* Fluid: 36px @ 320px → 86px @ 1400px */
  font-size: clamp(36px, 9.5vw, 86px);
  margin-bottom: 20px;
  /* Prevent overflow at all costs */
  width: 100%;
  overflow: visible;
}
.name-row { display: block; overflow: visible; }
.name-word {
  display: inline-block; color: var(--white);
  animation: word-rise 0.9s var(--ease-out) forwards; opacity: 0;
}
#name-word-1 {
  animation-delay: 0.2s;
  text-shadow: 0 0 18px rgba(77,159,255,0.32), 0 0 42px rgba(0,102,255,0.18);
}
.name-accent {
  background: linear-gradient(135deg, var(--blue-bright) 0%, var(--cyan) 60%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 30px rgba(0,212,255,0.5));
  animation-delay: 0.35s;
}
.liquid-text { position: relative; }
.liquid-text::after {
  content: ''; position: absolute; bottom: -3px; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--blue), var(--cyan), var(--blue));
  background-size: 200% 100%; border-radius: 2px;
  animation: liquid-shimmer 2.5s ease-in-out infinite;
}
@keyframes liquid-shimmer {
  0%   { background-position: 0% 50%; opacity: 0.7; }
  50%  { background-position: 100% 50%; opacity: 1; }
  100% { background-position: 0% 50%; opacity: 0.7; }
}
@keyframes word-rise {
  from { opacity: 0; transform: translateY(50px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Roles Ticker ──────────────────────────────────
   FIX: Give ticker enough height so text doesn't clip
   ─────────────────────────────────────────────────── */
.hero-role-wrap {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  margin-bottom: 16px;
  animation: fade-up 0.9s 0.5s var(--ease-out) forwards; opacity: 0;
  /* Prevent layout shift */
  min-height: 28px;
}
.role-prefix { font-family: var(--font-mono); font-size: 14px; color: var(--blue-bright); flex-shrink: 0; }
/* FIX: was 20px — not enough for 13px font with line-height */
.hero-roles-ticker {
  position: relative;
  height: 26px; /* increased from 20px */
  overflow: hidden;
  min-width: 200px;
}
.role-item {
  position: absolute; top: 0; left: 0;
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 1px;
  color: var(--text-2); white-space: nowrap;
  transform: translateY(30px); opacity: 0;
  transition: transform 0.5s var(--ease-out), opacity 0.5s;
  line-height: 26px;
}
.role-item.active  { transform: translateY(0); opacity: 1; }
.role-item.exit    { transform: translateY(-30px); opacity: 0; }

.hero-bio {
  font-size: 13.5px; line-height: 1.9; color: var(--text-2);
  margin-bottom: 28px;
  animation: fade-up 0.9s 0.6s var(--ease-out) forwards; opacity: 0;
}
.hero-bio strong { color: var(--cyan); font-weight: 600; }

@keyframes fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-cta {
  display: flex; gap: 12px; flex-wrap: wrap;
  margin-bottom: 36px;
  animation: fade-up 0.9s 0.7s var(--ease-out) forwards; opacity: 0;
}

/* ── Stats ─────────────────────────────────────────
   FIX: Labels now show correctly — removed overflow:hidden
   ─────────────────────────────────────────────────── */
.hero-stats {
  display: flex; align-items: center; gap: 0;
  animation: fade-up 0.9s 0.85s var(--ease-out) forwards; opacity: 0;
}
.hstat {
  text-align: center;
  padding: 0 18px;
  min-width: 0;
}
.hstat:first-child { padding-left: 0; }
.hstat-num {
  display: block; font-family: var(--font-display);
  font-size: clamp(26px, 6.5vw, 36px); font-weight: 800;
  color: var(--white); line-height: 1;
  text-shadow: 0 0 20px var(--blue-glow);
}
/* FIX: Use nowrap so "Videos Edited" never gets truncated */
.hstat-label {
  font-family: var(--font-mono);
  font-size: 7.5px;
  letter-spacing: 2px;
  color: var(--text-3);
  margin-top: 5px;
  white-space: nowrap;
  display: block;
}
.hstat-div { width: 1px; height: 32px; background: var(--glass-border); flex-shrink: 0; }

/* ─── Hero Right ─────────────────────────────────── */
.hero-right {
  width: 100%;
  max-width: 380px;
  position: relative;
  animation: fade-up 1s 0.4s var(--ease-out) forwards; opacity: 0;
  /* FIX: never overflow its column */
  flex-shrink: 0;
}

/* Desktop stack: hidden on mobile */
.desktop-stack { display: none; }

/* ─── MOBILE CAROUSEL ────────────────────────────── */
.mobile-carousel {
  display: block;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.mc-track {
  display: flex;
  gap: 14px;
  transition: transform 0.42s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
}

.mc-card {
  flex: 0 0 calc(100% - 40px);
  min-width: 0;
  border-radius: 20px;
  overflow: hidden;
  background: var(--glass-bg-2);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  transition: box-shadow 0.35s, border-color 0.35s;
  scroll-snap-align: center;
}

.mc-card.active {
  border-color: rgba(0,212,255,0.35);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,102,255,0.18);
}

.mc-card .sc-preview { height: 170px; }

.mc-info {
  padding: 16px 18px 18px;
}
.mc-tag-row { margin-bottom: 7px; }

.mc-dots {
  display: flex; justify-content: center; gap: 7px;
  margin-top: 14px;
}
.mc-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--glass-border);
  transition: background 0.3s, transform 0.3s;
}
.mc-dot.active {
  background: var(--cyan);
  transform: scale(1.4);
  box-shadow: 0 0 8px var(--cyan);
}

/* ─── Card info shared ─────────────────────────────── */
.sc-tag {
  font-family: var(--font-mono); font-size: 8px; letter-spacing: 3px;
  color: var(--cyan); border: 1px solid rgba(0,212,255,0.3);
  padding: 2px 8px; border-radius: 4px; background: rgba(0,212,255,0.06);
  display: inline-block;
}
.sc-title {
  font-family: var(--font-display); font-size: 19px; font-weight: 700;
  color: var(--white); margin: 7px 0 4px;
}
.sc-desc { font-size: 11px; color: var(--text-3); margin-bottom: 9px; line-height: 1.6; }
.sc-tech { display: flex; gap: 5px; flex-wrap: wrap; }
.sc-tech span {
  font-family: var(--font-mono); font-size: 9px; letter-spacing: 1.5px;
  color: var(--blue-bright); border: 1px solid rgba(0,102,255,0.3);
  padding: 2px 8px; border-radius: 4px; background: rgba(0,102,255,0.08);
}

/* Orbit badges — hidden mobile, shown desktop */
.orbit-badge {
  display: none;
  position: absolute;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
  color: var(--text-2); background: var(--glass-bg);
  border: 1px solid var(--glass-border); backdrop-filter: blur(12px);
  padding: 6px 14px; border-radius: 30px;
  animation: orbit-float var(--dur, 6s) ease-in-out infinite alternate;
  z-index: 10;
}
.ob-java  { top: 5%;  right: -20px; --dur: 5s; color: var(--accent-gold); border-color: rgba(255,179,71,0.3); }
.ob-ae    { bottom: 30%; right: -30px; --dur: 7s; animation-delay: -2s; color: var(--accent-pink); border-color: rgba(255,107,157,0.3); }
.ob-nlp   { bottom: 10%; left: -20px; --dur: 6s; animation-delay: -1s; color: var(--accent-purple); border-color: rgba(167,139,250,0.3); }
.ob-js    { top: 30%; left: -30px; --dur: 8s; animation-delay: -3s; color: var(--cyan); border-color: rgba(0,212,255,0.3); }
@keyframes orbit-float {
  from { transform: translateY(0) rotate(-1deg); }
  to   { transform: translateY(-12px) rotate(1deg); }
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute; bottom: 28px; left: 20px;
  display: flex; align-items: center; gap: 14px;
  z-index: 3;
  animation: fade-up 1s 1.2s var(--ease-out) forwards; opacity: 0;
}
.scroll-line-anim {
  width: 1px; height: 36px;
  background: linear-gradient(to bottom, var(--blue), transparent);
  position: relative; overflow: hidden;
}
.scroll-line-anim::after {
  content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom, transparent, var(--cyan), transparent);
  animation: scroll-line-move 1.6s ease-in-out infinite;
}
@keyframes scroll-line-move { from { top: -100%; } to { top: 100%; } }
.scroll-indicator span {
  font-family: var(--font-mono); font-size: 9px; letter-spacing: 4px;
  color: var(--text-3); writing-mode: vertical-rl; transform: rotate(180deg);
}

/* ═══════════════════════════════════════════════════
   DESKTOP HERO — 769px+
   KEY: hero-left gets a real max-width, hero-right
   uses a fixed width so the name never gets clipped
═══════════════════════════════════════════════════ */
@media (min-width: 769px) {
  .hero-content {
    flex-direction: row;
    align-items: center;
    padding: 100px 56px 60px;
    gap: 48px;
  }
  .hero-left {
    /* FIXED: flex:1 + min-width:0 prevents overflow */
    flex: 1 1 0;
    min-width: 0;
    max-width: none;
    text-align: left;
  }
  .hero-role-wrap  { justify-content: flex-start; }
  .hero-cta        { justify-content: flex-start; }
  .hero-stats      { justify-content: flex-start; }

  /* Show desktop stack, hide mobile carousel */
  .desktop-stack    { display: block; }
  .mobile-carousel  { display: none; }
  .orbit-badge      { display: block; }

  .hero-right {
    flex: 0 0 300px;
    width: 300px;
    height: 420px;
    max-width: 300px;
  }
}

@media (min-width: 1024px) {
  .hero-content { padding: 100px 72px 60px; gap: 56px; }
  .hero-right   { flex: 0 0 320px; width: 320px; height: 440px; max-width: 320px; }
}

@media (min-width: 1280px) {
  .hero-content { padding: 100px 80px 60px; gap: 64px; }
  .hero-right   { flex: 0 0 340px; width: 340px; height: 460px; max-width: 340px; }
  /* Bigger name at large screens */
  .hero-name { font-size: clamp(52px, 5.5vw, 86px); }
}

/* ─── Desktop Card Stack ─────────────────────────── */
.card-stack {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1200px;
}

/* ── Motion-blur shuffle animation ── */
@keyframes card-shuffle-blur {
  0%   { filter: blur(0px);   }
  15%  { filter: blur(6px) brightness(1.4); transform-origin: 50% 80%; }
  50%  { filter: blur(3px) brightness(1.2); }
  100% { filter: blur(0px);   }
}

.stack-card {
  position: absolute; width: 100%; height: 100%;
  border-radius: 20px; overflow: hidden;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg-2);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  cursor: pointer; top: 0; left: 0;
  transform-origin: 50% 80%;
  transition:
    transform 0.72s var(--ease-spring),
    opacity   0.48s var(--ease-smooth),
    box-shadow 0.5s,
    filter    0.48s var(--ease-smooth);
  will-change: transform, opacity, filter;
}

/* Shuffling state — added via JS */
.stack-card.shuffling {
  animation: card-shuffle-blur 0.72s var(--ease-spring) forwards;
}

/* Positions */
.card-back-2 { transform: translate3d(-38px,22px,-60px) rotate(-9deg)  scale(0.87); z-index: 2; opacity: 0.55; filter: saturate(0.8)  brightness(0.82); }
.card-back-1 { transform: translate3d(-20px,10px,-30px) rotate(-4.5deg) scale(0.93); z-index: 4; opacity: 0.78; filter: saturate(0.9)  brightness(0.9); }
.card-front  { transform: translate3d(0,0,0)            rotate(0deg)    scale(1);    z-index: 6; opacity: 1;    filter: none; box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 40px rgba(0,102,255,0.22); }
.card-front:hover { transform: rotate(-1deg) translateY(-8px) scale(1.02); box-shadow: 0 40px 90px rgba(0,0,0,0.65), 0 0 60px rgba(0,102,255,0.38); }
.card-back-3 { transform: translate3d(22px,15px,-42px)  rotate(5.5deg)  scale(0.9);  z-index: 3; opacity: 0.65; filter: saturate(0.85) brightness(0.85); }
.card-back-4 { transform: translate3d(42px,30px,-78px)  rotate(11deg)   scale(0.83); z-index: 1; opacity: 0.42; filter: saturate(0.72) brightness(0.76); }

.sc-preview { width: 100%; height: 190px; position: relative; overflow: hidden; }
.sc-info {
  padding: 14px 16px;
  background: linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%);
}
.stack-card:not(.card-front) .sc-info { opacity: 0; transform: translateY(8px); pointer-events: none; }
.stack-card:not(.card-front) .sc-preview { height: 100%; }
.sc-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,212,255,0.08), transparent);
}

/* ═══════════════════════════════════════════════════
   PROJECT PREVIEW THUMBNAILS
═══════════════════════════════════════════════════ */

/* ── CyberType ── */
.preview-cybertype {
  background: linear-gradient(135deg, #030814, #071428, #0a1840);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;
  position: relative;
}
.preview-cybertype::before {
  content: '⌨';
  font-size: 36px;
  filter: drop-shadow(0 0 12px var(--cyan));
  animation: cyber-glow 2s ease-in-out infinite alternate;
}
.preview-cybertype::after {
  content: 'CYBER TYPE';
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 5px;
  color: var(--cyan); text-shadow: 0 0 14px var(--cyan), 0 0 28px rgba(0,212,255,0.3);
}
@keyframes cyber-glow {
  from { filter: drop-shadow(0 0 8px var(--cyan)); }
  to   { filter: drop-shadow(0 0 22px var(--cyan)) drop-shadow(0 0 40px rgba(0,212,255,0.5)); }
}

/* ── SortAnime ── */
.preview-sortanime {
  background: linear-gradient(160deg, #020814, #071020);
  display: flex; align-items: flex-end; justify-content: center;
  padding: 0 14px; gap: 5px; overflow: hidden; position: relative;
}
.preview-sortanime::before {
  content: '';
  position: absolute; inset: 0;
  background:
    linear-gradient(to top, rgba(0,102,255,0.08), transparent 60%),
    radial-gradient(ellipse at top, rgba(0,212,255,0.05), transparent 70%);
}
.preview-sortanime::after {
  content: '';
  width: 100%; height: 100%;
  background: repeating-linear-gradient(
    to right,
    transparent 0px, transparent 6px,
    rgba(0,102,255,0.5) 6px, rgba(0,102,255,0.5) 10px,
    transparent 10px, transparent 16px,
    rgba(0,212,255,0.4) 16px, rgba(0,212,255,0.4) 20px,
    transparent 20px, transparent 26px,
    rgba(0,130,255,0.6) 26px, rgba(0,130,255,0.6) 30px,
    transparent 30px, transparent 36px,
    rgba(0,212,255,0.35) 36px, rgba(0,212,255,0.35) 40px,
    transparent 40px, transparent 46px,
    rgba(0,102,255,0.7) 46px, rgba(0,102,255,0.7) 50px
  );
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect x='6' y='120' width='10' height='80'/%3E%3Crect x='22' y='90' width='10' height='110'/%3E%3Crect x='38' y='50' width='10' height='150'/%3E%3Crect x='54' y='100' width='10' height='100'/%3E%3Crect x='70' y='30' width='10' height='170'/%3E%3Crect x='86' y='70' width='10' height='130'/%3E%3Crect x='102' y='110' width='10' height='90'/%3E%3Crect x='118' y='55' width='10' height='145'/%3E%3Crect x='134' y='80' width='10' height='120'/%3E%3Crect x='150' y='40' width='10' height='160'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect x='6' y='120' width='10' height='80'/%3E%3Crect x='22' y='90' width='10' height='110'/%3E%3Crect x='38' y='50' width='10' height='150'/%3E%3Crect x='54' y='100' width='10' height='100'/%3E%3Crect x='70' y='30' width='10' height='170'/%3E%3Crect x='86' y='70' width='10' height='130'/%3E%3Crect x='102' y='110' width='10' height='90'/%3E%3Crect x='118' y='55' width='10' height='145'/%3E%3Crect x='134' y='80' width='10' height='120'/%3E%3Crect x='150' y='40' width='10' height='160'/%3E%3C/svg%3E");
  -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
  position: absolute; inset: 0; border-radius: 4px;
  box-shadow: 0 -4px 20px rgba(0,212,255,0.2);
}

/* ── DevCard ── */
.preview-devcard {
  background: radial-gradient(ellipse at 50% 30%, #0a1a30, #030a14);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px;
  position: relative;
}
.preview-devcard::before {
  content: '</>';
  font-family: var(--font-display); font-size: 46px; font-weight: 800;
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 18px rgba(0,212,255,0.4));
  animation: devcard-pulse 3s ease-in-out infinite alternate;
}
.preview-devcard::after {
  content: 'LIVE CLOCK · 3D TILT';
  font-family: var(--font-mono); font-size: 8px; letter-spacing: 2.5px; color: var(--text-3);
}
@keyframes devcard-pulse {
  from { filter: drop-shadow(0 0 10px rgba(0,212,255,0.3)); }
  to   { filter: drop-shadow(0 0 28px rgba(0,212,255,0.7)); }
}

/* ── Sakura Timer ── */
.preview-sakura {
  background: radial-gradient(ellipse at 50% 0%, #1a0820, #0a0514, #0a0a1e);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;
  position: relative; overflow: hidden;
}
.preview-sakura::before {
  content: '🌸';
  font-size: 42px;
  animation: sakura-float 3s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 14px rgba(255,150,180,0.6));
}
.preview-sakura::after {
  content: 'SAKURA TIMER';
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 4px;
  color: #ffb7c5; text-shadow: 0 0 16px rgba(255,150,180,0.5);
}
@keyframes sakura-float {
  from { transform: translateY(0) rotate(-5deg); }
  to   { transform: translateY(-8px) rotate(5deg); }
}

/* ── Wraith ── */
.preview-wraith {
  background: linear-gradient(180deg, #06060f, #0a0a18);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;
  position: relative; overflow: hidden;
}
.preview-wraith::before {
  content: '👁';
  font-size: 42px;
  filter: drop-shadow(0 0 18px rgba(100,100,220,0.5));
  animation: wraith-blink 4s ease-in-out infinite;
}
.preview-wraith::after {
  content: 'WRAITH';
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 6px;
  color: #8888cc; text-shadow: 0 0 16px rgba(100,100,200,0.4);
}
@keyframes wraith-blink {
  0%,45%,55%,100% { opacity: 1; }
  50% { opacity: 0.1; }
}

/* ── Sentiment ── */
.preview-sentiment {
  background: radial-gradient(ellipse at 60% 30%, #140d28, #0a0a1f, #0f1428);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px;
  position: relative;
}
.preview-sentiment::before {
  content: '🧠';
  font-size: 40px;
  filter: drop-shadow(0 0 16px rgba(167,139,250,0.5));
  animation: brain-pulse 2.5s ease-in-out infinite alternate;
}
.preview-sentiment::after {
  content: 'NLP · SENTIMENT';
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
  color: var(--accent-purple); text-shadow: 0 0 14px rgba(167,139,250,0.4);
}
@keyframes brain-pulse {
  from { filter: drop-shadow(0 0 8px rgba(167,139,250,0.4)); }
  to   { filter: drop-shadow(0 0 24px rgba(167,139,250,0.8)); }
}

/* ── MidSem Rush ── */
.preview-midsem {
  background: radial-gradient(ellipse at 40% 30%, #1a0a05, #100808, #0f0a18);
  display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;
  position: relative; overflow: hidden;
}
.preview-midsem::before {
  content: '🎮';
  font-size: 42px;
  filter: drop-shadow(0 0 14px rgba(255,160,60,0.5));
  animation: game-shake 0.5s ease-in-out infinite alternate;
}
.preview-midsem::after {
  content: 'MIDSEM RUSH';
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 4px;
  color: #ffaa44; text-shadow: 0 0 14px rgba(255,160,60,0.4);
}
@keyframes game-shake {
  from { transform: rotate(-2deg) scale(1); }
  to   { transform: rotate(2deg) scale(1.05); }
}

/* ═══════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════ */
.about-grid {
  display: flex; flex-direction: column; align-items: center;
  gap: 48px;
}
.about-left { display: flex; flex-direction: column; align-items: center; gap: 18px; }

.profile-ring-wrap { position: relative; }
.profile-ring {
  width: 180px; height: 180px; border-radius: 50%;
  padding: 3px;
  background: conic-gradient(var(--blue), var(--cyan), var(--blue-bright), var(--blue));
  animation: ring-spin 8s linear infinite;
}
@keyframes ring-spin { to { transform: rotate(360deg); } }
.profile-img {
  width: 100%; height: 100%; border-radius: 50%;
  object-fit: cover; border: 3px solid var(--navy); display: block;
}
.profile-fallback {
  width: 100%; height: 100%; border-radius: 50%;
  background: var(--surface); display: none;
  align-items: center; justify-content: center;
  font-size: 56px; border: 3px solid var(--navy);
}
.profile-glow {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,102,255,0.2), transparent 70%);
  animation: glow-pulse 4s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
  50%      { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
}

.about-status-badge {
  display: flex; align-items: center; gap: 8px;
  background: rgba(74,222,128,0.07); border: 1px solid rgba(74,222,128,0.2);
  padding: 7px 16px; border-radius: 30px;
  font-family: var(--font-mono); font-size: 10px; color: var(--green); letter-spacing: 2px;
}
.pulse-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--green); flex-shrink: 0;
  animation: badge-pulse 2s ease-in-out infinite;
}
.about-socials { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.soc-pill {
  display: flex; align-items: center; gap: 7px;
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 1px;
  color: var(--text-3); padding: 6px 14px; border-radius: 30px;
  border: 1px solid var(--glass-border); background: var(--glass-bg);
  backdrop-filter: blur(10px); text-decoration: none; transition: all 0.25s;
}
.soc-pill svg { width: 13px; height: 13px; }
.soc-pill:hover { border-color: var(--glass-border-hover); color: var(--cyan); transform: translateY(-2px); }

.about-right { width: 100%; }
.about-jp-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 5px; margin-bottom: 24px; text-align: center; }
.intro-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
.intro-card { display: flex; align-items: flex-start; gap: 10px; padding: 16px; }
.intro-card:hover { transform: translateY(-5px); }
.ic-icon { font-size: 20px; flex-shrink: 0; }
.ic-title { font-family: var(--font-mono); font-size: 10px; color: var(--text-2); letter-spacing: 2px; margin-bottom: 4px; }
.ic-sub { font-size: 11px; color: var(--text-3); line-height: 1.7; }
.about-bio-text { font-size: 13.5px; line-height: 2; color: var(--text); margin-bottom: 24px; }
.about-bio-text strong { color: var(--cyan); font-weight: 600; }
.about-info-list { display: flex; flex-direction: column; gap: 10px; }
.ai-row { display: flex; gap: 12px; align-items: baseline; flex-wrap: wrap; }
.ai-key { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 1.5px; min-width: 120px; flex-shrink: 0; }
.ai-val { font-size: 13px; color: var(--text); }

@media (min-width: 769px) {
  .about-grid { flex-direction: row; align-items: start; gap: 56px; }
  .about-left { min-width: 220px; }
  .about-jp-label { text-align: left; }
}

/* ═══════════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════════ */
.skills-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 600px) { .skills-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 900px) { .skills-grid { grid-template-columns: repeat(3, 1fr); } }

.skill-panel { padding: 28px; }
.skill-panel:hover { transform: translateY(-6px); }
.sp-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.sp-icon { font-size: 20px; }
.sp-title { font-family: var(--font-mono); font-size: 11px; color: var(--text-2); letter-spacing: 3px; }
.sp-title em { font-style: normal; color: var(--accent-gold); font-size: 9px; margin-left: 8px; }
.skill-bars { display: flex; flex-direction: column; gap: 16px; }
.sr-top { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--text); margin-bottom: 8px; }
.sr-track { height: 2px; background: rgba(0,102,255,0.1); border-radius: 2px; overflow: visible; position: relative; }
.sr-fill {
  height: 100%; width: 0; border-radius: 2px;
  background: var(--accent, var(--blue));
  transition: width 1.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-shadow: 0 0 8px var(--accent, var(--blue));
}
.sr-fill::after {
  content: ''; position: absolute; right: -4px; top: -4px;
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent, var(--blue)); box-shadow: 0 0 10px var(--accent, var(--blue));
}

/* ═══════════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════════ */
.projects-filter { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
.filter-pill {
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px;
  padding: 8px 18px; border-radius: 30px;
  border: 1px solid var(--glass-border); color: var(--text-3); cursor: pointer;
  background: var(--glass-bg); backdrop-filter: blur(10px);
  transition: all 0.25s; outline: none;
  -webkit-tap-highlight-color: transparent;
}
.filter-pill:hover, .filter-pill.active {
  border-color: var(--glass-border-hover); color: var(--cyan);
  background: rgba(0,212,255,0.07);
}

.projects-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 600px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1000px) { .projects-grid { grid-template-columns: repeat(3, 1fr); } }

.proj-card { padding: 0; overflow: hidden; }
.proj-card:hover { transform: translateY(-8px); }
.proj-card.hidden { display: none; }

.proj-preview { height: 180px; position: relative; overflow: hidden; display: block; }

.proj-overlay {
  position: absolute; inset: 0;
  background: rgba(3,8,20,0.75);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
  backdrop-filter: blur(4px);
}
.proj-card:hover .proj-overlay { opacity: 1; }
.proj-visit-btn {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
  color: var(--white); border: 1px solid rgba(255,255,255,0.3);
  padding: 9px 20px; border-radius: 8px;
  background: rgba(0,102,255,0.3); backdrop-filter: blur(10px);
  text-decoration: none; transition: all 0.2s;
}
.proj-visit-btn:hover { background: var(--blue); border-color: var(--blue); }

.proj-body { padding: 18px 20px; }
.proj-top-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.proj-emoji { font-size: 22px; }
.proj-cat-tag {
  font-family: var(--font-mono); font-size: 8px; letter-spacing: 2px;
  color: var(--blue-bright); border: 1px solid rgba(0,102,255,0.3);
  padding: 2px 8px; border-radius: 4px; background: rgba(0,102,255,0.08);
}
.proj-name { font-family: var(--font-display); font-size: 19px; font-weight: 700; color: var(--white); margin-bottom: 7px; }
.proj-desc { font-size: 12px; color: var(--text-2); line-height: 1.7; margin-bottom: 12px; }
.proj-tech { display: flex; flex-wrap: wrap; gap: 5px; }
.proj-tech span {
  font-family: var(--font-mono); font-size: 9px; letter-spacing: 1.5px;
  color: var(--text-3); border: 1px solid var(--glass-border);
  padding: 2px 9px; border-radius: 4px; background: rgba(0,0,0,0.2);
}

/* ═══════════════════════════════════════════════════
   REEL
═══════════════════════════════════════════════════ */
.reel-tabs { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
.reel-tab {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
  padding: 10px 22px; border-radius: 8px;
  border: 1px solid var(--glass-border); color: var(--text-3); cursor: pointer;
  background: var(--glass-bg); backdrop-filter: blur(12px);
  transition: all 0.25s; outline: none;
  -webkit-tap-highlight-color: transparent;
}
.reel-tab.active, .reel-tab:hover { border-color: var(--glass-border-hover); color: var(--cyan); background: rgba(0,212,255,0.07); }
.reel-panel { display: none; }
.reel-panel.active { display: block; }
.reel-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 600px) { .reel-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1000px) { .reel-grid { grid-template-columns: repeat(3, 1fr); } }
.reel-card { overflow: hidden; }
.reel-card:hover { transform: translateY(-6px); }
.reel-frame { width: 100%; aspect-ratio: 16/9; background: var(--surface); overflow: hidden; }
.reel-frame iframe { width: 100%; height: 100%; border: none; display: block; }
.reel-info { padding: 14px 18px; }
.reel-title { font-size: 13px; color: var(--white); font-weight: 600; margin-bottom: 4px; }
.reel-sub { font-family: var(--font-mono); font-size: 9px; color: var(--text-3); letter-spacing: 2px; }

/* ═══════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════ */
.contact-grid { display: flex; flex-direction: column; gap: 40px; }
@media (min-width: 769px) { .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; } }

.contact-intro { font-size: 14px; line-height: 2; color: var(--text-2); margin-bottom: 28px; }
.contact-links { display: flex; flex-direction: column; gap: 10px; }
.clink {
  display: flex; align-items: center; gap: 14px;
  text-decoration: none; padding: 14px 18px;
  transition: all 0.25s; color: var(--text);
}
.clink:hover { transform: translateX(8px); border-color: var(--glass-border-hover) !important; }
.cl-icon {
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid var(--glass-border); background: rgba(0,102,255,0.08);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: var(--cyan); flex-shrink: 0;
  font-family: var(--font-mono); font-weight: 600; transition: all 0.25s;
}
.clink:hover .cl-icon { background: rgba(0,212,255,0.12); border-color: rgba(0,212,255,0.3); }
.cl-label { font-family: var(--font-mono); font-size: 9px; color: var(--text-3); letter-spacing: 2px; margin-bottom: 3px; }
.cl-val { font-size: 13px; color: var(--text); }

.contact-form { padding: 32px; position: relative; }
.cf-shimmer {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--blue), var(--cyan), var(--blue), transparent);
  background-size: 200% 100%;
  animation: shimmer-move 3s ease-in-out infinite;
}
@keyframes shimmer-move {
  0%   { background-position: -100% 0; opacity: 0.5; }
  50%  { background-position: 100% 0; opacity: 1; }
  100% { background-position: -100% 0; opacity: 0.5; }
}
.form-field { margin-bottom: 16px; }
.form-field label { display: block; font-family: var(--font-mono); font-size: 9px; color: var(--text-3); letter-spacing: 3.5px; margin-bottom: 7px; }
.form-field input, .form-field textarea, .form-field select {
  width: 100%; background: rgba(3,8,20,0.6); backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border); border-radius: 10px; padding: 12px 14px;
  color: var(--text); font-family: var(--font-mono); font-size: 13px;
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical; -webkit-appearance: none; appearance: none;
}
.form-field select { cursor: pointer; }
.form-field select option { background: var(--surface); color: var(--text); }
.form-field input:focus, .form-field textarea:focus, .form-field select:focus {
  border-color: rgba(0,212,255,0.4); box-shadow: 0 0 0 3px rgba(0,102,255,0.1);
}
.form-field input::placeholder, .form-field textarea::placeholder { color: var(--text-3); }
[data-theme="light"] .form-field input,
[data-theme="light"] .form-field textarea,
[data-theme="light"] .form-field select { background: rgba(255,255,255,0.8); }
.form-msg { font-family: var(--font-mono); font-size: 11px; text-align: center; margin-top: 10px; min-height: 16px; }

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
footer {
  text-align: center; padding: 56px 24px;
  border-top: 1px solid var(--glass-border);
  position: relative; z-index: 2;
}
.footer-inner { max-width: 600px; margin: 0 auto; }
.footer-logo { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--white); letter-spacing: 4px; margin-bottom: 10px; }
.footer-dot { color: var(--cyan); text-shadow: 0 0 12px var(--cyan); }
.footer-motto { font-family: var(--font-mono); font-size: 11px; font-style: italic; color: var(--text-3); letter-spacing: 2px; margin-bottom: 24px; }
.footer-links { display: flex; gap: 24px; justify-content: center; margin-bottom: 18px; flex-wrap: wrap; }
.footer-links a { font-family: var(--font-mono); font-size: 10px; color: var(--text-3); letter-spacing: 2.5px; transition: color 0.2s; }
.footer-links a:hover { color: var(--cyan); }
.footer-copy { font-family: var(--font-mono); font-size: 10px; color: var(--muted); letter-spacing: 1.5px; }

/* ═══════════════════════════════════════════════════
   THANK YOU OVERLAY
═══════════════════════════════════════════════════ */
.thankyou-overlay {
  position: fixed; inset: 0;
  background: rgba(3,8,20,0.92);
  backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
  z-index: 2000; display: none;
  align-items: center; justify-content: center;
}
.thankyou-overlay.show { display: flex; }
.ty-card {
  text-align: center; max-width: 340px; width: 90%;
  padding: 48px 40px;
  animation: ty-in 0.5s var(--ease-spring) forwards;
}
@keyframes ty-in {
  from { transform: scale(0.85) translateY(20px); opacity: 0; }
  to   { transform: scale(1) translateY(0); opacity: 1; }
}
.ty-icon { font-size: 46px; margin-bottom: 18px; display: block; animation: ty-icon-float 2s ease-in-out infinite alternate; }
@keyframes ty-icon-float { from { transform: translateY(0); } to { transform: translateY(-8px); } }
.ty-title { font-family: var(--font-display); font-size: 30px; font-weight: 800; color: var(--white); letter-spacing: 2px; margin-bottom: 12px; }
.ty-sub { font-size: 13px; color: var(--text-2); line-height: 1.9; margin-bottom: 26px; }

/* ═══════════════════════════════════════════════════
   LIGHT THEME EXTRAS
═══════════════════════════════════════════════════ */
[data-theme="light"] #navbar.scrolled { background: rgba(240,244,255,0.88); border-bottom-color: rgba(0,102,255,0.1); }
[data-theme="light"] .orb-1 { background: radial-gradient(circle, rgba(0,102,255,0.12), transparent 70%); }
[data-theme="light"] .orb-2 { background: radial-gradient(circle, rgba(0,212,255,0.1), transparent 70%); }
[data-theme="light"] .section-title { color: var(--text); }
[data-theme="light"] .hero-name .name-word { color: var(--text); }
[data-theme="light"] .stack-card { background: rgba(255,255,255,0.85); border-color: rgba(0,102,255,0.15); }
[data-theme="light"] .sc-info { background: linear-gradient(180deg, #fff 0%, #f5f8ff 100%); }
