/* ==========================================================================
   HYPRLAND / DWM WAYLAND WINDOW MANAGER & TILING ENGINE
   ========================================================================== */

let zTop = 100;
let focusedWin = null;
const wins = {};
let currentWorkspace = 1;

// Layout modes: 'floating' (><>), 'tiled' ([]=), 'monocle' ([M])
let currentLayout = 'floating';

const ICONS = {
  terminal: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="7 10 10 12 7 14"/><line x1="12" y1="14" x2="16" y2="14"/></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  folder: '<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  file: '<svg viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>',
  code: '<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>',
  research: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  btop: '<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
};

function makeWin(cfg) {
  const { id, title, icon, w, h, x, y, content, ws = currentWorkspace } = cfg;

  if (wins[id]) {
    const el = wins[id];
    el.dataset.ws = ws;
    if (el.style.display === 'none') {
      showWin(id);
    } else {
      focusWin(el);
    }
    return el;
  }

  const el = document.createElement('div');
  el.className = 'win';
  el.dataset.id = id;
  el.dataset.ws = ws;
  el.dataset.title = title;

  // Saved default floating bounds
  const maxAvailW = window.innerWidth - 24;
  const maxAvailH = window.innerHeight - 80;
  const initW = Math.min(w, maxAvailW);
  const initH = Math.min(h, maxAvailH);
  const initX = Math.max(12, Math.min(x, window.innerWidth - initW - 20));
  const initY = Math.max(10, Math.min(y, window.innerHeight - initH - 60));

  el._floatBounds = { x: initX, y: initY, w: initW, h: initH };
  el.style.cssText = `left:${initX}px;top:${initY}px;width:${initW}px;height:${initH}px;z-index:${++zTop}`;

  el.innerHTML = `
    <div class="tb">
      <div class="tb-dots">
        <button class="tbd cl" title="Close (Super+Q)">\u00d7</button>
        <button class="tbd mn" title="Minimize">\u2212</button>
        <button class="tbd mx" title="Toggle Fullscreen (Monocle)">+</button>
      </div>
      <div class="tb-title">
        ${ICONS[icon] || ''}
        <span>${title}</span>
      </div>
      <div class="tb-extra">
        <span class="tb-chip float-btn" title="Toggle Window Float / Tile Mode">float</span>
      </div>
    </div>
    ${content}
  `;

  el.querySelector('.tbd.cl').onclick = (e) => { e.stopPropagation(); closeWin(id); };
  el.querySelector('.tbd.mn').onclick = (e) => { e.stopPropagation(); minWin(id); };
  el.querySelector('.tbd.mx').onclick = (e) => { e.stopPropagation(); maxWin(id); };
  el.querySelector('.float-btn').onclick = (e) => { e.stopPropagation(); toggleFloat(el); };

  document.getElementById('desktop').appendChild(el);
  wins[id] = el;

  setupDrag(el);
  setupResize(el);
  focusWin(el);

  // Sync dock indicator
  const dk = document.getElementById('dk-' + id);
  if (dk) dk.classList.add('open');

  updateWorkspaceIndicators();
  applyLayout();

  return el;
}

function focusWin(el) {
  if (focusedWin && focusedWin !== el) {
    focusedWin.classList.remove('focused');
  }
  el.classList.add('focused');
  el.style.zIndex = ++zTop;
  focusedWin = el;

  const t = el.dataset.title || el.querySelector('.tb-title span')?.textContent?.trim() || 'sayan@arch: ~';
  const activeAppEl = document.getElementById('wb-active-app');
  if (activeAppEl) activeAppEl.textContent = t;
}

function closeWin(id) {
  const el = wins[id];
  if (!el) return;
  el.classList.add('closing');

  el.addEventListener('animationend', () => {
    el.remove();
    delete wins[id];

    const dk = document.getElementById('dk-' + id);
    if (dk) dk.classList.remove('open');

    if (focusedWin === el) {
      focusedWin = null;
      const rem = Object.values(wins).filter(w => +w.dataset.ws === currentWorkspace && w.style.display !== 'none');
      if (rem.length) {
        focusWin(rem[rem.length - 1]);
      } else {
        const activeAppEl = document.getElementById('wb-active-app');
        if (activeAppEl) activeAppEl.textContent = 'sayan@arch: ~';
      }
    }
    updateWorkspaceIndicators();
    applyLayout();
  }, { once: true });
}

function minWin(id) {
  const el = wins[id];
  if (!el) return;
  el.style.display = 'none';
  const dk = document.getElementById('dk-' + id);
  if (dk) dk.classList.remove('open');
  updateWorkspaceIndicators();
  applyLayout();
}

function showWin(id) {
  const el = wins[id];
  if (!el) return;
  el.style.display = 'flex';
  const dk = document.getElementById('dk-' + id);
  if (dk) dk.classList.add('open');
  focusWin(el);
  updateWorkspaceIndicators();
  applyLayout();
}

function maxWin(id) {
  const el = wins[id];
  if (!el) return;

  if (el._sv) {
    el.classList.add('maximizing');
    Object.assign(el.style, el._sv);
    el.classList.remove('maxed');
    el._sv = null;
    setTimeout(() => el.classList.remove('maximizing'), 300);
    applyLayout();
  } else {
    el._sv = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
    el.classList.add('maximizing');
    Object.assign(el.style, { left: '8px', top: '6px', width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' });
    el.classList.add('maxed');
    setTimeout(() => el.classList.remove('maximizing'), 300);
  }
}

/* Individual Window Float / Tile Switcher */
function toggleFloat(el) {
  const isFloating = el.classList.contains('floating');
  const btn = el.querySelector('.float-btn');

  if (isFloating) {
    // Snap back to Tiling grid
    el.classList.remove('floating');
    if (btn) btn.textContent = 'float';
    showNotif('Window Mode', `${el.dataset.title || 'Window'} snapped to Tiling grid.`);
  } else {
    // Detach to Floating popup
    el.classList.add('floating');
    if (btn) btn.textContent = 'tile';

    // Restore or calculate floating bounds
    const fb = el._floatBounds || { x: 80, y: 50, w: 640, h: 460 };
    el.style.left = fb.x + 'px';
    el.style.top = fb.y + 'px';
    el.style.width = fb.w + 'px';
    el.style.height = fb.h + 'px';

    showNotif('Window Mode', `${el.dataset.title || 'Window'} detached to Floating mode.`);
  }

  focusWin(el);
  applyLayout();
}

/* Master Layout Engine (DWM / Hyprland) */
function applyLayout() {
  const activeInWs = Object.values(wins).filter(
    w => +w.dataset.ws === currentWorkspace && w.style.display !== 'none' && !w.classList.contains('maxed')
  );

  if (!activeInWs.length) return;

  const desktop = document.getElementById('desktop');
  const availW = desktop.clientWidth - 16;
  const availH = desktop.clientHeight - 16;
  const gap = 12;

  // Filter windows that participate in tiling
  const tiledWins = activeInWs.filter(w => !w.classList.contains('floating'));

  // Update titlebar button texts
  activeInWs.forEach(w => {
    const btn = w.querySelector('.float-btn');
    if (btn) {
      btn.textContent = w.classList.contains('floating') ? 'tile' : 'float';
    }
  });

  if (currentLayout === 'monocle') {
    // Monocle: All windows take full workspace size
    activeInWs.forEach(w => {
      w.style.transition = 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), top 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
      w.style.left = '8px';
      w.style.top = '6px';
      w.style.width = availW + 'px';
      w.style.height = availH + 'px';
    });
    return;
  }

  if (currentLayout === 'floating') {
    // Floating mode: all windows float at their saved bounds
    activeInWs.forEach((w, idx) => {
      const fb = w._floatBounds || { x: 50 + idx * 40, y: 30 + idx * 35, w: 640, h: 460 };
      w.style.transition = 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), top 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
      w.style.left = fb.x + 'px';
      w.style.top = fb.y + 'px';
      w.style.width = fb.w + 'px';
      w.style.height = fb.h + 'px';
    });
    return;
  }

  // Tiled Mode (DWM Master & Stack / Hyprland Dwindle)
  if (!tiledWins.length) return;

  tiledWins.forEach(w => {
    w.style.transition = 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), top 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  if (tiledWins.length === 1) {
    const w = tiledWins[0];
    w.style.left = '8px';
    w.style.top = '6px';
    w.style.width = availW + 'px';
    w.style.height = availH + 'px';
  } else if (tiledWins.length === 2) {
    // Clean 50/50 Side-by-Side Split
    const halfW = (availW - gap) / 2;
    tiledWins[0].style.left = '8px';
    tiledWins[0].style.top = '6px';
    tiledWins[0].style.width = halfW + 'px';
    tiledWins[0].style.height = availH + 'px';

    tiledWins[1].style.left = (8 + halfW + gap) + 'px';
    tiledWins[1].style.top = '6px';
    tiledWins[1].style.width = halfW + 'px';
    tiledWins[1].style.height = availH + 'px';
  } else {
    // DWM Master (55% width on Left) + Vertical Stack (45% on Right)
    const masterW = Math.round((availW - gap) * 0.54);
    const stackW = availW - gap - masterW;
    const stackCount = tiledWins.length - 1;
    const stackH = (availH - (stackCount - 1) * gap) / stackCount;

    tiledWins[0].style.left = '8px';
    tiledWins[0].style.top = '6px';
    tiledWins[0].style.width = masterW + 'px';
    tiledWins[0].style.height = availH + 'px';

    for (let i = 1; i < tiledWins.length; i++) {
      const idx = i - 1;
      tiledWins[i].style.left = (8 + masterW + gap) + 'px';
      tiledWins[i].style.top = (6 + idx * (stackH + gap)) + 'px';
      tiledWins[i].style.width = stackW + 'px';
      tiledWins[i].style.height = stackH + 'px';
    }
  }
}

/* Global Layout Mode Switcher */
function switchLayout(mode) {
  currentLayout = mode;
  const sym = document.getElementById('wb-layout-symbol');
  const btn = document.getElementById('wb-layout-btn');
  if (sym) {
    if (mode === 'tiled') sym.textContent = '[]=';
    if (mode === 'floating') sym.textContent = '><>';
    if (mode === 'monocle') sym.textContent = '[M]';
  }
  showNotif('Layout Mode', `Switched layout to: <strong>${mode.toUpperCase()}</strong> (${sym ? sym.textContent : ''})`);
  applyLayout();
}

function cycleLayout() {
  const layouts = ['tiled', 'floating', 'monocle'];
  const nextIdx = (layouts.indexOf(currentLayout) + 1) % layouts.length;
  switchLayout(layouts[nextIdx]);
}

// Wire Layout Switcher in Waybar
const layoutBtn = document.getElementById('wb-layout-btn');
if (layoutBtn) {
  layoutBtn.addEventListener('click', cycleLayout);
}

/* Dragging Support */
function setupDrag(el) {
  const tb = el.querySelector('.tb');
  let ox, oy, dragging = false;

  tb.addEventListener('mousedown', e => {
    if (e.target.classList.contains('tbd') || e.target.classList.contains('tb-chip')) return;
    if (el.classList.contains('maxed')) return;

    // If dragging a tiled window, automatically detach it to floating mode!
    if (!el.classList.contains('floating') && currentLayout === 'tiled') {
      el.classList.add('floating');
      const btn = el.querySelector('.float-btn');
      if (btn) btn.textContent = 'tile';
      applyLayout();
    }

    dragging = true;
    focusWin(el);
    const r = el.getBoundingClientRect();
    ox = e.clientX - r.left;
    oy = e.clientY - r.top;
    el.style.transition = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const newX = Math.max(0, Math.min(e.clientX - ox, window.innerWidth - el.offsetWidth));
    const newY = Math.max(0, Math.min(e.clientY - oy - 38, window.innerHeight - 80));
    el.style.left = newX + 'px';
    el.style.top = newY + 'px';
    el._floatBounds = {
      x: newX,
      y: newY,
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      el.style.transition = '';
    }
  });
}

/* 8-Direction Resizing Support */
function setupResize(el) {
  const EDGE = 8;
  const MIN_W = 320;
  const MIN_H = 220;
  let resizing = false, dir = '', startX, startY, startRect;

  function getDir(e) {
    const r = el.getBoundingClientRect();
    let d = '';
    if (e.clientY - r.top < EDGE) d += 'n';
    if (r.bottom - e.clientY < EDGE) d += 's';
    if (e.clientX - r.left < EDGE) d += 'w';
    if (r.right - e.clientX < EDGE) d += 'e';
    return d;
  }

  const CURSORS = {
    n: 'n-resize', s: 's-resize', e: 'e-resize', w: 'w-resize',
    ne: 'ne-resize', nw: 'nw-resize', se: 'se-resize', sw: 'sw-resize'
  };

  el.addEventListener('mousemove', e => {
    if (resizing || el.classList.contains('maxed')) return;
    if (e.target.closest('.tb') || e.target.closest('.win-body') || e.target.closest('.term-wrap') || e.target.closest('.nvim-wrap') || e.target.closest('.files-wrap')) {
      el.style.cursor = '';
      return;
    }
    const d = getDir(e);
    el.style.cursor = CURSORS[d] || '';
  });

  el.addEventListener('mousedown', e => {
    if (e.target.closest('.tb') || el.classList.contains('maxed')) return;
    const d = getDir(e);
    if (!d) {
      focusWin(el);
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    // Detach to floating when resizing
    if (!el.classList.contains('floating')) {
      el.classList.add('floating');
      const btn = el.querySelector('.float-btn');
      if (btn) btn.textContent = 'tile';
      applyLayout();
    }

    resizing = true;
    dir = d;
    focusWin(el);
    startX = e.clientX;
    startY = e.clientY;
    startRect = {
      l: parseInt(el.style.left) || el.offsetLeft,
      t: parseInt(el.style.top) || el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight
    };
    document.body.style.cursor = CURSORS[d];
    el.style.transition = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let { l, t, w, h } = startRect;

    if (dir.includes('e')) w = Math.max(MIN_W, w + dx);
    if (dir.includes('w')) {
      const nw = Math.max(MIN_W, w - dx);
      l += w - nw;
      w = nw;
    }
    if (dir.includes('s')) h = Math.max(MIN_H, h + dy);
    if (dir.includes('n')) {
      const nh = Math.max(MIN_H, h - dy);
      t += h - nh;
      h = nh;
    }

    el.style.left = Math.max(0, l) + 'px';
    el.style.top = Math.max(0, t) + 'px';
    el.style.width = w + 'px';
    el.style.height = h + 'px';

    el._floatBounds = { x: l, y: t, w, h };
  });

  document.addEventListener('mouseup', () => {
    if (resizing) {
      resizing = false;
      document.body.style.cursor = '';
      el.style.transition = '';
    }
  });
}

/* Workspace Switching */
function switchWorkspace(wsNum) {
  currentWorkspace = wsNum;
  Object.values(wins).forEach(el => {
    if (+el.dataset.ws === currentWorkspace) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }
  });

  document.querySelectorAll('.ws-item').forEach(btn => {
    btn.classList.toggle('active', +btn.dataset.ws === currentWorkspace);
  });

  const activeInWs = Object.values(wins).filter(w => +w.dataset.ws === currentWorkspace);
  if (activeInWs.length) {
    focusWin(activeInWs[activeInWs.length - 1]);
  } else {
    const activeAppEl = document.getElementById('wb-active-app');
    if (activeAppEl) activeAppEl.textContent = 'sayan@arch: ~';
  }

  updateWorkspaceIndicators();
  applyLayout();
}

function updateWorkspaceIndicators() {
  document.querySelectorAll('.ws-item').forEach(btn => {
    const ws = +btn.dataset.ws;
    const hasWin = Object.values(wins).some(w => +w.dataset.ws === ws);
    btn.classList.toggle('has-window', hasWin);
  });
}
