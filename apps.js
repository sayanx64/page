/* ==========================================================================
   HYPRLAND APPLICATIONS SUITE (ABOUT, PROJECTS, RESEARCH, NEOVIM, BTOP, FILES)
   ========================================================================== */

function openAbout() {
  makeWin({
    id: 'about',
    title: 'about — sayan.pal',
    icon: 'user',
    w: 660,
    h: 560,
    x: 580,
    y: 30,
    content: `
      <div class="win-body">
        <!-- Hero Card -->
        <div class="hero-card">
          <img src="pfp.png" alt="Sayan Pal" class="hero-pfp">
          <div class="hero-info" style="flex:1">
            <h1>Sayan Pal</h1>
            <div class="hero-subtitle">B.Tech CSE (AI/ML) @ KIIT · IEEE Published Author · Open Source Dev</div>
            <div class="hero-links" style="flex-wrap:wrap">
              <a href="https://sayan.cyou" target="_blank" class="hero-link">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                sayan.cyou
              </a>
              <a href="https://github.com/sayanx64" target="_blank" class="hero-link">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                github/sayanx64
              </a>
              <a href="https://linkedin.com/in/sayarch" target="_blank" class="hero-link">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                in/sayarch
              </a>
              <a href="https://leetcode.com/sayarch" target="_blank" class="hero-link">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                leetcode/sayarch
              </a>
              <a href="mailto:spcodr@gmail.com" class="hero-link">spcodr@gmail.com</a>
            </div>
          </div>
        </div>

        <!-- Metric Grid -->
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value">9.07</div>
            <div class="stat-label">GPA (KIIT AI/ML)</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">★ 160+</div>
            <div class="stat-label">GitHub Stars</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">135+</div>
            <div class="stat-label">LeetCode Solved</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">1</div>
            <div class="stat-label">IEEE Paper (2025)</div>
          </div>
        </div>

        <h3>Experience & Leadership</h3>
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:var(--text);font-size:12.5px">XYlofy AI — Data Analyst Intern</strong>
            <span style="font-size:10px;color:var(--text-muted);font-family:'JetBrains Mono'">May 2026 · Remote</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-dim);margin-top:4px;line-height:1.55">
            Built sentiment analysis pipeline on Amazon Fine Food Reviews dataset (TextBlob, Pandas) — automated data cleaning, polarity scoring, and visualization delivered as reproducible Jupyter notebooks.
          </div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:var(--text);font-size:12.5px">GDG Cloud KIIT (Google Developer Groups)</strong>
            <span style="font-size:10px;color:var(--text-muted);font-family:'JetBrains Mono'">Feb 2026 – Present</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-dim);margin-top:4px;line-height:1.55">
            Cloud Member · Collaborated on cloud-native initiatives and built <em>Zap</em>. Evaluator for <em>Deploy or Die 2026</em> hackathon, judging architecture and technical specifications.
          </div>
        </div>

        <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:var(--accent-yellow);font-size:12.5px">Bronze Award — INDCON Industrial Innovation Challenge</strong>
            <span style="font-size:10px;color:var(--text-muted);font-family:'JetBrains Mono'">Mar 2026</span>
          </div>
          <div style="font-size:11.5px;color:var(--text-dim);margin-top:4px;line-height:1.55">
            National Level recognition from IIE Chennai Chapter, Anna University.
          </div>
        </div>

        <h3>Technical Skills</h3>
        <p style="font-size:12px;margin-bottom:4px"><strong>Languages:</strong></p>
        <div class="tag-container">
          <span class="tag blue">C</span>
          <span class="tag blue">C++</span>
          <span class="tag blue">Java</span>
          <span class="tag blue">Python</span>
          <span class="tag blue">Shell / Bash</span>
        </div>

        <p style="font-size:12px;margin:8px 0 4px"><strong>Web & Backend:</strong></p>
        <div class="tag-container">
          <span class="tag mauve">React</span>
          <span class="tag mauve">Next.js</span>
          <span class="tag mauve">Node.js</span>
          <span class="tag mauve">Express</span>
          <span class="tag mauve">Supabase</span>
          <span class="tag mauve">PHP</span>
          <span class="tag cyan">REST APIs</span>
          <span class="tag cyan">OAuth 2.0</span>
          <span class="tag peach">Railway</span>
          <span class="tag peach">Docker</span>
          <span class="tag peach">PostgreSQL</span>
          <span class="tag peach">MySQL</span>
        </div>

        <p style="font-size:12px;margin:8px 0 4px"><strong>Cloud, Infra & Tools:</strong></p>
        <div class="tag-container">
          <span class="tag cyan">Linux (Arch, Ubuntu, Kali, RHEL)</span>
          <span class="tag cyan">Cloudflare Workers (R2, KV, DO)</span>
          <span class="tag cyan">AWS</span>
          <span class="tag cyan">GCP</span>
          <span class="tag cyan">WebRTC</span>
          <span class="tag peach">Nginx</span>
          <span class="tag peach">systemd</span>
          <span class="tag peach">CI/CD</span>
          <span class="tag peach">Git</span>
          <span class="tag peach">Postman</span>
        </div>

        <p style="font-size:12px;margin:8px 0 4px"><strong>Data & Machine Learning:</strong></p>
        <div class="tag-container">
          <span class="tag green">Pandas</span>
          <span class="tag green">NumPy</span>
          <span class="tag green">Matplotlib</span>
          <span class="tag green">Seaborn</span>
          <span class="tag green">EfficientNet</span>
          <span class="tag green">GANs (SSGAN)</span>
          <span class="tag green">Semi-Supervised Learning</span>
          <span class="tag cyan">Web Scraping</span>
        </div>

        <h3>Education</h3>
        <p style="font-family:'JetBrains Mono';font-size:12px;color:var(--text-dim)">
          <strong>Kalinga Institute of Industrial Technology (KIIT University)</strong><br>
          B.Tech, Computer Science & Engineering (AI/ML Specialization) · Aug 2024 – Present<br>
          Bhubaneswar, India · GPA: <span style="color:var(--accent);font-weight:700">9.07</span>
        </p>
      </div>
    `
  });
}

function openProjects() {
  makeWin({
    id: 'projects',
    title: 'Projects ~ sayan.pal',
    icon: 'folder',
    w: 700,
    h: 560,
    x: 80,
    y: 40,
    content: `
      <div class="win-body">
        <h2>Engineering Projects</h2>
        <p style="color:var(--text-muted);font-size:12px;margin-bottom:16px">Production web platforms, open-source CLI tools, edge serverless architectures, and self-hosted infrastructure.</p>

        <!-- Project 1: statmux -->
        <div class="proj-card" style="border-left:3px solid var(--accent)">
          <div class="proj-header">
            <div class="proj-title">
              statmux — Developer Analytics Dashboard
              <span class="proj-star" style="color:var(--accent);background:rgba(220,138,120,0.1);border-color:rgba(220,138,120,0.25)">2026 – Present</span>
            </div>
            <span class="tag mauve">Live App</span>
          </div>
          <div class="proj-desc">
            Aggregates activity across <strong>GitHub, Codeforces, and LeetCode</strong> into a unified developer profile with a computed <strong>Code Health score</strong> and public shareable profile page (<code>/u/[username]</code>). Authored complete SDLC documentation (SRS, UML diagrams, test cases, RTM) as part of a formal software engineering methodology.
          </div>
          <div class="tag-container">
            <span class="tag mauve">Next.js</span>
            <span class="tag mauve">Express</span>
            <span class="tag blue">Supabase</span>
            <span class="tag peach">Railway</span>
            <span class="tag cyan">REST APIs</span>
          </div>
          <div class="proj-footer">
            <a href="https://github.com/sayanx64/statmux" target="_blank" class="proj-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              GitHub (sayanx64/statmux) ↗
            </a>
            <a href="https://statmux.sayan.cyou" target="_blank" class="proj-btn" style="color:var(--accent);font-weight:600">
              Live Demo: statmux.sayan.cyou ↗
            </a>
          </div>
        </div>

        <!-- Project 2: phub-cli -->
        <div class="proj-card">
          <div class="proj-header">
            <div class="proj-title">
              Terminal-Based Media Browser (phub-cli)
              <span class="proj-star">★ 160+ stars</span>
            </div>
            <span class="tag mauve">AUR Package</span>
          </div>
          <div class="proj-desc">
            Built and maintain an open-source, terminal-based (TUI) content browser packaged and distributed via the <strong>Arch User Repository (AUR)</strong>. Reverse-engineered a server-rendered JSON data feed to implement a detrended sparkline visualization for content engagement hotspots without a documented API.
          </div>
          <div class="tag-container">
            <span class="tag blue">Python</span>
            <span class="tag blue">Shell / Bash</span>
            <span class="tag cyan">BeautifulSoup</span>
            <span class="tag cyan">fzf</span>
            <span class="tag mauve">mpv</span>
          </div>
          <div class="proj-footer">
            <span style="font-size:10px;font-family:'JetBrains Mono';color:var(--text-muted)">AUR & GitHub Open Source</span>
            <a href="https://github.com/curtosis-org/phub-cli" target="_blank" class="proj-btn">
              View Repository ↗
            </a>
          </div>
        </div>

        <!-- Project 3: Zap -->
        <div class="proj-card">
          <div class="proj-header">
            <div class="proj-title">Zap — Serverless P2P & Cloud File Transfer</div>
            <span class="tag cyan">Feb 2026</span>
          </div>
          <div class="proj-desc">
            Built under <strong>GDG Cloud KIIT</strong>; runs entirely on Cloudflare's global edge network with zero origin server overhead. Architected backend on Cloudflare Workers with R2 object bucket storage and implemented direct peer-to-peer browser transfers via WebRTC DataChannel.
          </div>
          <div class="tag-container">
            <span class="tag cyan">Cloudflare Workers</span>
            <span class="tag cyan">R2 Storage</span>
            <span class="tag mauve">WebRTC DataChannel</span>
            <span class="tag blue">Edge Compute</span>
          </div>
          <div class="proj-footer">
            <span style="font-size:10px;font-family:'JetBrains Mono';color:var(--text-muted)">GDG Cloud KIIT Project</span>
            <a href="https://github.com/sayanx64" target="_blank" class="proj-btn">
              View Architecture ↗
            </a>
          </div>
        </div>

        <!-- Project 4: Self Hosted Mail Server -->
        <div class="proj-card">
          <div class="proj-header">
            <div class="proj-title">Mail Server — Self-Hosted Infrastructure</div>
            <span class="tag peach">Jan 2026</span>
          </div>
          <div class="proj-desc">
            Deployed a hardened production-grade mail stack on Debian (Postfix/Dovecot). Fully secured with Let's Encrypt automated TLS, Fail2Ban intrusion prevention, native IPv6 routing, and verified MX, SPF, DKIM, and DMARC DNS records.
          </div>
          <div class="tag-container">
            <span class="tag peach">Debian</span>
            <span class="tag blue">Postfix</span>
            <span class="tag blue">Dovecot</span>
            <span class="tag green">Fail2Ban</span>
            <span class="tag cyan">Certbot TLS</span>
          </div>
          <div class="proj-footer">
            <span style="font-size:10px;font-family:'JetBrains Mono';color:var(--text-muted)">sayan@sayan.cyou</span>
            <a href="https://github.com/sayanx64" target="_blank" class="proj-btn">
              Infrastructure Setup ↗
            </a>
          </div>
        </div>
      </div>
    `
  });
}

function openResearch() {
  makeWin({
    id: 'research',
    title: 'Research — IEEE Xplore 2025',
    icon: 'research',
    w: 660,
    h: 530,
    x: 150,
    y: 40,
    content: `
      <div class="win-body">
        <div class="research-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          IEEE Xplore · Published November 2025
        </div>

        <h2 style="font-size:1.1rem;line-height:1.4">
          Semi-Supervised Oral Cancer Image Classification Using GAN-Based Augmentation and EfficientNet-B3
        </h2>

        <p style="font-family:'JetBrains Mono';font-size:11px;color:var(--text-muted);margin:8px 0 12px;line-height:1.8">
          <span style="color:var(--text);font-weight:600">Sayan Pal</span>, Utkarsh, Shoham Chakraborty, Saurabh Bilgaiyan, Chiranjib Parida<br>
          <span style="color:var(--accent-teal)">2025 3rd DMIHER Int’l Conference on AI in Healthcare (IDICAIHEI), IEEE Xplore</span><br>
          Wardha, India · DOI: <strong style="color:var(--accent)">10.1109/IDICAIHEI65991.2025.11379848</strong>
        </p>

        <div class="research-callout">
          <strong>Abstract & Core Innovation:</strong> Proposed a semi-supervised deep learning pipeline combining EfficientNet-B3 with a K+1 Semi-Supervised GAN (SSGAN) for binary histological oral cancer classification under low-annotation clinical constraints. Achieved <strong>93.5% accuracy</strong> and an <strong>AUC of 0.95</strong>. ProtoNet few-shot evaluation reached <strong>94% accuracy</strong> on 5-way 10-shot tasks.
        </div>

        <h3>Key Empirical Metrics</h3>
        <div class="stat-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="stat-card">
            <div class="stat-value" style="color:var(--accent-green)">93.5%</div>
            <div class="stat-label">Accuracy (AUC 0.95)</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color:var(--accent-teal)">K+1 SSGAN</div>
            <div class="stat-label">Semi-Supervised GAN</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color:var(--accent)">94.0%</div>
            <div class="stat-label">5-Way 10-Shot ProtoNet</div>
          </div>
        </div>

        <h3>Methodology Stack</h3>
        <div class="tag-container">
          <span class="tag mauve">PyTorch</span>
          <span class="tag blue">EfficientNet-B3</span>
          <span class="tag cyan">K+1 SSGANs</span>
          <span class="tag green">Prototypical Networks</span>
          <span class="tag peach">Medical Image Diagnostics</span>
        </div>

        <div style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border);display:flex;justify-content:flex-end">
          <a href="https://ieeexplore.ieee.org/document/11379848" target="_blank" class="proj-btn" style="font-size:12px;background:rgba(220,138,120,0.08);padding:6px 14px;border-radius:9999px;border:1px solid rgba(220,138,120,0.22)">
            Read Official Paper on IEEE Xplore ↗
          </a>
        </div>
      </div>
    `
  });
}

function openEditor() {
  const fileList = [
    { name: 'hyprland.conf', path: '~/.config/hypr/hyprland.conf', lang: 'conf' },
    { name: 'train.py', path: '~/research/train.py', lang: 'python' },
    { name: '.zshrc', path: '~/.zshrc', lang: 'bash' },
    { name: 'about.md', path: '~/about.md', lang: 'markdown' }
  ];

  makeWin({
    id: 'editor',
    title: 'nvim ~ hyprland.conf',
    icon: 'code',
    w: 720,
    h: 500,
    x: 180,
    y: 60,
    content: `
      <div class="nvim-wrap">
        <div class="nvim-tabs" id="nvim-tabs"></div>
        <div class="nvim-main">
          <!-- NvimTree Sidebar -->
          <div class="nvim-tree">
            <div class="nvim-tree-head">
              <span>EXPLORER</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </div>
            <div id="nvim-tree-files"></div>
          </div>
          <!-- Code View -->
          <div class="nvim-code-pane">
            <div class="nvim-gutter" id="nvim-gutter"></div>
            <div class="nvim-code" id="nvim-code"></div>
          </div>
        </div>
        <!-- Lualine Statusline -->
        <div class="nvim-statusline">
          <div class="sl-mode">NORMAL</div>
          <div class="sl-branch">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
            <span>main</span>
          </div>
          <div class="sl-file" id="sl-file-name">hyprland.conf</div>
          <div class="sl-right">
            <div class="sl-info">UTF-8</div>
            <div class="sl-info" id="sl-lang">CONF</div>
            <div class="sl-pos">1:1</div>
          </div>
        </div>
      </div>
    `
  });

  const w = wins['editor'];
  const tabs = w.querySelector('#nvim-tabs');
  const treeFiles = w.querySelector('#nvim-tree-files');
  const gutter = w.querySelector('#nvim-gutter');
  const code = w.querySelector('#nvim-code');
  const slFileName = w.querySelector('#sl-file-name');
  const slLang = w.querySelector('#sl-lang');

  function renderFile(idx) {
    const f = fileList[idx];
    const raw = FILES[f.path] || '';
    const lines = raw.split('\n');

    gutter.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');

    // Syntax highlighting simulation
    const highlighted = lines.map(line => {
      let l = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      l = l.replace(/^(\s*#.*)$/gm, '<span class="tc-dim">$1</span>');
      l = l.replace(/(["'])(?:(?!\1).)*\1/g, '<span class="tc-green">$&</span>');
      l = l.replace(/\b(import|from|export|const|let|var|def|class|if|else|for|while|return|True|False|None|interface|type|async|await|exec-once|bind|general|decoration|animations)\b/g, '<span class="tc-mauve" style="font-weight:600">$&</span>');
      l = l.replace(/\b(\d+\.?\d*)\b/g, '<span class="tc-peach">$&</span>');
      return l;
    }).join('\n');

    code.innerHTML = highlighted;
    slFileName.textContent = f.name;
    slLang.textContent = f.lang.toUpperCase();

    tabs.querySelectorAll('.nvim-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
    treeFiles.querySelectorAll('.nvim-tree-item').forEach((item, i) => item.classList.toggle('active', i === idx));
  }

  tabs.innerHTML = fileList.map((f, i) => `
    <div class="nvim-tab${i === 0 ? ' active' : ''}" data-i="${i}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
      <span>${f.name}</span>
    </div>
  `).join('');

  treeFiles.innerHTML = fileList.map((f, i) => `
    <div class="nvim-tree-item${i === 0 ? ' active' : ''}" data-i="${i}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/></svg>
      <span>${f.name}</span>
    </div>
  `).join('');

  tabs.addEventListener('click', e => {
    const tab = e.target.closest('.nvim-tab');
    if (tab) renderFile(+tab.dataset.i);
  });

  treeFiles.addEventListener('click', e => {
    const item = e.target.closest('.nvim-tree-item');
    if (item) renderFile(+item.dataset.i);
  });

  renderFile(0);
}

function openFiles() {
  const dirStructure = {
    '~': ['about.md|2.2K', 'README.md|0.6K', '.zshrc|3.8K', '.config/|—', 'projects/|—', 'research/|—'],
    '~/projects': ['statmux/|—', 'phub-cli/|—', 'zap/|—', 'mail-server/|—'],
    '~/projects/statmux': ['README.md|1.5K', 'package.json|0.8K'],
    '~/projects/zap': ['worker.ts|1.4K', 'webrtc.ts|2.1K'],
    '~/projects/phub-cli': ['README.md|1.1K', 'phub.py|3.4K', 'PKGBUILD|0.6K'],
    '~/projects/mail-server': ['README.md|0.9K', 'postfix.cf|1.2K', 'dovecot.conf|1.1K'],
    '~/research': ['oral-cancer-ssgan.pdf|1.8M', 'README.md|0.8K', 'train.py|1.1K'],
    '~/.config': ['hypr/|—', 'kitty/|—', 'waybar/|—', 'nvim/|—']
  };

  makeWin({
    id: 'files',
    title: 'Thunar ~ Home',
    icon: 'folder',
    w: 600,
    h: 400,
    x: 140,
    y: 110,
    content: `
      <div class="files-wrap">
        <div class="files-left" id="fl-left">
          <div class="fl-dir active" data-p="~">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <span>Home</span>
          </div>
          <div class="fl-dir" data-p="~/projects">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span>Projects</span>
          </div>
          <div class="fl-dir" data-p="~/research">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            <span>Research</span>
          </div>
          <div class="fl-dir" data-p="~/.config">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0"/></svg>
            <span>Config</span>
          </div>
        </div>
        <div class="files-right" id="fl-right"></div>
      </div>
    `
  });

  const w = wins['files'];
  function showDir(path) {
    const list = dirStructure[path] || [];
    const right = w.querySelector('#fl-right');
    right.innerHTML = list.map(item => {
      const [name, size] = item.split('|');
      const isDir = name.endsWith('/');
      return `
        <div class="fl-item" data-path="${path === '~' ? '~/' + name : path + '/' + name}" data-isdir="${isDir}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isDir ? 'var(--accent-secondary)' : 'var(--accent)'}" stroke-width="2">
            ${isDir ? '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>' : '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>'}
          </svg>
          <span class="fi-name">${name}</span>
          <span class="fi-size">${size}</span>
        </div>
      `;
    }).join('');

    w.querySelectorAll('.fl-dir').forEach(d => d.classList.toggle('active', d.dataset.p === path));

    right.querySelectorAll('.fl-item').forEach(item => {
      item.addEventListener('dblclick', () => {
        if (item.dataset.isdir === 'true') {
          showDir(item.dataset.path.slice(0, -1));
        } else {
          openEditor();
        }
      });
    });
  }

  w.querySelector('#fl-left').addEventListener('click', e => {
    const dir = e.target.closest('.fl-dir');
    if (dir && dir.dataset.p) showDir(dir.dataset.p);
  });

  showDir('~');
}

function openBtop() {
  makeWin({
    id: 'btop',
    title: 'btop — Resource Monitor',
    icon: 'btop',
    w: 580,
    h: 440,
    x: 220,
    y: 80,
    content: `
      <div class="win-body" style="background:var(--surface-solid);padding:18px;">
        <div class="btop-grid">
          <!-- CPU Box -->
          <div class="btop-box">
            <div class="btop-title">
              <span>CPU Usage</span>
              <span id="btop-cpu-val" style="color:var(--accent-red)">18%</span>
            </div>
            <div class="btop-bar-bg">
              <div class="btop-bar-fill" id="btop-cpu-bar" style="width:18%;background:var(--accent-red)"></div>
            </div>
            <div style="font-size:10px;color:var(--text-muted);display:flex;justify-content:space-between">
              <span>Ryzen 7 7840HS</span>
              <span>16 Threads · 4.8GHz</span>
            </div>
          </div>

          <!-- Memory Box -->
          <div class="btop-box">
            <div class="btop-title">
              <span>Memory (RAM)</span>
              <span id="btop-ram-val" style="color:var(--accent-peach)">4.2G / 16G</span>
            </div>
            <div class="btop-bar-bg">
              <div class="btop-bar-fill" id="btop-ram-bar" style="width:26%;background:var(--accent-peach)"></div>
            </div>
            <div style="font-size:10px;color:var(--text-muted);display:flex;justify-content:space-between">
              <span>DDR5 5600MHz</span>
              <span>ZRAM: 0B / 8G</span>
            </div>
          </div>
        </div>

        <!-- Processes List -->
        <div class="btop-box" style="margin-top:10px">
          <div class="btop-title">Top Active Processes</div>
          <table style="width:100%;font-size:11px;color:var(--text-dim);border-collapse:collapse;margin-top:4px">
            <thead>
              <tr style="color:var(--text-muted);text-align:left;border-bottom:1px solid var(--border)">
                <th style="padding:4px 0">PID</th>
                <th>Program</th>
                <th>CPU%</th>
                <th>MEM%</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody id="btop-proc-list">
              <tr><td style="padding:4px 0">1204</td><td style="color:var(--accent)">Hyprland</td><td>3.2%</td><td>1.4%</td><td>sayan</td></tr>
              <tr><td style="padding:4px 0">1450</td><td style="color:var(--accent-teal)">kitty</td><td>1.1%</td><td>0.8%</td><td>sayan</td></tr>
              <tr><td style="padding:4px 0">1890</td><td style="color:var(--accent-green)">nvim</td><td>0.6%</td><td>0.5%</td><td>sayan</td></tr>
              <tr><td style="padding:4px 0">2102</td><td style="color:var(--accent-peach)">waybar</td><td>0.4%</td><td>0.3%</td><td>sayan</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  });
}

const APPS = [
  { id: 'about', name: 'About Sayan', desc: 'GPA 9.07, GDG Cloud KIIT, LeetCode (135+)', icon: 'user', bg: 'rgba(23,146,153,0.1)', color: 'var(--accent-teal)', open: openAbout },
  { id: 'projects', name: 'Projects Showcase', desc: 'statmux, phub-cli (★160+), Zap, Mail Server', icon: 'folder', bg: 'rgba(114,135,253,0.1)', color: 'var(--accent-secondary)', open: openProjects },
  { id: 'research', name: 'IEEE Research', desc: 'Oral Cancer GAN + EfficientNet (93.5% Acc)', icon: 'research', bg: 'rgba(136,57,239,0.1)', color: 'var(--accent-mauve)', open: openResearch },
  { id: 'terminal', name: 'Kitty Terminal', desc: 'Fastfetch, commands & shell', icon: 'terminal', bg: 'rgba(220,138,120,0.1)', color: 'var(--accent)', open: openTerminal },
  { id: 'editor', name: 'Neovim (LazyVim)', desc: 'hyprland.conf, train.py, .zshrc', icon: 'code', bg: 'rgba(64,160,43,0.1)', color: 'var(--accent-green)', open: openEditor },
  { id: 'files', name: 'Thunar Files', desc: 'Browse projects, config, and research', icon: 'folder', bg: 'rgba(254,100,11,0.1)', color: 'var(--accent-peach)', open: openFiles },
  { id: 'btop', name: 'btop System Monitor', desc: 'CPU, memory & process viewer', icon: 'btop', bg: 'rgba(210,15,57,0.1)', color: 'var(--accent-red)', open: openBtop },
  { id: 'leetcode', name: 'LeetCode Profile', desc: '135+ Problems solved (@sayarch)', icon: 'code', bg: 'rgba(223,142,29,0.1)', color: 'var(--accent-yellow)', open: () => window.open('https://leetcode.com/sayarch', '_blank') },
  { id: 'github', name: 'GitHub Profile', desc: 'github.com/sayanx64', icon: 'file', bg: 'rgba(76,79,105,0.06)', color: 'var(--text)', open: () => window.open('https://github.com/sayanx64', '_blank') },
  { id: 'linkedin', name: 'LinkedIn Profile', desc: 'linkedin.com/in/sayarch', icon: 'file', bg: 'rgba(30,102,245,0.1)', color: 'var(--accent-blue)', open: () => window.open('https://linkedin.com/in/sayarch', '_blank') }
];
