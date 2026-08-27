/* ==========================================================================
   SAKURA LATTE WALLPAPER ENGINE — Animated Light-Mode Generative Backgrounds
   ========================================================================== */

const canvas = document.getElementById('wp-canvas');
const ctx = canvas.getContext('2d');
const wpContainer = document.getElementById('wp-container');

let W, H;
let wpPaused = false;
let currentWpIndex = 0;
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* ===== PARTICLE SYSTEMS ===== */

// Sakura Petal System
class SakuraPetal {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * (W + 200) - 100;
    this.y = init ? Math.random() * H : -20;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 0.8 + 0.3;
    this.speedX = Math.random() * 0.5 + 0.2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.015 + 0.008;
    this.wobbleAmp = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    const pinks = ['rgba(220,138,120,', 'rgba(234,118,203,', 'rgba(221,120,120,', 'rgba(245,224,220,'];
    this.color = pinks[Math.floor(Math.random() * pinks.length)];
  }
  update() {
    this.y += this.speedY;
    this.wobble += this.wobbleSpeed;
    this.x += this.speedX + Math.sin(this.wobble) * this.wobbleAmp;
    this.rotation += this.rotSpeed;
    if (this.y > H + 30 || this.x > W + 100) this.reset(false);
  }
  draw(c) {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.rotation);
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color + '0.7)';
    // Petal shape
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(this.size * 0.3, -this.size * 0.5, this.size * 0.8, -this.size * 0.3, this.size, 0);
    c.bezierCurveTo(this.size * 0.8, this.size * 0.3, this.size * 0.3, this.size * 0.5, 0, 0);
    c.fill();
    c.restore();
  }
}

// Snowflake System
class Snowflake {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : -10;
    this.size = Math.random() * 3.5 + 1;
    this.speedY = Math.random() * 0.6 + 0.2;
    this.drift = (Math.random() - 0.5) * 0.3;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.01 + 0.005;
    this.opacity = Math.random() * 0.5 + 0.15;
  }
  update() {
    this.y += this.speedY;
    this.wobble += this.wobbleSpeed;
    this.x += this.drift + Math.sin(this.wobble) * 0.4;
    if (this.y > H + 10) this.reset(false);
    if (this.x < -10) this.x = W + 10;
    if (this.x > W + 10) this.x = -10;
  }
  draw(c) {
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = 'rgba(255, 255, 255, 0.9)';
    c.shadowBlur = 4;
    c.shadowColor = 'rgba(114, 135, 253, 0.3)';
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
}

// Firefly System
class Firefly {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 3 + 1.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.phase = Math.random() * Math.PI * 2;
    this.phaseSpeed = Math.random() * 0.02 + 0.008;
    this.maxOpacity = Math.random() * 0.5 + 0.2;
    this.life = 0;
    this.lifespan = Math.random() * 400 + 200;
    const golds = ['rgba(223,142,29,', 'rgba(254,100,11,', 'rgba(220,138,120,', 'rgba(64,160,43,'];
    this.color = golds[Math.floor(Math.random() * golds.length)];
  }
  update() {
    this.x += this.vx + Math.sin(this.phase * 0.7) * 0.15;
    this.y += this.vy + Math.cos(this.phase) * 0.1;
    this.phase += this.phaseSpeed;
    this.life++;
    if (this.life > this.lifespan || this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
      this.reset(true);
    }
  }
  draw(c) {
    const fadeIn = Math.min(1, this.life / 60);
    const fadeOut = Math.min(1, (this.lifespan - this.life) / 60);
    const pulse = 0.5 + 0.5 * Math.sin(this.phase * 3);
    const alpha = this.maxOpacity * fadeIn * fadeOut * (0.4 + 0.6 * pulse);
    c.save();
    c.globalAlpha = alpha;
    const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
    grad.addColorStop(0, this.color + '0.8)');
    grad.addColorStop(0.4, this.color + '0.2)');
    grad.addColorStop(1, this.color + '0)');
    c.fillStyle = grad;
    c.beginPath();
    c.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    c.fill();
    // Core dot
    c.globalAlpha = alpha * 1.5;
    c.fillStyle = this.color + '0.9)';
    c.beginPath();
    c.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
}

// Raindrop System
class Raindrop {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * (W + 100) - 50;
    this.y = init ? Math.random() * H : -20;
    this.length = Math.random() * 14 + 6;
    this.speed = Math.random() * 4 + 3;
    this.opacity = Math.random() * 0.2 + 0.05;
    this.width = Math.random() * 1 + 0.5;
  }
  update() {
    this.y += this.speed;
    this.x -= this.speed * 0.15; // slight angle
    if (this.y > H + 20) this.reset(false);
  }
  draw(c) {
    c.save();
    c.globalAlpha = this.opacity;
    c.strokeStyle = 'rgba(114, 135, 253, 0.5)';
    c.lineWidth = this.width;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x + this.length * 0.15, this.y - this.length);
    c.stroke();
    c.restore();
  }
}

// Floating Bubble System
class Bubble {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : H + 20;
    this.size = Math.random() * 20 + 8;
    this.speedY = -(Math.random() * 0.3 + 0.1);
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.008 + 0.003;
    this.opacity = Math.random() * 0.12 + 0.03;
    const colors = [
      'rgba(220,138,120,', 'rgba(114,135,253,',
      'rgba(23,146,153,', 'rgba(234,118,203,',
      'rgba(4,165,229,', 'rgba(64,160,43,'
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.y += this.speedY;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.3;
    if (this.y < -this.size * 2) this.reset(false);
  }
  draw(c) {
    c.save();
    c.globalAlpha = this.opacity;
    // Gradient ring effect
    c.strokeStyle = this.color + '0.4)';
    c.lineWidth = 1;
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.stroke();
    // Inner fill
    const grad = c.createRadialGradient(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.1, this.x, this.y, this.size);
    grad.addColorStop(0, this.color + '0.15)');
    grad.addColorStop(0.7, this.color + '0.03)');
    grad.addColorStop(1, this.color + '0)');
    c.fillStyle = grad;
    c.fill();
    // Highlight
    c.globalAlpha = this.opacity * 1.5;
    c.fillStyle = 'rgba(255,255,255,0.4)';
    c.beginPath();
    c.arc(this.x - this.size * 0.25, this.y - this.size * 0.25, this.size * 0.15, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
}

// Pre-create particle pools
const sakuraPetals = Array.from({ length: 35 }, () => new SakuraPetal());
const snowflakes = Array.from({ length: 80 }, () => new Snowflake());
const fireflies = Array.from({ length: 30 }, () => new Firefly());
const raindrops = Array.from({ length: 120 }, () => new Raindrop());
const bubbles = Array.from({ length: 18 }, () => new Bubble());

/* ===== WALLPAPER THEMES ===== */
const WALLPAPERS = [
  {
    name: 'Sakura Morning',
    particles: sakuraPetals,
    render: (c, time) => {
      const bgGrad = c.createLinearGradient(0, 0, W * 0.3, H);
      bgGrad.addColorStop(0, '#f5f0f0');
      bgGrad.addColorStop(0.4, '#f5eff3');
      bgGrad.addColorStop(0.7, '#f0eef5');
      bgGrad.addColorStop(1, '#f3f0f0');
      c.fillStyle = bgGrad;
      c.fillRect(0, 0, W, H);

      // Warm rosewater glow
      const glow = c.createRadialGradient(W * 0.75, H * 0.25, 30, W * 0.75, H * 0.25, W * 0.5);
      glow.addColorStop(0, 'rgba(220,138,120,0.08)');
      glow.addColorStop(0.5, 'rgba(220,138,120,0.03)');
      glow.addColorStop(1, 'transparent');
      c.fillStyle = glow;
      c.fillRect(0, 0, W, H);

      // Soft pink bottom glow
      const glow2 = c.createRadialGradient(W * 0.3, H * 0.85, 20, W * 0.3, H * 0.85, W * 0.4);
      glow2.addColorStop(0, 'rgba(234,118,203,0.04)');
      glow2.addColorStop(1, 'transparent');
      c.fillStyle = glow2;
      c.fillRect(0, 0, W, H);
    }
  },
  {
    name: 'Winter Snowfall',
    particles: snowflakes,
    render: (c, time) => {
      // Cool blue-white gradient
      const bgGrad = c.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#e8ecf4');
      bgGrad.addColorStop(0.3, '#eaeff7');
      bgGrad.addColorStop(0.6, '#edf1f8');
      bgGrad.addColorStop(1, '#e6eaf3');
      c.fillStyle = bgGrad;
      c.fillRect(0, 0, W, H);

      // Subtle blue orb
      const orb = c.createRadialGradient(W * 0.6, H * 0.3, 20, W * 0.6, H * 0.3, W * 0.45);
      orb.addColorStop(0, 'rgba(114,135,253,0.05)');
      orb.addColorStop(0.5, 'rgba(114,135,253,0.02)');
      orb.addColorStop(1, 'transparent');
      c.fillStyle = orb;
      c.fillRect(0, 0, W, H);

      // Soft white ground glow
      const ground = c.createRadialGradient(W * 0.5, H + 50, 50, W * 0.5, H, W * 0.8);
      ground.addColorStop(0, 'rgba(255,255,255,0.15)');
      ground.addColorStop(1, 'transparent');
      c.fillStyle = ground;
      c.fillRect(0, 0, W, H);
    }
  },
  {
    name: 'Firefly Garden',
    particles: fireflies,
    render: (c, time) => {
      // Warm cream-green gradient
      const bgGrad = c.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#f0f3ed');
      bgGrad.addColorStop(0.4, '#eef2ea');
      bgGrad.addColorStop(0.7, '#f2f0e8');
      bgGrad.addColorStop(1, '#eef0eb');
      c.fillStyle = bgGrad;
      c.fillRect(0, 0, W, H);

      // Golden warm glow
      const glow = c.createRadialGradient(W * 0.4, H * 0.6, 30, W * 0.4, H * 0.6, W * 0.5);
      glow.addColorStop(0, 'rgba(223,142,29,0.05)');
      glow.addColorStop(0.5, 'rgba(223,142,29,0.02)');
      glow.addColorStop(1, 'transparent');
      c.fillStyle = glow;
      c.fillRect(0, 0, W, H);

      // Soft green ambient
      const glow2 = c.createRadialGradient(W * 0.8, H * 0.3, 20, W * 0.8, H * 0.3, W * 0.35);
      glow2.addColorStop(0, 'rgba(64,160,43,0.04)');
      glow2.addColorStop(1, 'transparent');
      c.fillStyle = glow2;
      c.fillRect(0, 0, W, H);

      // Gentle flowing grass-like waves at bottom
      for (let i = 0; i < 4; i++) {
        c.save();
        c.beginPath();
        const yBase = H * 0.82 + i * 25;
        c.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 12) {
          const wave = Math.sin(x * 0.005 + time * 0.0006 + i * 0.9) * 10;
          const wave2 = Math.cos(x * 0.008 - time * 0.0004 + i * 0.4) * 5;
          c.lineTo(x, yBase + wave + wave2);
        }
        c.lineTo(W, H);
        c.lineTo(0, H);
        c.closePath();
        c.fillStyle = `rgba(64,160,43,${0.015 + i * 0.006})`;
        c.fill();
        c.restore();
      }
    }
  },
  {
    name: 'Gentle Rain',
    particles: raindrops,
    render: (c, time) => {
      // Cool lavender-grey
      const bgGrad = c.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#e5e7f0');
      bgGrad.addColorStop(0.4, '#e9ebf2');
      bgGrad.addColorStop(0.7, '#e3e6ef');
      bgGrad.addColorStop(1, '#e0e3ec');
      c.fillStyle = bgGrad;
      c.fillRect(0, 0, W, H);

      // Moody lavender cloud
      const cloud = c.createRadialGradient(W * 0.5, H * 0.15, 50, W * 0.5, H * 0.15, W * 0.6);
      cloud.addColorStop(0, 'rgba(114,135,253,0.04)');
      cloud.addColorStop(0.4, 'rgba(136,57,239,0.02)');
      cloud.addColorStop(1, 'transparent');
      c.fillStyle = cloud;
      c.fillRect(0, 0, W, H);

      // Subtle puddle reflections at bottom
      for (let i = 0; i < 5; i++) {
        const px = W * (0.1 + i * 0.2) + Math.sin(time * 0.001 + i) * 20;
        const py = H * 0.92 + Math.cos(time * 0.0015 + i) * 5;
        const puddle = c.createRadialGradient(px, py, 2, px, py, 40 + Math.sin(time * 0.002 + i) * 8);
        puddle.addColorStop(0, 'rgba(114,135,253,0.04)');
        puddle.addColorStop(1, 'transparent');
        c.fillStyle = puddle;
        c.beginPath();
        c.ellipse(px, py, 50, 15, 0, 0, Math.PI * 2);
        c.fill();
      }
    }
  },
  {
    name: 'Lavender Bubbles',
    particles: bubbles,
    render: (c, time) => {
      // Soft lavender base
      const bgGrad = c.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#f0eef8');
      bgGrad.addColorStop(0.5, '#eeedf6');
      bgGrad.addColorStop(1, '#f2f0f8');
      c.fillStyle = bgGrad;
      c.fillRect(0, 0, W, H);

      // Lavender center glow
      const glow = c.createRadialGradient(W * 0.5, H * 0.4, 30, W * 0.5, H * 0.4, W * 0.5);
      glow.addColorStop(0, 'rgba(136,57,239,0.04)');
      glow.addColorStop(0.5, 'rgba(114,135,253,0.02)');
      glow.addColorStop(1, 'transparent');
      c.fillStyle = glow;
      c.fillRect(0, 0, W, H);

      // Teal accent bottom
      const glow2 = c.createRadialGradient(W * 0.2, H * 0.8, 20, W * 0.2, H * 0.8, W * 0.35);
      glow2.addColorStop(0, 'rgba(23,146,153,0.03)');
      glow2.addColorStop(1, 'transparent');
      c.fillStyle = glow2;
      c.fillRect(0, 0, W, H);
    }
  },
  {
    name: 'Minimal Cream',
    particles: [],
    render: (c, time) => {
      c.fillStyle = '#eff1f5';
      c.fillRect(0, 0, W, H);
      // Very subtle animated gradient
      const t = time * 0.0003;
      const cx = W * (0.4 + 0.1 * Math.sin(t));
      const cy = H * (0.4 + 0.1 * Math.cos(t * 0.7));
      const grad = c.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.6);
      grad.addColorStop(0, 'rgba(220,138,120,0.03)');
      grad.addColorStop(0.5, 'rgba(114,135,253,0.015)');
      grad.addColorStop(1, 'transparent');
      c.fillStyle = grad;
      c.fillRect(0, 0, W, H);
    }
  },
  {
    name: 'Aurora Drift',
    particles: [],
    render: (c, time) => {
      // Base
      const bgGrad = c.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#eef1f6');
      bgGrad.addColorStop(1, '#eff1f5');
      c.fillStyle = bgGrad;
      c.fillRect(0, 0, W, H);

      // Animated aurora bands
      for (let i = 0; i < 5; i++) {
        c.save();
        c.beginPath();
        const yBase = H * 0.2 + i * H * 0.12;
        c.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 10) {
          const wave1 = Math.sin(x * 0.002 + time * 0.0003 + i * 1.5) * 30;
          const wave2 = Math.cos(x * 0.004 - time * 0.0002 + i * 0.8) * 15;
          const wave3 = Math.sin(x * 0.001 + time * 0.0005) * 20;
          c.lineTo(x, yBase + wave1 + wave2 + wave3);
        }
        c.lineTo(W, yBase + 80);
        for (let x = W; x >= 0; x -= 10) {
          const wave1 = Math.sin(x * 0.002 + time * 0.0003 + i * 1.5 + 1) * 25;
          const wave2 = Math.cos(x * 0.004 - time * 0.0002 + i * 0.8 + 0.5) * 12;
          c.lineTo(x, yBase + 60 + wave1 + wave2);
        }
        c.closePath();

        const colors = [
          'rgba(23,146,153,',    // teal
          'rgba(114,135,253,',   // lavender
          'rgba(136,57,239,',    // mauve
          'rgba(234,118,203,',   // pink
          'rgba(64,160,43,'      // green
        ];
        const col = colors[i % colors.length];
        c.fillStyle = col + `${0.02 + Math.sin(time * 0.001 + i) * 0.008})`;
        c.fill();
        c.restore();
      }
    }
  }
];

/* ===== MAIN RENDER LOOP ===== */
function drawWallpaper(time) {
  if (wpPaused) {
    requestAnimationFrame(drawWallpaper);
    return;
  }

  const wp = WALLPAPERS[currentWpIndex];

  // Draw base
  wp.render(ctx, time);

  // Draw particles
  if (wp.particles && wp.particles.length) {
    wp.particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });
  }

  requestAnimationFrame(drawWallpaper);
}

requestAnimationFrame(drawWallpaper);

document.addEventListener('visibilitychange', () => {
  wpPaused = document.hidden;
});

function updateWpName() {
  const el = document.getElementById('wp-name');
  if (el) el.textContent = WALLPAPERS[currentWpIndex].name;
}

function cycleWallpaper() {
  currentWpIndex = (currentWpIndex + 1) % WALLPAPERS.length;
  updateWpName();
  if (typeof showNotif === 'function') {
    showNotif('Hyprpaper', `Switched wallpaper: ${WALLPAPERS[currentWpIndex].name}`);
  }
}

function setWallpaper(target) {
  if (typeof target === 'number') {
    currentWpIndex = Math.max(0, Math.min(target, WALLPAPERS.length - 1));
  } else if (typeof target === 'string') {
    const q = target.toLowerCase();
    const idx = WALLPAPERS.findIndex(w => w.name.toLowerCase().includes(q));
    if (idx !== -1) currentWpIndex = idx;
  }
  updateWpName();
  if (typeof showNotif === 'function') {
    showNotif('Hyprpaper', `Wallpaper: ${WALLPAPERS[currentWpIndex].name}`);
  }
  return WALLPAPERS[currentWpIndex].name;
}
