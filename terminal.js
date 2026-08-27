/* ==========================================================================
   KITTY TERMINAL & FASTFETCH SYSTEM EMULATOR
   ========================================================================== */

let termOut = null;
let termIn = null;
let termCwd = '~';
const cmdHist = [];
let histIdx = -1;

const FS = {
  '~': { type: 'dir', children: ['about.md', 'projects/', 'research/', '.config/', 'README.md', '.zshrc'] },
  '~/projects': { type: 'dir', children: ['statmux/', 'phub-cli/', 'zap/', 'mail-server/'] },
  '~/projects/statmux': { type: 'dir', children: ['README.md', 'statmux.config.ts', 'package.json'] },
  '~/projects/phub-cli': { type: 'dir', children: ['README.md', 'phub.py', 'PKGBUILD'] },
  '~/projects/zap': { type: 'dir', children: ['README.md', 'worker.ts', 'webrtc.ts', 'wrangler.toml'] },
  '~/projects/mail-server': { type: 'dir', children: ['README.md', 'postfix.cf', 'dovecot.conf'] },
  '~/research': { type: 'dir', children: ['oral-cancer-ssgan.pdf', 'results/', 'README.md', 'train.py'] },
  '~/research/results': { type: 'dir', children: ['accuracy.csv', 'confusion_matrix.png', 'roc_curve.png'] },
  '~/.config': { type: 'dir', children: ['hypr/', 'kitty/', 'waybar/', 'nvim/'] },
  '~/.config/hypr': { type: 'dir', children: ['hyprland.conf'] },
  '~/.config/kitty': { type: 'dir', children: ['kitty.conf'] },
  '~/.config/waybar': { type: 'dir', children: ['config', 'style.css'] },
  '~/.config/nvim': { type: 'dir', children: ['init.lua'] }
};

const FILES = {
  '~/about.md': `# Sayan Pal
Website: https://sayan.cyou
GitHub: https://github.com/sayanx64
LinkedIn: https://linkedin.com/in/sayarch
LeetCode: https://leetcode.com/sayarch (135+ Solved)
Email: spcodr@gmail.com | Phone: +91-629-0056-864

## Education
Kalinga Institute of Industrial Technology (KIIT University)
B.Tech, Computer Science & Engineering (AI/ML Specialization) — GPA 9.07
Bhubaneswar, India · Aug 2024 – Present

## Technical Skills
- Languages: C, C++, Java, Python, Shell/Bash
- Web & Backend: React, Next.js, Node.js, Express, Supabase, PHP, REST APIs, OAuth 2.0
- Data & ML: Pandas, NumPy, Matplotlib, Seaborn, EfficientNet, GANs, Semi-Supervised Learning
- Cloud & Tools: Linux (Arch), AWS, GCP, Cloudflare Workers (R2/KV), Railway, Docker, WebRTC

## Key Projects
- statmux (https://statmux.sayan.cyou) — Developer Analytics Dashboard (Next.js, Express, Supabase, Railway)
- Terminal-Based Media Browser (phub-cli) — AUR Package, 160+ GitHub Stars
- Zap — Serverless P2P & Cloud File Transfer (GDG Cloud KIIT, Cloudflare Workers, R2, WebRTC)
- Production Mail Server — Hardened Debian, Postfix/Dovecot, Fail2Ban, TLS, IPv6

## Experience & Leadership
- XYlofy AI — Data Analyst Intern (May 2026, Remote)
- GDG Cloud KIIT — Cloud Member (Feb 2026 – Present)
- Bronze Award — INDCON Industrial Innovation Challenge (Mar 2026, Anna University)
- IEEE Published Author — DMIHER 2025 (DOI: 10.1109/IDICAIHEI65991.2025.11379848)`,

  '~/README.md': `# sayan@arch ~ Hyprland Rice
Welcome to Sayan Pal's interactive portfolio environment.
Live Projects: statmux (https://statmux.sayan.cyou)
IEEE Paper: DOI: 10.1109/IDICAIHEI65991.2025.11379848
Built with Arch Linux, Hyprland Wayland, and Sakura Latte aesthetics.`,

  '~/.zshrc': `# ~/.zshrc - Starship Prompt
export EDITOR=nvim
export BROWSER=firefox
alias ll='ls -la --color=auto'
alias gs='git status -sb'
alias statmux='open https://statmux.sayan.cyou'
alias vim='nvim'
alias fastfetch='fastfetch --kitty-direct'
alias btw='echo "i use arch btw"'
eval "$(starship init zsh)"`,

  '~/projects/statmux/statmux.config.ts': `// statmux — Developer Analytics Dashboard Configuration
export interface DeveloperProfile {
  username: string;
  githubHandle: string;
  codeforcesHandle: string;
  leetcodeHandle: string;
  codeHealthScore: number;
}

export const statmuxConfig = {
  appUrl: 'https://statmux.sayan.cyou',
  apiBase: 'https://api.statmux.sayan.cyou/v1',
  integrations: ['github', 'codeforces', 'leetcode'],
  features: {
    sdlcAuditing: true,
    codeHealthComputation: true,
    publicProfiles: true
  }
};`,

  '~/research/README.md': `# Semi-Supervised Oral Cancer Image Classification
Authors: Sayan Pal, Utkarsh, Shoham Chakraborty, Saurabh Bilgaiyan, Chiranjib Parida
Conference: 2025 3rd DMIHER Int’l Conference on AI in Healthcare (IDICAIHEI), IEEE Xplore
DOI: 10.1109/IDICAIHEI65991.2025.11379848
Performance: 93.5% accuracy (AUC 0.95), ProtoNet 94% on 5-way 10-shot tasks.
Methodology: K+1 SSGAN + EfficientNet-B3 + Prototypical Few-Shot Metric.`,

  '~/research/train.py': `import torch
import torch.nn as nn
from torchvision.models import efficientnet_b3
from gan import KPlusOneSSGAN

def train_pipeline(epochs=100, lr=1e-4):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = efficientnet_b3(weights=None, num_classes=2).to(device)
    ssgan = KPlusOneSSGAN(latent_dim=128).to(device)
    optimizer = torch.optim.AdamW(model.parameters(), lr=lr)
    
    print("[*] Training Semi-Supervised K+1 SSGAN + EfficientNet-B3...")
    for epoch in range(1, epochs + 1):
        # Semi-supervised feature learning on low-annotation tissue histology
        pass
    print("[+] Model achieved 93.5% accuracy (AUC 0.95) and 94% ProtoNet few-shot accuracy.")

if __name__ == "__main__":
    train_pipeline()`,

  '~/.config/hypr/hyprland.conf': `# Hyprland Rice Config
monitor=,preferred,auto,1
exec-once = waybar & kitty & hyprpaper

general {
    gaps_in = 6
    gaps_out = 12
    border_size = 1
    col.active_border = rgba(dc8a78ee) rgba(7287fdee) 45deg
    col.inactive_border = rgba(dce0e888)
    layout = dwindle
}

decoration {
    rounding = 12
    drop_shadow = true
    shadow_range = 24
    shadow_render_power = 2
    col.shadow = rgba(4c4f6918)
}

animations {
    enabled = true
    bezier = myBezier, 0.05, 0.9, 0.1, 1.05
    animation = windows, 1, 6, myBezier
    animation = windowsOut, 1, 5, default, popin 80%
    animation = border, 1, 10, default
    animation = fade, 1, 6, default
    animation = workspaces, 1, 6, default, slide
}

bind = SUPER, RETURN, exec, kitty
bind = SUPER, SPACE, exec, rofi -show drun
bind = SUPER, Q, killactive
bind = SUPER, V, togglefloating
bind = SUPER, W, exec, hyprpaper --next`,

  '~/projects/phub-cli/README.md': `# Terminal-Based Media Browser (phub-cli) ★ 160+
Open-source terminal (TUI) media browser distributed via the Arch User Repository (AUR).
- Reverse-engineered JSON engagement feed with detrended sparkline visualization.
- Stack: Python, Shell, BeautifulSoup, fzf, mpv
- 160+ GitHub stars.`
};

const FASTFETCH_ART = `
<div style="display:flex;gap:18px;align-items:flex-start;margin:2px 0 4px;flex-wrap:nowrap;">
  <pre style="font-family:'JetBrains Mono',monospace;font-size:9.5px;line-height:1.12;font-weight:700;margin:0;user-select:none;flex-shrink:0;">
<span style="color:#04a5e5">                  -\`</span>
<span style="color:#04a5e5">                 .o+\`</span>
<span style="color:#04a5e5">                \`ooo/</span>
<span style="color:#1e66f5">               \`+oooo:</span>
<span style="color:#1e66f5">              \`+oooooo:</span>
<span style="color:#1e66f5">              -+oooooo+:</span>
<span style="color:#209fb5">            \`/:-:++oooo+:</span>
<span style="color:#209fb5">           \`/++++/+++++++:</span>
<span style="color:#209fb5">          \`/++++++++++++++:</span>
<span style="color:#179299">         \`/+++ooooooooooooo/\`</span>
<span style="color:#179299">        ./ooosssso++osssssso+\`</span>
<span style="color:#179299">       .oossssso-\`\`\`\`/ossssss+\`</span>
<span style="color:#8839ef">      -osssssso.      :ssssssso.</span>
<span style="color:#8839ef">     :osssssss/        osssso+++.</span>
<span style="color:#8839ef">    /ossssssss/        +ssssooo/-</span>
<span style="color:#7287fd">  \`/ossssso+/:-        -:/+osssso+-</span>
<span style="color:#7287fd"> \`+sso+:-\`                 \`.-/+oso:</span>
<span style="color:#7287fd">\`++:.                           \`-/+/</span>
<span style="color:#7287fd">.\`                                 \`/</span>
  </pre>
  <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;line-height:1.38;min-width:0;flex:1;">
    <div><span class="tc-green" style="font-weight:800;font-size:12px;">sayan</span><span class="tc-dim">@</span><span class="tc-blue" style="font-weight:800;font-size:12px;">arch</span></div>
    <div style="color:var(--border);font-weight:700;margin:1px 0;">-----------------------------------</div>
    <div><span class="tc-sky" style="font-weight:700">OS:</span> Arch Linux x86_64</div>
    <div><span class="tc-sky" style="font-weight:700">Host:</span> Hyprland Wayland (v0.42.0)</div>
    <div><span class="tc-sky" style="font-weight:700">Kernel:</span> 6.12.7-arch1-1-zen</div>
    <div><span class="tc-sky" style="font-weight:700">Uptime:</span> 4 hours, 20 mins</div>
    <div><span class="tc-sky" style="font-weight:700">Packages:</span> 1142 (pacman), 34 (aur)</div>
    <div><span class="tc-sky" style="font-weight:700">Shell:</span> zsh 5.9 (x86_64-pc-linux-gnu)</div>
    <div><span class="tc-sky" style="font-weight:700">Terminal:</span> kitty 0.35.2 (JetBrains Mono)</div>
    <div><span class="tc-sky" style="font-weight:700">WM:</span> Hyprland (DWM Master & Stack)</div>
    <div><span class="tc-sky" style="font-weight:700">Theme:</span> Sakura Latte [Catppuccin]</div>
    <div><span class="tc-sky" style="font-weight:700">Education:</span> KIIT CS AI/ML (<span class="tc-green" style="font-weight:700">GPA 9.07</span>)</div>
    <div><span class="tc-sky" style="font-weight:700">LeetCode:</span> <span class="tc-yellow" style="font-weight:700">135+ Solved (@sayarch)</span></div>
    <div><span class="tc-sky" style="font-weight:700">Featured:</span> <span class="tc-mauve" style="font-weight:700">statmux.sayan.cyou</span></div>
    <div><span class="tc-sky" style="font-weight:700">AUR PKG:</span> <span class="tc-peach" style="font-weight:700">phub-cli (160+ stars)</span></div>
    <div><span class="tc-sky" style="font-weight:700">Research:</span> <span class="tc-teal" style="font-weight:700">IEEE Xplore Published (Nov 2025)</span></div>
    <div><span class="tc-sky" style="font-weight:700">Memory:</span> 4.21 GiB / 15.28 GiB (27%)</div>
    <div class="color-bar">
      <span style="background:#d20f39"></span>
      <span style="background:#fe640b"></span>
      <span style="background:#df8e1d"></span>
      <span style="background:#40a02b"></span>
      <span style="background:#04a5e5"></span>
      <span style="background:#1e66f5"></span>
      <span style="background:#8839ef"></span>
      <span style="background:#dc8a78"></span>
    </div>
  </div>
</div>`;

function resolvePath(p) {
  if (!p) return termCwd;
  if (p === '~') return '~';
  if (p.startsWith('~/')) return p;
  if (p === '..') {
    if (termCwd === '~') return '~';
    const parts = termCwd.split('/');
    parts.pop();
    return parts.join('/') || '~';
  }
  if (p === '.') return termCwd;
  return (termCwd === '~' ? '~/' : termCwd + '/') + p.replace(/\/$/, '');
}

function treeView(path, prefix = '') {
  const node = FS[path];
  if (!node) return '';
  let out = '';
  const kids = node.children;
  kids.forEach((k, i) => {
    const last = i === kids.length - 1;
    const branch = last ? '└── ' : '├── ';
    const isDir = k.endsWith('/');
    const name = isDir ? `<span class="tc-blue">${k}</span>` : `<span class="tc-teal">${k}</span>`;
    out += prefix + branch + name + '\n';
    if (isDir) {
      const full = path === '~' ? '~/' + k.slice(0, -1) : path + '/' + k.slice(0, -1);
      if (FS[full]) out += treeView(full, prefix + (last ? '    ' : '│   '));
    }
  });
  return out;
}

function execCmd(raw) {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);
  if (!cmd) return '';

  switch (cmd) {
    case 'fastfetch':
    case 'neofetch':
      return FASTFETCH_ART;

    case 'clear':
      termOut.innerHTML = '';
      return null;

    case 'ls': {
      const dir = resolvePath(args[0]);
      const node = FS[dir];
      if (!node) return `<span class="tc-red">ls: cannot access '${args[0] || dir}': No such file or directory</span>`;
      return node.children.map(f => f.endsWith('/') ? `<span class="tc-blue" style="font-weight:600">${f}</span>` : `<span class="tc-teal">${f}</span>`).join('  ');
    }

    case 'cat': {
      if (!args[0]) return `<span class="tc-red">cat: missing operand</span>`;
      const fp = resolvePath(args[0]);
      const ct = FILES[fp];
      if (!ct) return `<span class="tc-red">cat: ${args[0]}: No such file or directory</span>`;
      return ct.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    case 'cd': {
      const to = args[0] || '~';
      const r = resolvePath(to);
      if (FS[r] || r === '~') {
        termCwd = r;
        updatePromptCwd();
        return '';
      }
      return `<span class="tc-red">cd: ${to}: No such file or directory</span>`;
    }

    case 'pwd':
      return termCwd.replace('~', '/home/sayan');

    case 'whoami':
      return '<span class="tc-green" style="font-weight:600">sayan (Sayan Pal · CS KIIT AI/ML)</span>';

    case 'statmux':
      window.open('https://statmux.sayan.cyou', '_blank');
      return `<span class="tc-mauve" style="font-weight:700">Opening statmux Developer Dashboard (https://statmux.sayan.cyou)...</span>
<span class="tc-dim">GitHub repository: https://github.com/sayanx64/statmux</span>`;

    case 'leetcode':
      window.open('https://leetcode.com/sayarch', '_blank');
      return `<span class="tc-yellow">Opening LeetCode profile (135+ Solved) @sayarch...</span>`;

    case 'resume':
      if (typeof openAbout === 'function') openAbout();
      return '<span class="tc-green">Opening Sayan Pal\'s Complete Resume & Bio...</span>';

    case 'tree': {
      const dir = resolvePath(args[0]);
      const path = FS[dir] ? dir : termCwd;
      return `<span class="tc-bold">${path}</span>\n` + treeView(path);
    }

    case 'theme': {
      const THEMES = ['sakura-latte', 'frost', 'matcha', 'wisteria', 'rose-gold'];
      const NAMES = {
        'sakura-latte': 'Sakura Latte',
        'latte': 'Sakura Latte',
        'frost': 'Frost',
        'matcha': 'Matcha',
        'wisteria': 'Wisteria',
        'rose-gold': 'Rose Gold',
        'rose': 'Rose Gold'
      };
      const arg = (args[0] || '').toLowerCase();
      if (!arg || arg === 'list') {
        return `<span class="tc-mauve" style="font-weight:700">Light Themes:</span>
  <span class="tc-bold">latte</span>       - Sakura Latte (Rosewater & Lavender)
  <span class="tc-bold">frost</span>       - Crisp Blue-Silver
  <span class="tc-bold">matcha</span>      - Botanical Sage & Cream
  <span class="tc-bold">wisteria</span>    - Soft Lilac & Purple
  <span class="tc-bold">rose-gold</span>   - Warm Blush Peach & Gold
  <span class="tc-dim">Usage: theme &lt;name&gt; or theme next</span>`;
      }
      if (arg === 'next') {
        const cur = document.documentElement.getAttribute('data-theme') || 'sakura-latte';
        const nextIdx = (THEMES.indexOf(cur) + 1) % THEMES.length;
        const nextT = THEMES[nextIdx];
        document.documentElement.setAttribute('data-theme', nextT);
        const nameEl = document.getElementById('theme-name');
        if (nameEl) nameEl.textContent = NAMES[nextT] || nextT;
        return `<span class="tc-green">Switched theme to ${NAMES[nextT] || nextT}</span>`;
      }
      const target = arg === 'latte' ? 'sakura-latte' : (arg === 'rose' ? 'rose-gold' : arg);
      if (THEMES.includes(target)) {
        document.documentElement.setAttribute('data-theme', target);
        const nameEl = document.getElementById('theme-name');
        if (nameEl) nameEl.textContent = NAMES[target] || target;
        return `<span class="tc-green">Switched theme to ${NAMES[target] || target}</span>`;
      }
      return `<span class="tc-red">Unknown theme: '${arg}'. Type <span class="tc-yellow">theme list</span> for available themes.</span>`;
    }

    case 'wp':
    case 'wallpaper': {
      const arg = (args[0] || '').toLowerCase();
      if (!arg || arg === 'list') {
        return `<span class="tc-sky" style="font-weight:700">Animated Light Wallpapers:</span>
  <span class="tc-bold">1. sakura</span>    - Drifting Sakura Petals
  <span class="tc-bold">2. snow</span>      - Gentle Winter Snowfall
  <span class="tc-bold">3. firefly</span>   - Warm Firefly Garden & Waves
  <span class="tc-bold">4. rain</span>      - Soft Lavender Rain & Reflections
  <span class="tc-bold">5. bubble</span>    - Floating Translucent Bubbles
  <span class="tc-bold">6. cream</span>     - Clean Minimal Gradient
  <span class="tc-bold">7. aurora</span>    - Soft Aurora Ribbon Drift
  <span class="tc-dim">Usage: wp &lt;name&gt; or wp next (or Super+W)</span>`;
      }
      if (arg === 'next') {
        if (typeof cycleWallpaper === 'function') cycleWallpaper();
        return `<span class="tc-cyan">Cycled to next wallpaper.</span>`;
      }
      if (typeof setWallpaper === 'function') {
        const name = setWallpaper(arg);
        return `<span class="tc-green">Wallpaper set to ${name}</span>`;
      }
      return '';
    }

    case 'btop':
    case 'htop':
      if (typeof openBtop === 'function') {
        openBtop();
        return '<span class="tc-cyan">Launching btop monitor GUI...</span>';
      }
      return '';

    case 'nvim':
    case 'vim':
    case 'code':
      if (typeof openEditor === 'function') {
        openEditor();
        return '<span class="tc-green">Opening Neovim (LazyVim)...</span>';
      }
      return '';

    case 'projects':
      if (typeof openProjects === 'function') openProjects();
      return '<span class="tc-cyan">Opening Projects portfolio...</span>';

    case 'research':
    case 'paper':
      if (typeof openResearch === 'function') openResearch();
      return '<span class="tc-mauve">Opening IEEE Research showcase...</span>';

    case 'about':
      if (typeof openAbout === 'function') openAbout();
      return '<span class="tc-green">Opening About Sayan...</span>';

    case 'cmatrix':
      return `<span class="tc-green">01010101010101010101010101010101010101010101010101
10101010101010101010101010101010101010101010101010
01010101010101 ARCH HYPRLAND WAYLAND 01010101010101
10101010101010101010101010101010101010101010101010</span>`;

    case 'fortune':
      const fortunes = [
        '"It works on my machine." — every developer',
        '"Talk is cheap. Show me the code." — Linus Torvalds',
        '"Real programmers use Arch Linux and Hyprland."',
        '"Semi-supervised GANs > brute force training."',
        '"statmux.sayan.cyou — single dashboard for all dev metrics."'
      ];
      return `<span class="tc-yellow">${fortunes[Math.floor(Math.random() * fortunes.length)]}</span>`;

    case 'cowsay':
      const msg = args.join(' ') || 'i use arch btw';
      const border = '_'.repeat(msg.length + 2);
      return ` ${border}\n< ${msg} >\n ${'-'.repeat(msg.length + 2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;

    case 'btw':
      return `<span class="tc-mauve" style="font-weight:700">i use arch btw</span>`;

    case 'donut': {
      let A = 0, B = 0;
      const container = document.createElement('pre');
      container.style.fontFamily = 'JetBrains Mono, monospace';
      container.style.fontSize = '9.5px';
      container.style.lineHeight = '1.05';
      container.style.color = 'var(--accent)';
      container.style.margin = '8px 0';
      termOut.appendChild(container);

      let frameCount = 0;
      const interval = setInterval(() => {
        let b = [];
        let z = [];
        A += 0.08;
        B += 0.04;
        let cA = Math.cos(A), sA = Math.sin(A),
            cB = Math.cos(B), sB = Math.sin(B);
        for (let k = 0; k < 1760; k++) {
          b[k] = k % 80 == 79 ? "\n" : " ";
          z[k] = 0;
        }
        for (let j = 0; j < 6.28; j += 0.07) {
          let ct = Math.cos(j), st = Math.sin(j);
          for (let i = 0; i < 6.28; i += 0.02) {
            let sp = Math.sin(i), cp = Math.cos(i),
                h = ct + 2,
                D = 1 / (sp * h * sA + st * cA + 5),
                t = sp * h * cA - st * sA;
            let x = 0 | (36 + 26 * D * (cp * h * cB - t * sB)),
                y = 0 | (11 + 13 * D * (cp * h * sB + t * cB)),
                o = x + 80 * y,
                N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
            if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
              z[o] = D;
              b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
            }
          }
        }
        container.textContent = b.join("");
        termOut.scrollTop = termOut.scrollHeight;
        frameCount++;
        if (frameCount > 100) clearInterval(interval);
      }, 40);

      return '<span class="tc-mauve" style="font-weight:700">Rendering 3D rotating Donut.c in Kitty Terminal...</span>';
    }

    case 'music':
    case 'player':
    case 'lofi': {
      const sub = args[0] || 'toggle';
      if (typeof playTrack === 'function') {
        if (sub === 'play') {
          playTrack(curTrackIdx);
          return `<span class="tc-green">[playing] ${LOFI_PLAYLIST[curTrackIdx].title}</span>`;
        }
        if (sub === 'pause' || sub === 'stop') {
          pauseTrack();
          return `<span class="tc-yellow">[paused] Music playback paused.</span>`;
        }
        if (sub === 'next' || sub === 'skip') {
          nextTrack();
          return `<span class="tc-mauve">[next] ${LOFI_PLAYLIST[curTrackIdx].title}</span>`;
        }
        if (sub === 'list') {
          return `<span class="tc-sky" style="font-weight:700">Lo-Fi Rice Playlist (5 Tracks):</span>\n` +
            LOFI_PLAYLIST.map((t, i) => `  [${i + 1}] ${t.title} ${i === curTrackIdx ? '<span class="tc-green">(active)</span>' : ''}`).join('\n');
        }
        // Toggle
        if (!isAudioPlaying) {
          playTrack(curTrackIdx);
          return `<span class="tc-green">[playing] ${LOFI_PLAYLIST[curTrackIdx].title}</span>`;
        } else {
          pauseTrack();
          return `<span class="tc-yellow">[paused] Music playback paused.</span>`;
        }
      }
      return '<span class="tc-dim">Audio player not initialized.</span>';
    }

    case 'help':
      return `<span class="tc-sky" style="font-weight:700">Available Hyprland Terminal Commands:</span>
<span class="tc-bold">Portfolio:</span>  about  projects  statmux  research  leetcode  resume  btop  nvim
<span class="tc-bold">System:</span>     fastfetch  whoami  pwd  tree  theme [list|name]  wp [list|name]
<span class="tc-bold">Media:</span>      music [play|pause|next|list]  donut  cmatrix  fortune  cowsay  btw
<span class="tc-bold">Files:</span>      ls  cd  cat  clear`;

    case 'exit':
      closeWin('terminal');
      return null;

    default:
      return `<span class="tc-red">zsh: command not found: ${cmd}</span> (type <span class="tc-yellow">help</span> for commands)`;
  }
}

function updatePromptCwd() {
  const el = document.getElementById('t-cwd');
  if (el) el.textContent = termCwd;
}

function addTermOut(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  termOut.appendChild(d);
}

function openTerminal() {
  const winW = Math.min(740, window.innerWidth - 40);
  const winH = Math.min(540, window.innerHeight - 80);

  const w = makeWin({
    id: 'terminal',
    title: 'kitty ~ sayan@arch: ~ (zsh)',
    icon: 'terminal',
    w: winW,
    h: winH,
    x: 40,
    y: 30,
    content: `
      <div class="term-wrap">
        <!-- Kitty Tab Bar Header -->
        <div class="term-tabbar">
          <div class="term-tab">
            <span class="term-tab-dot"></span>
            <span>1: sayan@arch:~ (zsh)</span>
          </div>
          <div class="term-tab-info">
            <span class="term-badge">main</span>
            <span class="term-badge">zsh 5.9</span>
            <span class="term-badge" style="color:var(--accent);font-weight:700">kitty</span>
          </div>
        </div>

        <!-- Terminal Output Screen -->
        <div class="term-out" id="t-out"></div>

        <!-- Interactive Quick Action Toolbar (Lovable UX) -->
        <div class="term-quick-bar">
          <span class="term-qb-label">quick cmds:</span>
          <button class="term-qb-btn" data-cmd="fastfetch">fastfetch</button>
          <button class="term-qb-btn" data-cmd="about">about</button>
          <button class="term-qb-btn" data-cmd="projects">projects</button>
          <button class="term-qb-btn" data-cmd="research">research</button>
          <button class="term-qb-btn" data-cmd="donut">donut.c</button>
          <button class="term-qb-btn" data-cmd="music next">next track</button>
          <button class="term-qb-btn" data-cmd="clear">clear</button>
        </div>

        <!-- Starship Two-Line Prompt Row -->
        <div class="term-in-row">
          <div class="starship-line1">
            <span class="sp-corner">╭─</span>
            <span class="sp-user">sayan</span><span class="tc-dim">@</span><span class="sp-host">arch</span>
            <span class="tc-dim">in</span>
            <span class="sp-path" id="t-cwd">~</span>
            <span class="tc-dim">on</span>
            <span class="sp-git">main</span>
            <span class="tc-green" style="font-size:10px;font-weight:700">[gpa:9.07]</span>
          </div>
          <div class="starship-line2">
            <span class="sp-corner">╰─</span>
            <span class="sp-arrow">❯</span>
            <input class="t-input" id="t-in" autocomplete="off" spellcheck="false" autofocus placeholder="Type a command (e.g. fastfetch, about, projects)...">
          </div>
        </div>
      </div>
    `
  });

  termOut = w.querySelector('#t-out');
  termIn = w.querySelector('#t-in');

  function runTerminalCommand(cmdString, isInitial = false) {
    const v = cmdString.trim();
    if (!v) return;
    cmdHist.unshift(v);
    histIdx = -1;

    addTermOut(`
      <div style="margin-top:4px;">
        <div class="starship-line1">
          <span class="sp-corner">╭─</span>
          <span class="sp-user">sayan</span><span class="tc-dim">@</span><span class="sp-host">arch</span>
          <span class="tc-dim">in</span>
          <span class="sp-path">${termCwd}</span>
          <span class="tc-dim">on</span>
          <span class="sp-git">main</span>
        </div>
        <div class="starship-line2">
          <span class="sp-corner">╰─</span>
          <span class="sp-arrow">❯</span> <span style="font-weight:700;color:var(--text)">${v.replace(/</g, '&lt;')}</span>
        </div>
      </div>
    `);

    const r = execCmd(v);
    if (r !== null && r !== undefined && r !== '') {
      const outDiv = document.createElement('div');
      outDiv.style.margin = '2px 0 6px 14px';
      outDiv.innerHTML = r;
      termOut.appendChild(outDiv);
    }

    if (termIn) termIn.value = '';
    if (isInitial) {
      termOut.scrollTop = 0;
    } else {
      termOut.scrollTop = termOut.scrollHeight;
    }
  }

  termIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      runTerminalCommand(termIn.value);
    }

    if (e.key === 'ArrowUp') {
      histIdx = Math.min(histIdx + 1, cmdHist.length - 1);
      if (cmdHist[histIdx]) termIn.value = cmdHist[histIdx];
      e.preventDefault();
    }

    if (e.key === 'ArrowDown') {
      histIdx = Math.max(histIdx - 1, -1);
      termIn.value = histIdx >= 0 ? cmdHist[histIdx] : '';
      e.preventDefault();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const val = termIn.value.trim();
      const allCmds = ['music', 'fastfetch', 'about', 'projects', 'statmux', 'leetcode', 'resume', 'research', 'btop', 'nvim', 'clear', 'donut', 'cmatrix', 'help', 'theme', 'wp', 'wallpaper', 'fortune', 'cowsay'];
      const match = allCmds.find(c => c.startsWith(val));
      if (match) termIn.value = match;
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      termOut.innerHTML = '';
    }
  });

  // Quick Action Buttons Listener
  w.querySelectorAll('.term-qb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      if (cmd) runTerminalCommand(cmd);
    });
  });

  // Welcome auto-run fastfetch (stays pinned to top)
  setTimeout(() => {
    runTerminalCommand('fastfetch', true);
    termOut.scrollTop = 0;
  }, 250);

  setTimeout(() => {
    termIn.focus();
    termOut.scrollTop = 0;
  }, 350);
}
