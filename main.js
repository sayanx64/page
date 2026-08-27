/* ==========================================================================
   MAIN SYSTEM ORCHESTRATION & KEYBINDING DISPATCHER
   ========================================================================== */

let lOpen = false;
let selI = 0;
const lInput = document.getElementById('l-input');
const lResults = document.getElementById('l-results');
const launcherModal = document.getElementById('launcher');
const quickSettings = document.getElementById('quick-settings');
const calPopover = document.getElementById('cal-popover');
const exposeOverlay = document.getElementById('expose-overlay');

/* Rofi Application Launcher */
function renderLauncher(q = '') {
  q = q.toLowerCase().trim();
  const filtered = APPS.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.desc.toLowerCase().includes(q) ||
    a.id.toLowerCase().includes(q)
  );

  selI = 0;
  lResults.innerHTML = filtered.map((a, i) => `
    <div class="app-row${i === 0 ? ' sel' : ''}" data-id="${a.id}">
      <div class="app-ico" style="background:${a.bg};color:${a.color}">
        ${ICONS[a.icon] || ''}
      </div>
      <div>
        <div class="app-name">${a.name}</div>
        <div class="app-desc">${a.desc}</div>
      </div>
    </div>
  `).join('');

  lResults.querySelectorAll('.app-row').forEach(r => {
    r.addEventListener('click', () => {
      const app = APPS.find(a => a.id === r.dataset.id);
      if (app) {
        closeLauncher();
        app.open();
      }
    });
  });

  return filtered;
}

function openLauncher() {
  launcherModal.classList.add('show');
  lInput.value = '';
  renderLauncher();
  setTimeout(() => lInput.focus(), 50);
  lOpen = true;
}

function closeLauncher() {
  launcherModal.classList.remove('show');
  lOpen = false;
}

lInput.addEventListener('input', () => renderLauncher(lInput.value));

lInput.addEventListener('keydown', e => {
  const rows = lResults.querySelectorAll('.app-row');
  if (!rows.length) return;

  if (e.key === 'ArrowDown') {
    selI = Math.min(selI + 1, rows.length - 1);
    e.preventDefault();
  }
  if (e.key === 'ArrowUp') {
    selI = Math.max(selI - 1, 0);
    e.preventDefault();
  }

  rows.forEach((r, i) => r.classList.toggle('sel', i === selI));

  if (e.key === 'Enter') {
    const s = rows[selI];
    if (s) {
      const app = APPS.find(a => a.id === s.dataset.id);
      if (app) {
        closeLauncher();
        app.open();
      }
    }
  }

  if (e.key === 'Escape') closeLauncher();
});

launcherModal.addEventListener('click', e => {
  if (e.target === launcherModal) closeLauncher();
});

document.getElementById('launcher-btn').addEventListener('click', () => {
  lOpen ? closeLauncher() : openLauncher();
});

/* Dock Behavior */
const dock = document.getElementById('dock');
dock.addEventListener('mousemove', e => {
  const items = dock.querySelectorAll('.dk-item');
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(e.clientX - center);
    const maxDist = 120;
    if (dist < maxDist) {
      const ratio = 1 - (dist / maxDist);
      const scale = 1 + 0.35 * Math.pow(ratio, 1.5);
      const lift = (scale - 1) * 20;
      item.style.transform = `scale(${scale}) translateY(${-lift}px)`;
    } else {
      item.style.transform = '';
    }
  });
});

dock.addEventListener('mouseleave', () => {
  dock.querySelectorAll('.dk-item').forEach(item => {
    item.style.transform = '';
  });
});

dock.querySelectorAll('.dk-item[data-app]').forEach(d => {
  d.addEventListener('click', () => {
    const id = d.dataset.app;
    if (wins[id]) {
      if (wins[id].style.display === 'none') {
        showWin(id);
      } else {
        focusWin(wins[id]);
      }
    } else {
      const app = APPS.find(a => a.id === id);
      if (app) app.open();
    }
  });
});

document.getElementById('dk-launcher').addEventListener('click', () => {
  lOpen ? closeLauncher() : openLauncher();
});

/* Context Menu */
const ctxMenu = document.getElementById('ctx');
document.getElementById('desktop').addEventListener('contextmenu', e => {
  e.preventDefault();
  ctxMenu.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px';
  ctxMenu.style.top = Math.min(e.clientY, window.innerHeight - 260) + 'px';
  ctxMenu.classList.remove('show');
  void ctxMenu.offsetWidth;
  ctxMenu.classList.add('show');
});

document.addEventListener('click', e => {
  if (!ctxMenu.contains(e.target)) ctxMenu.classList.remove('show');
});

ctxMenu.querySelectorAll('.ctx-i').forEach(item => {
  item.addEventListener('click', () => {
    const action = item.dataset.a;
    ctxMenu.classList.remove('show');
    if (action === 'launcher') openLauncher();
    if (action === 'about') openAbout();
    if (action === 'projects') openProjects();
    if (action === 'research') openResearch();
    if (action === 'terminal') openTerminal();
    if (action === 'editor') openEditor();
    if (action === 'wp') cycleWallpaper();
    if (action === 'tile') toggleGlobalTiling();
    if (action === 'gh') window.open('https://github.com/sayanx64', '_blank');
    if (action === 'lc') window.open('https://leetcode.com/sayarch', '_blank');
    if (action === 'li') window.open('https://linkedin.com/in/sayarch', '_blank');
  });
});

/* Workspaces Module */
const wsContainer = document.getElementById('ws-container');
[1, 2, 3, 4, 5].forEach(n => {
  const btn = document.createElement('button');
  btn.className = 'ws-item' + (n === 1 ? ' active' : '');
  btn.dataset.ws = n;
  btn.textContent = n;
  btn.title = `Switch to Workspace ${n} (Super + ${n})`;
  btn.addEventListener('click', () => switchWorkspace(n));
  wsContainer.appendChild(btn);
});

/* Waybar Live Clock & Calendar */
function renderCalendar() {
  const grid = document.getElementById('cal-grid');
  if (!grid) return;
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let html = days.map(d => `<div class="cal-day-name">${d}</div>`).join('');
  
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const curDate = now.getDate();

  for (let i = 0; i < firstDay; i++) {
    html += `<div></div>`;
  }
  for (let d = 1; d <= totalDays; d++) {
    const isToday = d === curDate ? ' today' : '';
    html += `<div class="cal-day${isToday}">${d}</div>`;
  }
  grid.innerHTML = html;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthEl = document.getElementById('cal-month-year');
  if (monthEl) monthEl.textContent = `${monthNames[month]} ${year}`;
}

function updateClock() {
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[now.getDay()];
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('wb-time').textContent = `${day} ${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();
renderCalendar();

document.getElementById('wb-clock-pill').addEventListener('click', e => {
  e.stopPropagation();
  calPopover.classList.toggle('show');
});

document.addEventListener('click', e => {
  if (calPopover && !calPopover.contains(e.target) && e.target !== document.getElementById('wb-clock-pill')) {
    calPopover.classList.remove('show');
  }
});

/* ==========================================================================
   WAYBAR REAL HTML5 LO-FI AUDIO PLAYER
   ========================================================================== */
const LOFI_PLAYLIST = [
  { title: 'Late Night Study Loop', file: 'audio/lofi-study.mp3', artist: 'sayan @ arch' },
  { title: 'Lofi Chill Beats', file: 'audio/lofi-chill.mp3', artist: 'sayan @ arch' },
  { title: 'Cosmo Ambient Drift', file: 'audio/cosmo-drift.mp3', artist: 'sayan @ arch' },
  { title: 'Deep Ambient Space', file: 'audio/ambient-space.mp3', artist: 'sayan @ arch' },
  { title: 'Gentle Rain & Lofi', file: 'audio/gentle-rain.mp3', artist: 'sayan @ arch' }
];

let curTrackIdx = 0;
let isAudioPlaying = false;
const audioPlayer = new Audio();
audioPlayer.src = LOFI_PLAYLIST[0].file;
audioPlayer.volume = 0.84;

const mediaPill = document.getElementById('wb-media');
const trackNameEl = document.getElementById('wb-track-name');

function updatePlayerUI() {
  const cur = LOFI_PLAYLIST[curTrackIdx];
  if (trackNameEl) {
    trackNameEl.textContent = `${cur.title}`;
  }
  if (mediaPill) {
    mediaPill.classList.toggle('playing', isAudioPlaying);
    mediaPill.title = isAudioPlaying ? `Playing: ${cur.title} (Click to Skip)` : `Paused: ${cur.title} (Click to Play)`;
  }
}

function playTrack(idx) {
  if (idx !== undefined) curTrackIdx = idx;
  const track = LOFI_PLAYLIST[curTrackIdx];
  audioPlayer.src = track.file;
  audioPlayer.play().then(() => {
    isAudioPlaying = true;
    updatePlayerUI();
    showNotif('Lo-Fi Music Player', `Now Playing: <strong>${track.title}</strong> 🎵`);
  }).catch(err => {
    isAudioPlaying = false;
    updatePlayerUI();
  });
}

function pauseTrack() {
  audioPlayer.pause();
  isAudioPlaying = false;
  updatePlayerUI();
  showNotif('Lo-Fi Music Player', 'Playback paused.');
}

function nextTrack() {
  curTrackIdx = (curTrackIdx + 1) % LOFI_PLAYLIST.length;
  playTrack(curTrackIdx);
}

audioPlayer.addEventListener('ended', () => {
  nextTrack();
});

if (mediaPill) {
  mediaPill.addEventListener('click', () => {
    if (!isAudioPlaying) {
      playTrack(curTrackIdx);
    } else {
      nextTrack();
    }
  });
}


/* Window Expose / Overview Mode (Super + Tab) */
function toggleExpose() {
  const openWins = Object.values(wins).filter(w => w.style.display !== 'none');
  if (!openWins.length) {
    showNotif('Overview', 'No active windows open.');
    return;
  }

  const isShowing = exposeOverlay.classList.contains('show');
  if (isShowing) {
    exposeOverlay.classList.remove('show');
    return;
  }

  const grid = document.getElementById('expose-grid');
  grid.innerHTML = openWins.map(w => {
    const id = w.dataset.id;
    const title = w.querySelector('.tb-title')?.textContent.trim() || id;
    return `
      <div class="expose-thumb" data-id="${id}">
        <div class="expose-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
          <span>${title}</span>
        </div>
        <div style="font-size:11px;color:var(--text-muted);font-family:'JetBrains Mono'">Click to focus · Workspace ${w.dataset.ws || 1}</div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.expose-thumb').forEach(t => {
    t.addEventListener('click', () => {
      const id = t.dataset.id;
      exposeOverlay.classList.remove('show');
      if (wins[id]) focusWin(wins[id]);
    });
  });

  exposeOverlay.classList.add('show');
}

document.getElementById('btn-expose').addEventListener('click', toggleExpose);
exposeOverlay.addEventListener('click', e => {
  if (e.target === exposeOverlay) exposeOverlay.classList.remove('show');
});

/* Live System Metrics Simulation */
let cpuVal = 18, ramVal = 4.2, volVal = 84, batVal = 96;

function updateMetrics() {
  cpuVal = Math.max(8, Math.min(78, cpuVal + (Math.random() * 6 - 3)));
  ramVal = Math.max(3.8, Math.min(6.5, ramVal + (Math.random() * 0.04 - 0.02)));

  document.getElementById('s-cpu').textContent = Math.round(cpuVal) + '%';
  document.getElementById('s-ram').textContent = ramVal.toFixed(1) + 'G';

  const btopCpu = document.getElementById('btop-cpu-val');
  const btopCpuBar = document.getElementById('btop-cpu-bar');
  if (btopCpu && btopCpuBar) {
    btopCpu.textContent = Math.round(cpuVal) + '%';
    btopCpuBar.style.width = Math.round(cpuVal) + '%';
  }

  const btopRam = document.getElementById('btop-ram-val');
  const btopRamBar = document.getElementById('btop-ram-bar');
  if (btopRam && btopRamBar) {
    btopRam.textContent = `${ramVal.toFixed(1)}G / 16G`;
    btopRamBar.style.width = Math.round((ramVal / 16) * 100) + '%';
  }
}
setInterval(updateMetrics, 2000);
updateMetrics();

/* Quick Settings & Control Center */
const qsToggle = document.getElementById('qs-toggle');
qsToggle.addEventListener('click', e => {
  e.stopPropagation();
  quickSettings.classList.toggle('show');
});

document.addEventListener('click', e => {
  if (!quickSettings.contains(e.target) && e.target !== qsToggle) {
    quickSettings.classList.remove('show');
  }
});

// Wallpaper Toggle in Quick Settings
document.getElementById('qs-wp-btn').addEventListener('click', () => {
  cycleWallpaper();
});

// Theme Cycling — All Light Variants
const themes = ['sakura-latte', 'frost', 'matcha', 'wisteria', 'rose-gold'];
const themeNames = {
  'sakura-latte': 'Sakura Latte',
  'frost': 'Frost',
  'matcha': 'Matcha',
  'wisteria': 'Wisteria',
  'rose-gold': 'Rose Gold'
};
let curThemeIdx = 0;

document.getElementById('qs-theme-btn').addEventListener('click', () => {
  curThemeIdx = (curThemeIdx + 1) % themes.length;
  const theme = themes[curThemeIdx];
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-name').textContent = themeNames[theme];
  showNotif('Theme', `Switched to ${themeNames[theme]}`);
});

// Volume & Brightness Sliders
const volSlider = document.getElementById('qs-vol-slider');
volSlider.addEventListener('input', e => {
  volVal = e.target.value;
  document.getElementById('qs-vol-val').textContent = volVal + '%';
  document.getElementById('s-vol').textContent = volVal + '%';
  if (audioPlayer) audioPlayer.volume = volVal / 100;
});

const brightSlider = document.getElementById('qs-bright-slider');
brightSlider.addEventListener('input', e => {
  const b = e.target.value;
  document.getElementById('qs-bright-val').textContent = b + '%';
  document.getElementById('wp-container').style.filter = `brightness(${b / 100})`;
});

// Tiling Mode Toggle
function toggleGlobalTiling() {
  cycleLayout();
}

document.getElementById('qs-tiling-btn').addEventListener('click', toggleGlobalTiling);
document.getElementById('btn-btop').addEventListener('click', openBtop);

/* SwayNC Notification Toasts */
let notifTimeout;
function showNotif(title, body) {
  const existing = document.querySelector('.notif');
  if (existing) existing.remove();

  const n = document.createElement('div');
  n.className = 'notif';
  n.innerHTML = `
    <div class="ntitle">
      <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span>${title}</span>
    </div>
    <div class="nbody">${body}</div>
  `;
  document.body.appendChild(n);

  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => {
    n.style.transition = 'opacity 0.3s, transform 0.3s';
    n.style.opacity = '0';
    n.style.transform = 'translateX(110%)';
    setTimeout(() => n.remove(), 300);
  }, 4200);
}

/* Global Hyprland Keyboard Shortcuts */
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.isContentEditable) {
    if (e.key === 'Escape') {
      if (lOpen) closeLauncher();
    }
    return;
  }

  // Super + Space or / -> Launcher
  if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === ' ')) {
    e.preventDefault();
    lOpen ? closeLauncher() : openLauncher();
  }

  // Super + Tab / Alt + Tab -> Expose Window Overview
  if ((e.metaKey || e.altKey) && e.key === 'Tab') {
    e.preventDefault();
    toggleExpose();
  }

  // Super + Enter -> Kitty Terminal
  if ((e.metaKey || e.ctrlKey || e.altKey) && e.key === 'Enter') {
    e.preventDefault();
    openTerminal();
  }

  // Super + Q -> Close Focused Window
  if ((e.metaKey || e.altKey) && (e.key === 'q' || e.key === 'Q')) {
    e.preventDefault();
    if (focusedWin) {
      closeWin(focusedWin.dataset.id);
    }
  }

  // Super + W -> Cycle Wallpaper
  if ((e.metaKey || e.altKey) && (e.key === 'w' || e.key === 'W')) {
    e.preventDefault();
    cycleWallpaper();
  }

  // Super + V -> Toggle Tiling Mode
  if ((e.metaKey || e.altKey) && (e.key === 'v' || e.key === 'V')) {
    e.preventDefault();
    toggleGlobalTiling();
  }

  // Super + 1..5 -> Workspace switching
  if ((e.metaKey || e.altKey) && ['1', '2', '3', '4', '5'].includes(e.key)) {
    e.preventDefault();
    switchWorkspace(+e.key);
  }
});

/* Interactive 3D Card Tilt on Hover */
document.addEventListener('mousemove', e => {
  const card = e.target.closest('.proj-card, .hero-card');
  if (card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;
    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
  }
});

document.addEventListener('mouseout', e => {
  const card = e.target.closest('.proj-card, .hero-card');
  if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
    card.style.transform = '';
  }
});

/* Startup Lifecycle Sequence */
window.addEventListener('load', () => {
  // Open initial floating windows
  setTimeout(() => openTerminal(), 250);
  setTimeout(() => openAbout(), 500);

  // Auto-play lofi music on load
  setTimeout(() => {
    playTrack(0);
  }, 700);

  // Fallback: Start playback on first user gesture if browser blocked initial autoplay
  const startAutoplayGesture = () => {
    if (!isAudioPlaying) playTrack(0);
    document.removeEventListener('click', startAutoplayGesture);
    document.removeEventListener('keydown', startAutoplayGesture);
  };
  document.addEventListener('click', startAutoplayGesture, { once: true });
  document.addEventListener('keydown', startAutoplayGesture, { once: true });

  setTimeout(() => {
    showNotif('Arch Linux · Hyprland 0.42', 'Welcome to sayan@arch! Normal floating windows active. Press <span style="color:var(--accent-secondary);font-family:JetBrains Mono">Super+V</span> to toggle DWM Tiling.');
  }, 1300);
});
