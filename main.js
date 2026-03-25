let lOpen = false, selI = 0;
const lInput = document.getElementById('l-input'), lResults = document.getElementById('l-results');
function renderL(q) {
  q = (q || '').toLowerCase();
  const f = APPS.filter(a => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));
  selI = 0;
  lResults.innerHTML = f.map((a, i) => `<div class="app-row${i===0?' sel':''}" data-id="${a.id}">
    <div class="app-ico" style="background:${a.bg};color:${a.color}">${ICON[a.icon]||''}</div>
    <div><div class="app-name">${a.name}</div><div class="app-desc">${a.desc}</div></div></div>`).join('');
  lResults.querySelectorAll('.app-row').forEach(r => r.addEventListener('click', () => {
    const app = APPS.find(a => a.id === r.dataset.id);
    if (app) { closeL(); app.open(); }
  }));
  return f;
}
function openL() {
  document.getElementById('launcher').classList.add('show');
  lInput.value = ''; renderL(); setTimeout(() => lInput.focus(), 50); lOpen = true;
}
function closeL() { document.getElementById('launcher').classList.remove('show'); lOpen = false; }
lInput.addEventListener('input', () => renderL(lInput.value));
lInput.addEventListener('keydown', e => {
  const rows = lResults.querySelectorAll('.app-row');
  if (e.key === 'ArrowDown') { selI = Math.min(selI + 1, rows.length - 1); e.preventDefault(); }
  if (e.key === 'ArrowUp') { selI = Math.max(selI - 1, 0); e.preventDefault(); }
  rows.forEach((r, i) => r.classList.toggle('sel', i === selI));
  if (e.key === 'Enter') {
    const s = rows[selI];
    if (s) { const app = APPS.find(a => a.id === s.dataset.id); if (app) { closeL(); app.open(); } }
  }
  if (e.key === 'Escape') closeL();
});
document.getElementById('launcher').addEventListener('click', e => { if (e.target === document.getElementById('launcher')) closeL(); });
document.getElementById('launcher-btn').addEventListener('click', () => lOpen ? closeL() : openL());
const dock = document.getElementById('dock');
dock.addEventListener('mousemove', e => {
  const items = dock.querySelectorAll('.dk-item');
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(e.clientX - center);
    const maxDist = 110;
    if (dist < maxDist) {
      const ratio = 1 - (dist / maxDist);
      const scale = 1 + 0.35 * Math.pow(ratio, 1.5);
      const lift = (scale - 1) * 22;
      item.style.transform = `scale(${scale}) translateY(${-lift}px)`;
    } else {
      item.style.transform = '';
    }
  });
});
dock.addEventListener('mouseleave', () => {
  dock.querySelectorAll('.dk-item').forEach(item => { item.style.transform = ''; });
});
dock.querySelectorAll('.dk-item[data-app]').forEach(d => d.addEventListener('click', () => {
  const id = d.dataset.app;
  if (wins[id]) {
    if (wins[id].style.display === 'none') showWin(id); else focusWin(wins[id]);
  } else {
    const app = APPS.find(a => a.id === id);
    if (app) app.open();
  }
}));
document.getElementById('dk-launcher').addEventListener('click', () => lOpen ? closeL() : openL());
const ctx = document.getElementById('ctx');
document.getElementById('desktop').addEventListener('contextmenu', e => {
  e.preventDefault();
  ctx.style.left = Math.min(e.clientX, innerWidth - 190) + 'px';
  ctx.style.top = Math.min(e.clientY, innerHeight - 220) + 'px';
  ctx.classList.remove('show');
  void ctx.offsetWidth; 
  ctx.classList.add('show');
});
document.addEventListener('click', e => { if (!ctx.contains(e.target)) ctx.classList.remove('show'); });
ctx.querySelectorAll('.ctx-i').forEach(i => i.addEventListener('click', () => {
  const a = i.dataset.a; ctx.classList.remove('show');
  if (a === 'launcher') openL();
  if (a === 'terminal') openTerminal();
  if (a === 'wp') showNotif('Wallpaper', 'Sakura colors cycling...');
  if (a === 'gh') window.open('https://github.com/sayanx64', '_blank');
  if (a === 'li') window.open('https://linkedin.com/in/sayarch', '_blank');
}));
const wsRow = document.getElementById('ws-row');
let curWS = 1;
[1,2,3,4,5].forEach(n => {
  const b = document.createElement('button');
  b.className = 'ws-btn' + (n === 1 ? ' active' : '');
  b.dataset.n = n; b.title = 'Workspace ' + n;
  b.addEventListener('click', () => {
    document.querySelectorAll('.ws-btn').forEach(x => x.classList.toggle('active', +x.dataset.n === n));
    curWS = n;
  });
  wsRow.appendChild(b);
});
function tick() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  document.getElementById('wb-time').textContent = `${d.toLocaleDateString('en-US',{weekday:'short'})}  ${h}:${m}`;
}
setInterval(tick, 1000); tick();
let bat = 72 + Math.random() * 20, cpu = 18 + Math.random() * 12, ram = 4.1 + Math.random() * .6;
function updateStats() {
  bat = Math.max(10, bat - 0.012);
  cpu = Math.max(5, Math.min(85, cpu + (Math.random() * 4 - 2)));
  ram = Math.max(3, Math.min(12, ram + (Math.random() * .03 - .015)));
  document.getElementById('s-bat').textContent = Math.round(bat) + '%';
  document.getElementById('s-cpu').textContent = Math.round(cpu) + '%';
  document.getElementById('s-ram').textContent = ram.toFixed(1) + 'G';
}
setInterval(updateStats, 2200); updateStats();
let nto;
function showNotif(title, body) {
  const old = document.querySelector('.notif'); if (old) old.remove();
  const n = document.createElement('div'); n.className = 'notif';
  n.innerHTML = `<div class="ntitle"><svg viewBox="0 0 16 16"><path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z"/><path d="M8 5v4M8 11h.01" stroke-linecap="round"/></svg>${title}</div><div class="nbody">${body}</div>`;
  document.body.appendChild(n);
  clearTimeout(nto);
  nto = setTimeout(() => {
    n.style.transition = 'opacity .4s, transform .4s';
    n.style.opacity = '0'; n.style.transform = 'translateX(110%)';
    setTimeout(() => n.remove(), 400);
  }, 4500);
}
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
  if (e.key === '/' && !lOpen) { e.preventDefault(); openL(); }
  if (e.key === 'Escape' && lOpen) closeL();
  if ((e.ctrlKey || e.metaKey) && e.key === ' ') { e.preventDefault(); lOpen ? closeL() : openL(); }
});
window.addEventListener('load', () => {
  setTimeout(openTerminal, 350);
  setTimeout(() => { openAbout(); document.querySelector('.ws-btn[data-n="1"]')?.classList.add('occ'); }, 600);
  setTimeout(() => showNotif('Welcome back, sayan', 'Hyprland 0.40 · Sakura Light · arch btw'), 1400);
  setTimeout(() => showNotif('Tip', 'Press <span style="font-family:JetBrains Mono;color:var(--accent)">/ </span>to open the app launcher'), 7000);
});
