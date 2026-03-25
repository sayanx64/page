function openAbout() {
  makeWin({id:'about', title:'about — sayan.pal', icon:'user', w:560, h:480, x:620, y:40,
    content:`<div class="win-body">
<div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border)">
  <div style="width:48px;height:48px;border:2px solid rgba(212,135,154,.3);border-radius:50%;flex-shrink:0;overflow:hidden">
    <img src="pfp.png" alt="Sayan Pal" style="width:100%;height:100%;object-fit:cover;display:block">
  </div>
  <div>
    <div style="font-size:.95rem;font-weight:600;color:var(--text)">Sayan Pal</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);margin-top:2px">CS undergrad · IEEE author · arch enjoyer</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-muted);margin-top:1px">pronouns: over/flow</div>
  </div>
  <div style="margin-left:auto;text-align:right;font-family:'JetBrains Mono',monospace;font-size:10px">
    <a href="https://github.com/sayanx64" target="_blank" style="display:block;color:var(--accent3)">github/sayanx64</a>
    <a href="https://linkedin.com/in/sayarch" target="_blank" style="display:block;color:var(--accent3);margin-top:2px">in/sayarch</a>
    <div style="color:var(--text-muted);margin-top:2px">spcodr@gmail.com</div>
    <div style="color:var(--text-muted);margin-top:2px">sayan@sayan.cyou</div>
  </div>
</div>
<h3>About</h3>
<p>CS undergrad at KIIT, Bhubaneswar. CGPA 9.24. Building things that live in the terminal. AI/ML enthusiast who published at IEEE before figuring out sleep schedules.</p>
<p>Online when the world sleeps. Drops things, including production. <span style="font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--accent)">git commit -m "fix tomorrow"</span></p>
<div class="stat-row">
  <div class="stat-box"><div class="stat-n">9.24</div><div class="stat-l">CGPA</div></div>
  <div class="stat-box"><div class="stat-n">1</div><div class="stat-l">IEEE Paper</div></div>
  <div class="stat-box"><div class="stat-n">★105</div><div class="stat-l">Stars</div></div>
  <div class="stat-box"><div class="stat-n">3am</div><div class="stat-l">Peak Hours</div></div>
</div>
<h3>Stack</h3>
<div>
  <span class="tag a">Arch Linux</span><span class="tag a">Hyprland</span><span class="tag a">dwm</span>
  <span class="tag g">Python</span><span class="tag g">C/C++</span><span class="tag g">Bash</span>
  <span class="tag p">PyTorch</span><span class="tag p">ML</span>
  <span class="tag w">GCP</span><span class="tag w">self-hosted</span>
  <span class="tag a">GDG KIIT</span>
</div>
<h3>Education</h3>
<p>B.Tech Computer Science · KIIT University, Bhubaneswar · 2024 – Present</p>
</div>`});
}
function openProjects() {
  makeWin({id:'projects', title:'Projects', icon:'folder', w:600, h:500, x:80, y:80,
    content:`<div class="win-body">
<h2 style="margin-bottom:14px">Things I Built</h2>
<div class="proj-row">
  <div class="proj-name">phub-cli <span style="font-size:.6rem;color:var(--accent3);font-family:'JetBrains Mono',monospace">★ 105</span></div>
  <div class="proj-desc">Terminal video browser for people who refuse to leave the terminal. No browser, no accounts. GPL-3.0.</div>
  <div style="margin-top:5px"><span class="tag a">Bash</span><span class="tag a">Python</span><span class="tag g">fzf</span><span class="tag g">yt-dlp</span><span class="tag g">mpv</span></div>
  <a href="https://github.com/curtosis-org/phub-cli" target="_blank" class="proj-link">github.com/curtosis-org/phub-cli →</a>
</div>
<div class="proj-row">
  <div class="proj-name">Self-Hosted Mail Server</div>
  <div class="proj-desc">Full mail stack on Debian Trixie. Postfix, Dovecot, TLS, Fail2Ban, IPv6. Paying for email is a philosophical failure.</div>
  <div style="margin-top:5px"><span class="tag a">Postfix</span><span class="tag a">Dovecot</span><span class="tag g">Certbot</span><span class="tag g">Fail2Ban</span></div>
  <a href="https://github.com/sayanx64" target="_blank" class="proj-link">github.com/sayanx64 →</a>
</div>
<div class="proj-row">
  <div class="proj-name">MedSync</div>
  <div class="proj-desc">OpenEMR research on patient data flow in Indian hospitals. GCP, OAuth 2.0, REST APIs. Real value: navigating a production-grade OSS codebase.</div>
  <div style="margin-top:5px"><span class="tag a">OpenEMR</span><span class="tag w">GCP</span><span class="tag w">OAuth 2.0</span><span class="tag g">MySQL</span></div>
  <a href="https://github.com/sayanx64" target="_blank" class="proj-link">github.com/sayanx64 →</a>
</div>
<div class="proj-row">
  <div class="proj-name">Ukulele Tuner</div>
  <div class="proj-desc">Browser tuner, real-time mic, ML pitch detection (CREPE). Weekend thing. Works.</div>
  <div style="margin-top:5px"><span class="tag a">p5.js</span><span class="tag p">ml5.js</span><span class="tag p">CREPE</span></div>
  <a href="https://github.com/sayanx64" target="_blank" class="proj-link">github.com/sayanx64 →</a>
</div>
</div>`});
}
function openResearch() {
  makeWin({id:'research', title:'Research — IEEE 2025', icon:'research', w:580, h:450, x:160, y:60,
    content:`<div class="win-body">
<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(139,126,200,.06);border:1px solid rgba(139,126,200,.15);padding:.2rem .7rem;border-radius:999px;font-size:.55rem;font-family:'JetBrains Mono',monospace;color:var(--accent3);margin-bottom:14px;letter-spacing:1.5px;text-transform:uppercase">
  <div style="width:4px;height:4px;background:var(--accent3);border-radius:50%"></div>IEEE Xplore · Published Nov 2025</div>
<h2 style="line-height:1.35;margin-bottom:10px">Semi-Supervised Oral Cancer Image Classification Using GAN-based Augmentation and EfficientNet-B3</h2>
<p style="font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--text-muted);line-height:2;margin-bottom:12px">
  <span style="color:var(--text)">Sayan Pal</span>, Utkarsh, Shoham Chakraborty, Saurabh Bilgaiyan, Chiranjib Parida<br>
  <span style="color:var(--text-dim)">2025 3rd DMIHER International Conference on AI in Healthcare, Education and Industry</span><br>
  Wardha, India · DOI: 10.1109/IDICAIHEI65991.2025.11379848
</p>
<div style="font-size:.7rem;color:var(--text-muted);line-height:1.85;border-left:2px solid rgba(212,135,154,.3);padding-left:11px;margin-bottom:14px;font-style:italic">A semi-supervised framework for oral cancer detection combining EfficientNet-B3 with GAN-based augmentation. Integrates supervised classification, semi-supervised feature learning via SSGAN, and few-shot evaluation using Prototypical Networks.</div>
<div style="margin-bottom:14px">
  <span class="tag a">EfficientNet-B3</span><span class="tag a">GAN/SSGAN</span><span class="tag p">Prototypical Networks</span><span class="tag p">Semi-Supervised</span><span class="tag g">Medical Imaging</span><span class="tag a">PyTorch</span>
</div>
<a href="https://ieeexplore.ieee.org/document/11379848" target="_blank" class="proj-link">Read on IEEE Xplore →</a>
</div>`});
}
function openFiles() {
  const fm = {
    '~': ['about.txt|2.1K','README.md|0.8K','.zshrc|4.2K','.config/|—','projects/|—','research/|—'],
    '~/projects': ['phub-cli/|—','medsync/|—','mail-server/|—','ukulele-tuner/|—'],
    '~/research': ['oral-cancer-gan.pdf|1.8M','results/|—','README.md|0.5K','train.py|0.4K'],
    '~/.config': ['hypr/|—','kitty/|—','waybar/|—']
  };
  const dirIcon = '<svg viewBox="0 0 16 16"><path d="M1.5 3.5h4l2 2h7v8h-13z"/></svg>';
  const fileIcon = '<svg viewBox="0 0 16 16"><path d="M4 1.5h5l4 4v9h-9z"/><path d="M9 1.5v4h4"/></svg>';
  makeWin({id:'files', title:'Thunar', icon:'folder', w:560, h:380, x:130, y:120,
    content:`<div class="files-wrap"><div class="files-l" id="fl-l">
<div class="fl-dir active" data-p="~">${dirIcon}<span>home</span></div>
<div class="fl-dir" data-p="~/projects">${dirIcon}<span>projects</span></div>
<div class="fl-dir" data-p="~/research">${dirIcon}<span>research</span></div>
<div class="fl-dir" data-p="~/.config">${dirIcon}<span>config</span></div>
<div style="height:1px;background:var(--border);margin:5px 3px"></div>
<div class="fl-dir" data-ex="https://github.com/sayanx64"><svg viewBox="0 0 16 16"><path d="M8 1C4.1 1 1 4.1 1 8c0 3.1 2 5.7 4.8 6.6.4.1.5-.2.5-.4v-1.3c-2 .4-2.4-1-2.4-1-.3-.8-.8-1-.8-1-.6-.4.1-.4.1-.4.7 0 1.1.7 1.1.7.6 1.1 1.7.8 2.1.6.1-.5.2-.8.4-.9-1.6-.2-3.2-.8-3.2-3.5 0-.8.3-1.4.7-1.9-.1-.2-.3-.9.1-1.9 0 0 .6-.2 1.9.7a6.6 6.6 0 0 1 3.5 0c1.3-.9 1.9-.7 1.9-.7.4 1 .2 1.7.1 1.9.5.5.7 1.1.7 1.9 0 2.7-1.6 3.3-3.2 3.5.3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4C13 13.7 15 11.1 15 8c0-3.9-3.1-7-7-7z"/></svg><span style="font-size:10px">GitHub</span></div>
<div class="fl-dir" data-ex="https://ieeexplore.ieee.org/document/11379848">${fileIcon}<span style="font-size:10px">IEEE Paper</span></div>
</div><div class="files-r" id="fl-r"></div></div>`});
  const w = wins['files'];
  function rf(path) {
    const r = w.querySelector('#fl-r'); r.innerHTML = '';
    (fm[path]||[]).forEach(f => {
      const [n,s] = f.split('|');
      const isDir = n.endsWith('/');
      const d = document.createElement('div'); d.className = 'fl-item';
      d.innerHTML = `${isDir ? dirIcon : fileIcon}<span class="fi-name">${n}</span><span class="fi-size">${s}</span>`;
      r.appendChild(d);
    });
    w.querySelectorAll('.fl-dir').forEach(el => el.classList.toggle('active', el.dataset.p === path));
  }
  rf('~');
  w.querySelector('#fl-l').addEventListener('click', e => {
    const d = e.target.closest('.fl-dir'); if (!d) return;
    if (d.dataset.p) rf(d.dataset.p);
    if (d.dataset.ex) window.open(d.dataset.ex, '_blank');
  });
}
function openEditor() {
  const fileList = [
    {name: 'hyprland.conf', path: '~/.config/hypr/hyprland.conf'},
    {name: 'train.py', path: '~/research/train.py'},
    {name: '.zshrc', path: '~/.zshrc'},
    {name: 'about.txt', path: '~/about.txt'},
  ];
  makeWin({id:'editor', title:'Editor', icon:'code', w:620, h:460, x:200, y:60,
    content:`<div class="editor-wrap">
<div class="editor-tabs" id="ed-tabs"></div>
<div class="editor-body"><div class="editor-gutter" id="ed-gutter"></div><div class="editor-content" id="ed-content"></div></div>
<div class="editor-status"><span id="ed-file">—</span><span id="ed-info">—</span><span style="margin-left:auto">UTF-8</span><span>LF</span></div>
</div>`});
  const w = wins['editor'];
  const tabs = w.querySelector('#ed-tabs');
  const gutter = w.querySelector('#ed-gutter');
  const content = w.querySelector('#ed-content');
  const fileEl = w.querySelector('#ed-file');
  const infoEl = w.querySelector('#ed-info');
  function showFile(idx) {
    const f = fileList[idx];
    const text = FILES[f.path] || '(empty)';
    const lines = text.split('\n');
    gutter.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
    const highlighted = lines.map(line => {
      let l = line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      l = l.replace(/^(\s*#.*)$/gm, '<span class="tc-dim">$1</span>');
      l = l.replace(/(["'])(?:(?!\1).)*\1/g, '<span style="color:var(--accent2)">$&</span>');
      l = l.replace(/\b(import|from|def|class|if|else|for|while|return|True|False|None|exec-once|bind|general|decoration|animations)\b/g, '<span style="color:var(--accent3)">$&</span>');
      l = l.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:var(--accent4)">$&</span>');
      return l;
    }).join('\n');
    content.innerHTML = highlighted;
    fileEl.textContent = f.path;
    infoEl.textContent = `${lines.length} lines`;
    tabs.querySelectorAll('.editor-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  }
  tabs.innerHTML = fileList.map((f, i) => `<div class="editor-tab${i===0?' active':''}" data-i="${i}">${f.name}</div>`).join('');
  tabs.addEventListener('click', e => {
    const t = e.target.closest('.editor-tab');
    if (t) showFile(parseInt(t.dataset.i));
  });
  showFile(0);
}
function openNotes() {
  const saved = localStorage.getItem('hypr-notes') || '';
  const savedTitle = localStorage.getItem('hypr-notes-title') || 'Untitled Note';
  makeWin({id:'notes', title:'Notes', icon:'note', w:440, h:380, x:300, y:100,
    content:`<div class="notes-wrap">
<input class="notes-title" id="n-title" value="${savedTitle}" placeholder="Note title..." spellcheck="false">
<div class="notes-body" id="n-body" contenteditable="true" spellcheck="false">${saved || 'Start typing here...'}</div>
</div>`});
  const w = wins['notes'];
  const body = w.querySelector('#n-body');
  const title = w.querySelector('#n-title');
  let saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem('hypr-notes', body.innerHTML);
      localStorage.setItem('hypr-notes-title', title.value);
    }, 500);
  }
  body.addEventListener('input', save);
  title.addEventListener('input', save);
  setTimeout(() => body.focus(), 300);
}
function openSettings() {
  makeWin({id:'settings', title:'Settings', icon:'settings', w:480, h:360, x:190, y:100,
    content:`<div class="win-body">
<h2 style="margin-bottom:14px">System Preferences</h2>
<h3>Appearance</h3>
<p>Theme: <span style="color:var(--text)">Sakura Light</span></p>
<p>Font: <span style="color:var(--text)">JetBrains Mono 12</span></p>
<p>Icons: <span style="color:var(--text)">Papirus-Light</span></p>
<div style="display:flex;gap:5px;margin-top:6px">
${['#e87171','#e8b84d','#6bc46b','#81c8be','#8caaee','#ca9ee6','#f4b8e4','#d4879a'].map(c => `<div style="width:22px;height:22px;border-radius:5px;background:${c}"></div>`).join('')}
</div>
<h3>System</h3>
<p>OS: <span style="color:var(--text)">Arch Linux x86_64</span></p>
<p>Kernel: <span style="color:var(--text)">6.12.7-arch1-1</span></p>
<p>WM: <span style="color:var(--text)">Hyprland 0.40.0</span></p>
<p>Shell: <span style="color:var(--text)">zsh 5.9</span></p>
<p>Display: <span style="color:var(--text)">2560×1440 @ 144Hz (Wayland)</span></p>
<h3>User</h3>
<p>Username: <span style="color:var(--text)">sayan</span> · Host: <span style="color:var(--text)">arch</span></p>
</div>`});
}
const APPS = [
  {id:'terminal', name:'Terminal', desc:'kitty — terminal emulator', icon:'terminal', bg:'rgba(38,35,33,.9)', color:'#e8e0d8', open:openTerminal},
  {id:'about', name:'About', desc:'Personal info & portfolio', icon:'user', bg:'rgba(212,135,154,.1)', color:'var(--accent)', open:openAbout},
  {id:'projects', name:'Projects', desc:'Code, builds, open source', icon:'folder', bg:'rgba(123,166,148,.1)', color:'var(--accent2)', open:openProjects},
  {id:'research', name:'Research', desc:'IEEE published paper 2025', icon:'research', bg:'rgba(139,126,200,.1)', color:'var(--accent3)', open:openResearch},
  {id:'files', name:'Files', desc:'Thunar file manager', icon:'folder', bg:'rgba(196,149,106,.1)', color:'var(--accent4)', open:openFiles},
  {id:'editor', name:'Editor', desc:'Code viewer / editor', icon:'code', bg:'rgba(139,126,200,.1)', color:'var(--accent3)', open:openEditor},
  {id:'notes', name:'Notes', desc:'Quick notes — persisted locally', icon:'note', bg:'rgba(212,135,154,.1)', color:'var(--accent)', open:openNotes},
  {id:'settings', name:'Settings', desc:'System preferences', icon:'settings', bg:'rgba(180,170,160,.1)', color:'var(--text-dim)', open:openSettings},
  {id:'github', name:'GitHub', desc:'github.com/sayanx64', icon:'file', bg:'rgba(58,53,53,.08)', color:'var(--text)', open:() => window.open('https://github.com/sayanx64','_blank')},
  {id:'linkedin', name:'LinkedIn', desc:'linkedin.com/in/sayarch', icon:'file', bg:'rgba(10,102,194,.08)', color:'#0a66c2', open:() => window.open('https://linkedin.com/in/sayarch','_blank')},
  {id:'ieee', name:'IEEE Paper', desc:'Open on IEEE Xplore', icon:'research', bg:'rgba(139,126,200,.08)', color:'var(--accent3)', open:() => window.open('https://ieeexplore.ieee.org/document/11379848','_blank')},
];
