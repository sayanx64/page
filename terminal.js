let termOut = null, termIn = null, termCwd = '~';
const cmdHist = [];
const FS = {
  '~': {type:'dir', children:['about.txt','projects/','research/','.config/','README.md','.zshrc']},
  '~/projects': {type:'dir', children:['phub-cli/','medsync/','mail-server/','ukulele-tuner/']},
  '~/projects/phub-cli': {type:'dir', children:['README.md','phub.sh','requirements.txt']},
  '~/projects/medsync': {type:'dir', children:['README.md','docker-compose.yml','src/']},
  '~/projects/mail-server': {type:'dir', children:['README.md','postfix.conf','dovecot.conf']},
  '~/projects/ukulele-tuner': {type:'dir', children:['index.html','tuner.js','style.css']},
  '~/research': {type:'dir', children:['oral-cancer-gan.pdf','results/','README.md','train.py']},
  '~/research/results': {type:'dir', children:['accuracy.csv','confusion_matrix.png','roc_curve.png']},
  '~/.config': {type:'dir', children:['hypr/','kitty/','waybar/']},
  '~/.config/hypr': {type:'dir', children:['hyprland.conf']},
  '~/.config/kitty': {type:'dir', children:['kitty.conf']},
  '~/.config/waybar': {type:'dir', children:['config','style.css']},
};
const FILES = {
  '~/about.txt': `name     : Sayan Pal
alias    : sayanx64
uni      : KIIT, Bhubaneswar
cgpa     : 9.24
os       : Arch Linux x86_64
wm       : Hyprland
shell    : zsh
pronouns : over/flow
gdg      : KIIT Cloud Domain
github   : github.com/sayanx64`,
  '~/README.md': `# sayan/pal
CS undergrad @ KIIT · AI/ML enthusiast
IEEE published author (Nov 2025)
git commit -m "fix tomorrow"
online when the world sleeps`,
  '~/.zshrc': `# ~/.zshrc
export EDITOR=nvim
export PATH="$HOME/.local/bin:$PATH"
alias ll='ls -la'
alias gs='git status'
alias gc='git commit'
alias vim='nvim'
alias btw='echo "i use arch"'
alias please='sudo'
eval "$(starship init zsh)"`,
  '~/research/README.md': `# oral cancer detection
Semi-Supervised GAN + EfficientNet-B3
Published @ IEEE DMIHER 2025
DOI: 10.1109/IDICAIHEI65991.2025.11379848`,
  '~/research/train.py': `import torch
import torch.nn as nn
from efficientnet import EfficientNetB3
from gan import SSGAN
def train(epochs=100, lr=1e-4):
    model = EfficientNetB3(num_classes=2)
    gan = SSGAN(latent_dim=128)
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    for epoch in range(epochs):
        # Generate synthetic samples
        fake_imgs = gan.generate(batch_size=32)
        # Train classifier
        loss = model.train_step(real_imgs, fake_imgs, labels)
        print(f"Epoch {epoch}: loss={loss:.4f}")
if __name__ == "__main__":
    train()`,
  '~/projects/phub-cli/README.md': `# phub-cli  ★ 105
Terminal video browser
Lang: Bash + Python
Deps: fzf, mpv, yt-dlp
License: GPL-3.0`,
  '~/.config/hypr/hyprland.conf': `# Hyprland config
monitor=,preferred,auto,1
exec-once = waybar & kitty
general {
    gaps_in = 5
    gaps_out = 10
    border_size = 2
    col.active_border = rgba(d4879aee)
    col.inactive_border = rgba(b5a8a066)
}
decoration {
    rounding = 14
    blur {
        enabled = true
        size = 8
        passes = 2
    }
    drop_shadow = true
    shadow_range = 20
}
animations {
    bezier = spring, 0.34, 1.56, 0.64, 1
    animation = windows, 1, 5, spring, slide
    animation = fade, 1, 4, default
}
bind = SUPER, RETURN, exec, kitty
bind = SUPER, Q, killactive
bind = SUPER, SPACE, exec, rofi -show drun`,
};
const NEOFETCH = `<span class="tc-accent">      /\\</span>
<span class="tc-accent">     /  \\</span>        <span class="tc-bold">sayan</span><span class="tc-dim">@</span><span class="tc-bold">arch</span>
<span class="tc-accent">    / /\\ \\</span>       <span class="tc-dim">──────────────</span>
<span class="tc-accent">   / /  \\ \\</span>      <span class="tc-teal">OS</span>       Arch Linux x86_64
<span class="tc-accent">  /_/    \\_\\</span>     <span class="tc-teal">WM</span>       Hyprland 0.40.0
                 <span class="tc-teal">Terminal</span> kitty 0.35
                 <span class="tc-teal">Shell</span>    zsh 5.9
                 <span class="tc-teal">Font</span>     JetBrains Mono
                 <span class="tc-teal">Packages</span> 834 (pacman)
                 <span class="tc-teal">CGPA</span>     <span class="tc-yellow">9.24</span> (kiit)
                 <span class="tc-teal">Papers</span>   <span class="tc-peach">1 (IEEE)</span>
                 <span class="tc-teal">GDG</span>      KIIT · Cloud
                 <span class="tc-teal">Uptime</span>   <span id="nf-upt">—</span>
<span style="color:#e87171">███</span><span style="color:#e8b84d">███</span><span style="color:#6bc46b">███</span><span style="color:#81c8be">███</span><span style="color:#8caaee">███</span><span style="color:#ca9ee6">███</span><span style="color:#f4b8e4">███</span><span style="color:#c6d0f5">███</span>`;
const FORTUNES = [
  '"It works on my machine." — every developer',
  '"git push --force and pray" — ancient proverb',
  'There are 10 types of people: those who understand binary and those who don\'t.',
  '"Mass equals class divided by volume." — Einstein, probably not',
  '"sudo rm -rf / is just spring cleaning" — no sysadmin ever',
  '"I don\'t always test my code, but when I do, I do it in production." — The Most Interesting Developer',
  '"99 bugs in the code, take one down, patch it around, 127 bugs in the code."',
  '"Programming is 10% writing code and 90% understanding why it doesn\'t work."',
  '"A SQL query walks into a bar, walks up to two tables, and asks: Can I JOIN you?"',
  '"My code works, I have no idea why. My code doesn\'t work, I have no idea why."',
];
function resolvePath(p) {
  if (!p) return termCwd;
  if (p === '~') return '~';
  if (p.startsWith('~/')) return p;
  if (p === '..') {
    if (termCwd === '~') return '~';
    const parts = termCwd.split('/'); parts.pop();
    return parts.join('/') || '~';
  }
  if (p === '.') return termCwd;
  return (termCwd === '~' ? '~/' : termCwd + '/') + p.replace(/\/$/, '');
}
function treeView(path, prefix) {
  prefix = prefix || '';
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
      const sub = resolvePath(k.slice(0,-1));
      const full = path === '~' ? '~/' + k.slice(0,-1) : path + '/' + k.slice(0,-1);
      if (FS[full]) out += treeView(full, prefix + (last ? '    ' : '│   '));
    }
  });
  return out;
}
function execCmd(raw) {
  const p = raw.trim().split(/\s+/), cmd = p[0], a = p.slice(1);
  if (!cmd) return '';
  switch(cmd) {
    case 'neofetch': case 'fastfetch': {
      const u = Math.floor(performance.now()/1000);
      const h = Math.floor(u/3600), m = Math.floor((u%3600)/60);
      setTimeout(() => { const e = document.getElementById('nf-upt'); if(e) e.textContent = h+'h '+m+'m'; }, 50);
      return NEOFETCH;
    }
    case 'clear': termOut.innerHTML = ''; return null;
    case 'ls': {
      const dir = resolvePath(a[0]);
      const node = FS[dir];
      if (!node) return `<span class="tc-red">ls: cannot access '${a[0]||dir}': No such file or directory</span>`;
      return node.children.map(f => f.endsWith('/') ? `<span class="tc-blue">${f}</span>` : `<span class="tc-teal">${f}</span>`).join('  ');
    }
    case 'cat': {
      if (!a[0]) return `<span class="tc-red">cat: missing operand</span>`;
      const fp = resolvePath(a[0]);
      const ct = FILES[fp];
      if (!ct) return `<span class="tc-red">cat: ${a[0]}: No such file or directory</span>`;
      return ct.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    case 'cd': {
      const to = a[0] || '~';
      const r = resolvePath(to);
      if (FS[r] || r === '~') { termCwd = r; updatePromptCwd(); return ''; }
      return `<span class="tc-red">cd: ${to}: No such file or directory</span>`;
    }
    case 'pwd': return termCwd.replace('~', '/home/sayan');
    case 'whoami': return '<span class="tc-green">sayan</span>';
    case 'hostname': return '<span class="tc-blue">arch</span>';
    case 'date': return new Date().toString();
    case 'uname': return a.includes('-a') ? 'Linux arch 6.12.7-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux';
    case 'uptime': {
      const u=Math.floor(performance.now()/1000),h=Math.floor(u/3600),m=Math.floor((u%3600)/60),s=u%60;
      return `up ${h}h ${m}m ${s}s, 1 user, load: 0.42, 0.38, 0.31`;
    }
    case 'echo': return a.join(' ');
    case 'exit': closeWin('terminal'); return null;
    case 'tree': {
      const dir = resolvePath(a[0]);
      const path = FS[dir] ? dir : termCwd;
      return `<span class="tc-bold">${path.split('/').pop()||'~'}</span>\n` + treeView(path);
    }
    case 'head': {
      if (!a[0]) return `<span class="tc-red">head: missing operand</span>`;
      const ct = FILES[resolvePath(a[0])];
      if (!ct) return `<span class="tc-red">head: ${a[0]}: No such file</span>`;
      return ct.split('\n').slice(0,5).join('\n').replace(/</g,'&lt;');
    }
    case 'tail': {
      if (!a[0]) return `<span class="tc-red">tail: missing operand</span>`;
      const ct = FILES[resolvePath(a[0])];
      if (!ct) return `<span class="tc-red">tail: ${a[0]}: No such file</span>`;
      return ct.split('\n').slice(-5).join('\n').replace(/</g,'&lt;');
    }
    case 'wc': {
      if (!a[0]) return `<span class="tc-red">wc: missing operand</span>`;
      const ct = FILES[resolvePath(a[0])];
      if (!ct) return `<span class="tc-red">wc: ${a[0]}: No such file</span>`;
      const lines = ct.split('\n').length, words = ct.split(/\s+/).length, chars = ct.length;
      return `  ${lines}  ${words} ${chars} ${a[0]}`;
    }
    case 'grep': {
      if (a.length < 2) return `<span class="tc-red">grep: usage: grep PATTERN FILE</span>`;
      const ct = FILES[resolvePath(a[1])];
      if (!ct) return `<span class="tc-red">grep: ${a[1]}: No such file</span>`;
      const pat = a[0].toLowerCase();
      const matches = ct.split('\n').filter(l => l.toLowerCase().includes(pat));
      if (!matches.length) return '';
      return matches.map(l => l.replace(/</g,'&lt;').replace(new RegExp(`(${a[0]})`,'gi'), `<span class="tc-red">$1</span>`)).join('\n');
    }
    case 'find': {
      const dir = resolvePath(a[0]) || termCwd;
      let out = [dir];
      function walk(p) {
        const n = FS[p]; if (!n) return;
        n.children.forEach(c => {
          const full = p + '/' + c.replace(/\/$/,'');
          out.push(full.replace('~/','./')); if (c.endsWith('/') && FS[full]) walk(full);
        });
      }
      walk(dir); return out.join('\n');
    }
    case 'cal': {
      const d = new Date(), y = d.getFullYear(), mo = d.getMonth();
      const names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const first = new Date(y,mo,1).getDay(), last = new Date(y,mo+1,0).getDate(), today = d.getDate();
      let h = `     ${names[mo]} ${y}\nSu Mo Tu We Th Fr Sa\n`;
      let line = '   '.repeat(first);
      for (let i=1;i<=last;i++) {
        const ds = i<10?' '+i:''+i;
        line += (i===today?`<span class="tc-accent">${ds}</span>`:ds);
        if ((first+i)%7===0) { h+=line+'\n'; line=''; } else line+=' ';
      }
      if (line.trim()) h+=line;
      return h;
    }
    case 'fortune': return `<span class="tc-yellow">${FORTUNES[Math.floor(Math.random()*FORTUNES.length)]}</span>`;
    case 'cowsay': {
      const msg = a.join(' ') || 'moo';
      const border = '_'.repeat(msg.length+2);
      return ` ${border}\n< ${msg} >\n ${'-'.repeat(msg.length+2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
    }
    case 'df': return `Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/nvme0n1p2 234567890 45678901 188888989  20% /
tmpfs            8192000   123456   8068544   2% /tmp
/dev/nvme0n1p1    524288    38400    485888   8% /boot`;
    case 'free': return `              total        used        free    buff/cache   available
Mem:       16384000     4567890     8901234     2914876    11234567
Swap:       8192000           0     8192000`;
    case 'ps': return `  PID TTY      STAT   TIME COMMAND
    1 ?        Ss     0:02 /sbin/init
  402 ?        Ss     0:00 /usr/lib/systemd/systemd --user
  987 ?        Sl     0:12 Hyprland
 1234 pts/0    S      0:00 kitty
 1456 pts/0    Ss     0:00 zsh
 ${2000+Math.floor(Math.random()*1000)} pts/0    R+     0:00 ps`;
    case 'ip': return `1: lo: <LOOPBACK,UP> mtu 65536
    inet 127.0.0.1/8 scope host lo
2: enp0s3: <BROADCAST,UP> mtu 1500
    inet 192.168.1.42/24 brd 192.168.1.255 scope global enp0s3
3: wlan0: <BROADCAST,UP> mtu 1500
    inet 10.0.0.15/24 brd 10.0.0.255 scope global wlan0`;
    case 'which': return a[0] ? `/usr/bin/${a[0]}` : `<span class="tc-red">which: missing argument</span>`;
    case 'type': return a[0] ? `${a[0]} is /usr/bin/${a[0]}` : '';
    case 'env': return `USER=sayan\nHOME=/home/sayan\nSHELL=/usr/bin/zsh\nEDITOR=nvim\nLANG=en_US.UTF-8\nTERM=xterm-kitty\nXDG_SESSION_TYPE=wayland\nWAYLAND_DISPLAY=wayland-1\nPATH=/usr/local/bin:/usr/bin:/home/sayan/.local/bin`;
    case 'history': return cmdHist.map((c,i) => `  ${i+1}  ${c}`).join('\n');
    case 'alias': return `ll='ls -la'\ngs='git status'\ngc='git commit'\nvim='nvim'\nbtw='echo "i use arch"'\nplease='sudo'`;
    case 'man': {
      if (!a[0]) return `<span class="tc-red">What manual page do you want?</span>`;
      const pages = {ls:'list directory contents',cat:'concatenate files',cd:'change directory',grep:'search patterns in files',find:'search for files',tree:'list directory tree',cal:'display calendar',cowsay:'speaking cow',fortune:'print a random quote',neofetch:'system info',ps:'report process status',df:'disk space usage',free:'memory usage'};
      return pages[a[0]] ? `<span class="tc-bold">${a[0].toUpperCase()}(1)</span>\n\nNAME\n    ${a[0]} - ${pages[a[0]]}\n\nSYNOPSIS\n    ${a[0]} [options] [arguments]` : `<span class="tc-red">No manual entry for ${a[0]}</span>`;
    }
    case 'touch': case 'mkdir': return `<span class="tc-dim">(simulated) created ${a[0]||'?'}</span>`;
    case 'rm': return a[0] ? `<span class="tc-dim">(simulated) removed ${a[0]}</span>` : `<span class="tc-red">rm: missing operand</span>`;
    case 'pacman': return a.includes('-Syu') ? `<span class="tc-red">error: you cannot perform this operation unless you are root.</span>` : `<span class="tc-green">core is up to date\nextra is up to date\ncommunity is up to date</span>`;
    case 'sudo': return `<span class="tc-red">[sudo] password for sayan:\nsorry, try again.\nsudo: 3 incorrect password attempts</span>`;
    case 'hyprctl': return `<span class="tc-blue">Hyprland 0.40.0\nRunning on wayland\nConfig: ~/.config/hypr/hyprland.conf</span>`;
    case 'btw': return `<span class="tc-accent">i use arch btw</span>`;
    case 'vim': case 'nano': case 'nvim': return `<span class="tc-yellow">hint: try opening the Editor app instead :)</span>`;
    case 'help': return `<span class="tc-teal">Available commands:</span>
<span class="tc-bold">System:</span>   neofetch  uname  uptime  hostname  df  free  ps  ip  env
<span class="tc-bold">Files:</span>    ls  cd  cat  head  tail  tree  find  wc  grep  touch  mkdir  rm
<span class="tc-bold">Utils:</span>    echo  date  cal  history  alias  man  which  type  clear  exit
<span class="tc-bold">Fun:</span>      fortune  cowsay  btw  pacman  sudo  hyprctl  vim
<span class="tc-bold">Other:</span>    whoami  pwd  help`;
    default: return `<span class="tc-red">zsh: command not found: ${cmd}</span>`;
  }
}
function updatePromptCwd() {
  const el = document.getElementById('t-cwd');
  if (el) el.textContent = termCwd;
}
function addTermOut(html) { const d = document.createElement('div'); d.innerHTML = html; termOut.appendChild(d); }
function addTermLine(html) { const d = document.createElement('div'); d.style.marginBottom = '4px'; d.innerHTML = html; termOut.appendChild(d); }
function openTerminal() {
  const w = makeWin({id:'terminal', title:'kitty', icon:'terminal', w:580, h:420, x:50, y:40, dark:true,
    content:`<div class="term-wrap"><div class="term-out" id="t-out"></div><div class="term-in-row"><span class="t-ps"><span class="tc-green">sayan</span><span class="tc-dim">@</span><span class="tc-blue">arch</span> <span class="tc-teal" id="t-cwd">~</span> <span class="tc-accent">❯</span> </span><input class="t-input" id="t-in" autocomplete="off" spellcheck="false"></div></div>`});
  termOut = w.querySelector('#t-out'); termIn = w.querySelector('#t-in');
  let hi = -1;
  termIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const v = termIn.value.trim(); cmdHist.unshift(v); hi = -1;
      addTermOut(`<span class="tc-green">sayan</span><span class="tc-dim">@</span><span class="tc-blue">arch</span> <span class="tc-teal">${termCwd}</span> <span class="tc-accent">❯</span> ${v.replace(/</g,'&lt;')}`);
      const r = execCmd(v);
      if (r !== null && r !== undefined && r !== '') addTermLine(r);
      termIn.value = ''; termOut.scrollTop = termOut.scrollHeight;
    }
    if (e.key === 'ArrowUp') { hi = Math.min(hi+1, cmdHist.length-1); if (cmdHist[hi]) termIn.value = cmdHist[hi]; e.preventDefault(); }
    if (e.key === 'ArrowDown') { hi = Math.max(hi-1, -1); termIn.value = hi >= 0 ? cmdHist[hi] : ''; e.preventDefault(); }
    if (e.key === 'Tab') { e.preventDefault();  }
    if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); termOut.innerHTML = ''; }
  });
  addTermOut(`<span class="tc-green">sayan</span><span class="tc-dim">@</span><span class="tc-blue">arch</span> <span class="tc-teal">~</span> <span class="tc-accent">❯</span> <span id="tcmd"></span>`);
  const tc = w.querySelector('#tcmd'), cmdStr = 'neofetch'; let ci = 0;
  const iv = setInterval(() => {
    tc.textContent = cmdStr.slice(0, ++ci);
    if (ci >= cmdStr.length) { clearInterval(iv); setTimeout(() => { const r = execCmd('neofetch'); if(r) addTermLine(r); termOut.scrollTop = termOut.scrollHeight; }, 120); }
  }, 55);
  setTimeout(() => termIn.focus(), 500);
}
