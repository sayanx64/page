let zTop = 100, focusedWin = null;
const wins = {};
const ICON = {
  terminal: '<svg viewBox="0 0 16 16"><rect x="1" y="2" width="14" height="11" rx="1.5"/><path d="M4 6l2.5 2L4 10M8.5 10H12"/></svg>',
  user: '<svg viewBox="0 0 16 16"><circle cx="8" cy="5.5" r="3"/><path d="M2.5 14.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/></svg>',
  folder: '<svg viewBox="0 0 16 16"><path d="M1.5 3.5h4l2 2h7v8h-13z"/></svg>',
  file: '<svg viewBox="0 0 16 16"><path d="M4 1.5h5l4 4v9h-9z"/><path d="M9 1.5v4h4"/></svg>',
  code: '<svg viewBox="0 0 16 16"><path d="M5 4L1.5 8 5 12M11 4l3.5 4L11 12"/></svg>',
  note: '<svg viewBox="0 0 16 16"><rect x="3" y="1.5" width="10" height="13" rx="1.5"/><path d="M5.5 5h5M5.5 8h5M5.5 11h3"/></svg>',
  settings: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5L13 13M13 3l-1.5 1.5M4.5 11.5L3 13"/></svg>',
  research: '<svg viewBox="0 0 16 16"><path d="M4 1.5h5l4 4v9h-9z"/><path d="M9 1.5v4h4"/><path d="M6 8h4M6 10.5h4"/></svg>',
};
function makeWin(cfg) {
  const {id, title, icon, w, h, x, y, content, dark} = cfg;
  if (wins[id]) { const el = wins[id]; if (el.style.display === 'none') showWin(id); else focusWin(el); return el; }
  const el = document.createElement('div');
  el.className = 'win' + (dark ? ' dark' : '');
  el.dataset.id = id;
  el.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${++zTop}`;
  el.innerHTML = `<div class="tb"><div class="tb-dots"><div class="tbd cl">\u00d7</div><div class="tbd mn">\u2212</div><div class="tbd mx">+</div></div><div class="tb-title">${ICON[icon]||''}${title}</div></div>${content}`;
  el.querySelector('.tbd.cl').onclick = () => closeWin(id);
  el.querySelector('.tbd.mn').onclick = () => minWin(id);
  el.querySelector('.tbd.mx').onclick = () => maxWin(id);
  document.getElementById('desktop').appendChild(el);
  wins[id] = el;
  setupDrag(el);
  setupResize(el);
  focusWin(el);
  const dk = document.getElementById('dk-' + id);
  if (dk) dk.classList.add('open');
  return el;
}
function focusWin(el) {
  if (focusedWin && focusedWin !== el) focusedWin.classList.remove('focused');
  el.classList.add('focused'); el.style.zIndex = ++zTop; focusedWin = el;
  const t = el.querySelector('.tb-title')?.textContent?.trim() || 'sayan@arch';
  document.getElementById('wb-title').textContent = t;
}
function closeWin(id) {
  const el = wins[id]; if (!el) return;
  el.classList.add('closing');
  el.addEventListener('animationend', () => {
    el.remove(); delete wins[id];
    const dk = document.getElementById('dk-' + id);
    if (dk) dk.classList.remove('open');
    if (focusedWin === el) { focusedWin = null; document.getElementById('wb-title').textContent = 'sayan@arch'; }
  }, {once: true});
}
function minWin(id) {
  const el = wins[id]; if (!el) return;
  el.style.display = 'none';
  const dk = document.getElementById('dk-' + id);
  if (dk) dk.classList.remove('open');
}
function showWin(id) {
  const el = wins[id]; if (!el) return;
  el.style.display = 'flex';
  const dk = document.getElementById('dk-' + id);
  if (dk) dk.classList.add('open');
  focusWin(el);
}
function maxWin(id) {
  const el = wins[id]; if (!el) return;
  if (el._sv) {
    el.classList.add('maximizing');
    Object.assign(el.style, el._sv);
    el.classList.remove('maxed');
    el._sv = null;
    setTimeout(() => el.classList.remove('maximizing'), 380);
  } else {
    el._sv = {left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height};
    el.classList.add('maximizing');
    Object.assign(el.style, {left:'0',top:'0',width:'100%',height:'100%'});
    el.classList.add('maxed');
    setTimeout(() => el.classList.remove('maximizing'), 380);
  }
}
function setupDrag(el) {
  const tb = el.querySelector('.tb');
  let ox, oy, dragging = false;
  tb.addEventListener('mousedown', e => {
    if (e.target.classList.contains('tbd')) return;
    if (el.classList.contains('maxed')) return;
    dragging = true; focusWin(el);
    const r = el.getBoundingClientRect();
    ox = e.clientX - r.left; oy = e.clientY - r.top;
    el.style.transition = 'none'; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    el.style.left = (e.clientX - ox) + 'px';
    el.style.top = Math.max(0, e.clientY - oy - 28) + 'px'; 
  });
  document.addEventListener('mouseup', () => {
    if (dragging) { dragging = false; el.style.transition = ''; }
  });
}
function setupResize(el) {
  const EDGE = 7, MIN_W = 260, MIN_H = 200;
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
  const CURSORS = {n:'n-resize',s:'s-resize',e:'e-resize',w:'w-resize',ne:'ne-resize',nw:'nw-resize',se:'se-resize',sw:'sw-resize'};
  el.addEventListener('mousemove', e => {
    if (resizing || el.classList.contains('maxed')) return;
    if (e.target.closest('.tb') || e.target.closest('.term-out') || e.target.closest('.win-body') || e.target.closest('.editor-body') || e.target.closest('.notes-body') || e.target.closest('.files-wrap')) {
      el.style.cursor = ''; return;
    }
    const d = getDir(e);
    el.style.cursor = CURSORS[d] || '';
  });
  el.addEventListener('mousedown', e => {
    if (e.target.closest('.tb')) return;
    if (el.classList.contains('maxed')) return;
    const d = getDir(e);
    if (!d) { focusWin(el); return; }
    e.preventDefault(); e.stopPropagation();
    resizing = true; dir = d; focusWin(el);
    startX = e.clientX; startY = e.clientY;
    startRect = {l: parseInt(el.style.left), t: parseInt(el.style.top), w: el.offsetWidth, h: el.offsetHeight};
    document.body.style.cursor = CURSORS[d];
    el.style.transition = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!resizing) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    let {l, t, w, h} = startRect;
    if (dir.includes('e')) w = Math.max(MIN_W, w + dx);
    if (dir.includes('w')) { const nw = Math.max(MIN_W, w - dx); l += w - nw; w = nw; }
    if (dir.includes('s')) h = Math.max(MIN_H, h + dy);
    if (dir.includes('n')) { const nh = Math.max(MIN_H, h - dy); t += h - nh; h = nh; }
    el.style.left = l + 'px'; el.style.top = Math.max(0, t) + 'px';
    el.style.width = w + 'px'; el.style.height = h + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (resizing) { resizing = false; document.body.style.cursor = ''; el.style.transition = ''; }
  });
}
