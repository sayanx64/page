const wp = document.getElementById('wp'), wc = wp.getContext('2d');
let WW, WH, wpPaused = false;
function resizeWP() { WW = wp.width = innerWidth; WH = wp.height = innerHeight; }
resizeWP(); addEventListener('resize', resizeWP);
class Petal {
  constructor(init) { this.reset(init); }
  reset(init) {
    this.x = Math.random() * WW;
    this.y = init ? Math.random() * WH : -15 - Math.random() * 60;
    this.s = Math.random() * 7 + 3;
    this.vy = Math.random() * 0.6 + 0.2;
    this.vx = Math.random() * 0.3 - 0.15;
    this.rot = Math.random() * Math.PI * 2;
    this.rs = (Math.random() - 0.5) * 0.015;
    this.op = Math.random() * 0.45 + 0.2;
    this.wb = Math.random() * Math.PI * 2;
    this.ws = Math.random() * 0.015 + 0.008;
    this.ci = Math.floor(Math.random() * PETAL_COLS.length);
  }
  update() {
    this.y += this.vy;
    this.wb += this.ws;
    this.x += this.vx + Math.sin(this.wb) * 0.4;
    this.rot += this.rs;
    if (this.y > WH + 20 || this.x < -30 || this.x > WW + 30) this.reset(false);
  }
  draw(c) {
    c.save(); c.translate(this.x, this.y); c.rotate(this.rot); c.globalAlpha = this.op;
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(this.s * 0.35, -this.s * 0.7, this.s * 0.75, -this.s * 0.7, this.s * 0.5, 0);
    c.bezierCurveTo(this.s * 0.75, this.s * 0.7, this.s * 0.35, this.s * 0.7, 0, 0);
    c.fillStyle = PETAL_COLS[this.ci]; c.fill(); c.restore();
  }
}
const PETAL_COLS = ['#f0b0c0','#f5c5d0','#f8d0d8','#ffe4ec','#f0bab0'];
const petals = Array.from({length: 75}, () => new Petal(true));
const clouds = Array.from({length: 5}, () => ({
  x: Math.random() * WW, y: WH * (0.12 + Math.random() * 0.2),
  w: 80 + Math.random() * 100, spd: 0.08 + Math.random() * 0.06, op: 0.15 + Math.random() * 0.15
}));
function ridge(n, lo, hi, seed) {
  const p = [{x:0,y:hi}];
  for (let i = 1; i < n - 1; i++) p.push({x: i/(n-1), y: lo + Math.abs(Math.sin(i*seed+seed*.7))*(hi-lo)});
  p.push({x:1,y:hi}); return p;
}
const ridges = [
  {pts: ridge(14,.42,.56,1.8), col:'rgba(180,170,200,0.25)'},
  {pts: ridge(10,.50,.62,2.6), col:'rgba(165,155,185,0.3)'},
  {pts: ridge(8,.57,.68,3.4),  col:'rgba(145,135,165,0.35)'},
];
function drawCloud(c, cl) {
  c.save(); c.globalAlpha = cl.op; c.fillStyle = '#fff';
  c.beginPath();
  c.arc(cl.x, cl.y, cl.w*0.2, 0, Math.PI*2);
  c.arc(cl.x+cl.w*0.22, cl.y-cl.w*0.08, cl.w*0.26, 0, Math.PI*2);
  c.arc(cl.x+cl.w*0.5, cl.y-cl.w*0.04, cl.w*0.24, 0, Math.PI*2);
  c.arc(cl.x+cl.w*0.72, cl.y, cl.w*0.18, 0, Math.PI*2);
  c.fill(); c.restore();
}
function drawTree(c, w, h) {
  c.save(); c.globalAlpha = 0.12;
  const tx = w * 0.88, ty = h;
  c.strokeStyle = '#6a5060'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx-5, ty-80, tx-15, ty-150);
  c.stroke();
  const branches = [
    [tx-15,ty-150, tx-60,ty-200, tx-90,ty-210],
    [tx-15,ty-150, tx+20,ty-190, tx+40,ty-205],
    [tx-15,ty-130, tx-50,ty-160, tx-70,ty-165],
    [tx-10,ty-110, tx+25,ty-140, tx+45,ty-145],
  ];
  c.lineWidth = 2;
  branches.forEach(b => { c.beginPath(); c.moveTo(b[0],b[1]); c.quadraticCurveTo(b[2],b[3],b[4],b[5]); c.stroke(); });
  c.restore();
}
function drawWP() {
  if (wpPaused) { requestAnimationFrame(drawWP); return; }
  const sg = wc.createLinearGradient(0, 0, 0, WH);
  sg.addColorStop(0, '#c0d8ee'); sg.addColorStop(0.35, '#ddd0c4');
  sg.addColorStop(0.6, '#ecc8b8'); sg.addColorStop(0.85, '#e8d4c8'); sg.addColorStop(1, '#ddd0c0');
  wc.fillStyle = sg; wc.fillRect(0, 0, WW, WH);
  clouds.forEach(cl => { cl.x += cl.spd; if (cl.x > WW + cl.w) cl.x = -cl.w; drawCloud(wc, cl); });
  ridges.forEach(r => {
    wc.beginPath(); wc.moveTo(0, WH);
    r.pts.forEach(p => wc.lineTo(p.x * WW, p.y * WH));
    wc.lineTo(WW, WH); wc.fillStyle = r.col; wc.fill();
  });
  const gg = wc.createLinearGradient(0, WH*0.7, 0, WH);
  gg.addColorStop(0, 'rgba(210,198,185,0.2)'); gg.addColorStop(1, 'rgba(195,180,165,0.4)');
  wc.fillStyle = gg; wc.fillRect(0, WH*0.7, WW, WH*0.3);
  drawTree(wc, WW, WH);
  petals.forEach(p => { p.update(); p.draw(wc); });
  requestAnimationFrame(drawWP);
}
drawWP();
document.addEventListener('visibilitychange', () => { wpPaused = document.hidden; });
