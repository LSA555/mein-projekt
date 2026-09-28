// CYSPA LinkedIn Asset-Renderer — CI v3.0 (Navy/Gold, Raleway)
// Designsprache: Fakten-Karte gemäss Skill cyspa-designer §3.4 + Referenz
// linkedin/assets/img/ci-v3-referenz.webp. HTML/CSS → headless Chromium →
// PNG (Feed) + PDF (Dokument-Posts).
// Aufruf: node build.mjs        (rendert alles nach export/)
//         node build.mjs sheet  (zusätzlich Kontaktbogen contact-sheet.png)

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VISUALS } from './content.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium';
const BUILD = join(ROOT, '.build');
const OUT = join(ROOT, 'export');

const RALEWAY = readFileSync(join(ROOT, 'fonts/raleway-var.ttf')).toString('base64');

// ------------------------------------------------------------- CI-v3.0-Tokens
// Grössen in rem; html font-size = Seitenbreite/100 → 1rem entspricht dem
// em-Raster des CI-Skills (Fakten-Karte 1200 → 12px, Carousel 1080 → 10.8px).
const CSS = `
@font-face{font-family:Raleway;font-weight:100 900;
  src:url(data:font/ttf;base64,${RALEWAY}) format('truetype-variations')}
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --gold:#ffc000; --navy:#103157; --deep:#071828;
  --ink:#ffffff; --ink2:#c2d0e0; --soft:#b9cadd; --label:#93a9c0;
  --meta:rgba(255,255,255,.5); --line:rgba(255,255,255,.14);
  --tile:rgba(255,255,255,.04); --tileborder:rgba(255,255,255,.16);
}
.slide{position:relative;width:100rem;color:var(--ink);
  display:flex;flex-direction:column;padding:6rem 6rem 14rem 8.2rem;overflow:hidden;
  font-family:Raleway,sans-serif;-webkit-font-smoothing:antialiased;
  background:
    radial-gradient(60rem 46rem at 74% 42%, rgba(52,109,178,.30), transparent 65%),
    repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 7rem),
    repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 7rem),
    linear-gradient(155deg,#071828 0%,#103157 55%,#1a4576 100%)}
.slide.sq{height:100vh}
.slide.car{height:100vh}
.slide::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1rem;
  background:var(--gold)}
/* Light-Variante (P3): weisse Fläche, Navy-Tinte, Gold-Akzente */
.slide.light{background:#ffffff;color:#1a1a1a;
  --ink:#1a1a1a;--ink2:#5a5a5a;--soft:#5a5a5a;--label:#425b76;
  --meta:#8a8a8a;--line:#e6e6e6;--tile:#f8f8f8;--tileborder:#e6e6e6}
/* Kopfzeile: Gold-Tick + Section-Label, Pager rechts */
.hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}
.lab{display:flex;align-items:center;gap:1.1rem;
  font-weight:800;font-size:1.5rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--label);white-space:nowrap}
.lab::before{content:'';width:2.4rem;height:.36rem;background:var(--gold);
  border-radius:.18rem;flex:none}
.pager{font-size:1.9rem;font-weight:600;color:var(--meta)}
main{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
h1{font-weight:800;font-size:5.2rem;line-height:1.08;letter-spacing:-.02em}
h2{font-weight:800;font-size:4rem;line-height:1.12;letter-spacing:-.015em}
.sub{font-size:2.5rem;font-weight:500;line-height:1.45;color:var(--soft);
  margin-top:1.6rem;max-width:78rem}
.body{font-size:2.7rem;font-weight:400;line-height:1.5;color:var(--ink2);max-width:80rem}
.dash{width:3.2rem;height:.45rem;background:var(--gold);border-radius:.22rem}
/* Fusszeile: Wortmarke CYSPA.ch links, Quelle/Hinweis rechts */
.foot{position:absolute;left:8.2rem;right:6rem;bottom:6rem;
  display:flex;justify-content:space-between;align-items:flex-end;gap:4rem}
.wm{font-size:2.7rem;font-weight:800;letter-spacing:.04em;white-space:nowrap}
.wm i{font-style:normal;color:var(--gold)}
.slide.light .wm{color:var(--navy)}
.src{font-size:1.9rem;font-weight:500;color:var(--meta);text-align:right;
  line-height:1.35;max-width:52rem}
/* Kacheln */
.tile{background:var(--tile);border:.09rem solid var(--tileborder);
  border-radius:.9rem;padding:2.1rem 2.4rem}
.stack{display:flex;flex-direction:column;gap:1.6rem;margin-top:2.8rem}
.thead{font-size:2.5rem;font-weight:800;margin-bottom:.8rem;
  display:flex;align-items:baseline;gap:1.1rem}
.tbody{font-size:2.2rem;font-weight:400;line-height:1.45;color:var(--soft)}
.ok{color:var(--gold);font-weight:800}
.bad{color:var(--label);font-weight:800}
/* Nummern-Slides */
.num{font-size:4.8rem;font-weight:800;color:var(--gold);line-height:1;
  margin-bottom:1.6rem}
.pill{display:inline-block;font-size:1.95rem;font-weight:600;color:#d3dde8;
  border:.09rem solid rgba(255,255,255,.28);border-radius:99rem;
  padding:.55em 1.3em;margin-top:2.6rem}
/* Merksatz */
.merk{border-left:.45rem solid var(--gold);padding-left:1.7rem;
  font-size:2.7rem;font-weight:700;line-height:1.35;max-width:80rem}
.divider{height:.09rem;background:var(--line);margin:2.8rem 0}
/* Listen mit Gold-Häkchen bzw. Gold-Strich */
.li{display:flex;gap:1.4rem;align-items:baseline;font-size:2.6rem;font-weight:500;
  line-height:1.4;color:var(--ink2)}
.li+.li{margin-top:1.7rem}
.li .tick{color:var(--gold);font-weight:800;flex:none}
/* Stat-/Formel-Kacheln in einer Reihe */
.frow{display:flex;gap:1.5rem;margin-top:3rem}
.fbox{flex:1;text-align:center;display:flex;flex-direction:column;gap:1rem;
  justify-content:flex-start;padding:2.2rem 1.2rem;min-height:13rem}
.fbox b{font-size:5rem;font-weight:800;line-height:1}
.fbox span{font-size:1.95rem;font-weight:500;line-height:1.3;color:var(--soft);
  hyphens:auto}
/* Treppe */
.stair{display:flex;gap:1.4rem;align-items:flex-end;margin-top:3.2rem}
.step{flex:1;border-radius:.9rem .9rem 0 0}
.step b{display:block;font-size:3rem;font-weight:800;color:var(--gold);
  margin-bottom:.9rem}
.step span{font-size:1.95rem;font-weight:600;line-height:1.3;hyphens:auto}
/* Wege-Diagramm */
.ways{display:flex;align-items:stretch;gap:2rem;margin-top:3.2rem}
.node{width:15rem;display:flex;flex-direction:column;gap:.8rem;align-items:center;
  justify-content:center;font-size:3.4rem;font-weight:800}
.wlist{flex:1;display:flex;flex-direction:column;justify-content:space-between;
  padding:.6rem 0}
.way span{font-size:2rem;font-weight:600;color:var(--ink2);display:block;
  margin-bottom:.9rem}
.way i{display:block;height:.28rem;background:var(--gold);position:relative;
  border-radius:.14rem}
.way i::after{content:'';position:absolute;right:0;top:-.62rem;
  border:.75rem solid transparent;border-left-color:var(--gold);border-right:0}
/* Sequenz */
.seq{display:flex;align-items:center;gap:1.6rem;margin-top:3.4rem}
.stage{flex:1;display:flex;flex-direction:column;align-items:center;gap:1.5rem;
  text-align:center;padding:2.6rem 1.4rem}
.stage svg{width:5.2rem;height:5.2rem;stroke:#fff;fill:none;stroke-width:1.6;
  stroke-linecap:round;stroke-linejoin:round}
.stage span{font-size:1.95rem;font-weight:600;line-height:1.3;color:var(--ink2)}
.sarr{flex:none;width:3.4rem;height:.28rem;background:var(--gold);position:relative;
  border-radius:.14rem}
.sarr::after{content:'';position:absolute;right:0;top:-.62rem;
  border:.75rem solid transparent;border-left-color:var(--gold);border-right:0}
/* Zitate */
.quote h1{font-size:4.4rem}
.qmeta{font-size:2.1rem;font-weight:500;color:var(--meta);margin-top:2.2rem}
.answer{font-size:2.6rem;font-weight:500;line-height:1.5;color:var(--ink2);
  margin-top:2.4rem;max-width:66rem}
.note{font-size:2rem;font-weight:500;line-height:1.42;color:var(--soft);
  margin-top:2.8rem;max-width:82rem}
`;

const ICONS = {
  lock: `<svg viewBox="0 0 24 24"><rect x="3.5" y="11" width="17" height="9.5" rx="1.6"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg viewBox="0 0 24 24"><rect x="3.5" y="11" width="17" height="9.5" rx="1.6"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  archive: `<svg viewBox="0 0 24 24"><rect x="3" y="3.5" width="18" height="4.5" rx="1"/><path d="M5 8v11.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12.5h4"/></svg>`,
};

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ------------------------------------------------------------------ Templates
const wordmark = `<span class="wm">CYSPA<i>.ch</i></span>`;

function footer(right) {
  return `<div class="foot">${wordmark}<span class="src">${esc(right ?? '')}</span></div>`;
}

function cards(list) {
  return `<div class="stack">${list.map((c) => `<div class="tile">
    <div class="thead">${c.tone ? `<span class="${c.tone}">${c.tone === 'ok' ? '✓' : '✗'}</span>` : ''}<span>${esc(c.head)}</span></div>
    <div class="tbody">${esc(c.body)}</div></div>`).join('')}</div>`;
}

function slideBody(s) {
  switch (s.t) {
    case 'cover':
      return `<main><h1>${esc(s.title)}</h1><p class="sub">${esc(s.sub)}</p></main>`;
    case 'split':
      return `<main><h2>${esc(s.title)}</h2>${cards(s.cards)}</main>`;
    case 'point':
      return `<main><div class="num">${esc(s.num)}</div><h2>${esc(s.title)}</h2>
        <p class="body" style="margin-top:1.6rem">${esc(s.body)}</p>
        ${s.mono ? `<div><span class="pill">${esc(s.mono)}</span></div>` : ''}</main>`;
    case 'cta': {
      const head = s.num
        ? `<div class="num">${esc(s.num)}</div><h2>${esc(s.title)}</h2><p class="body" style="margin-top:1.6rem">${esc(s.body)}</p>`
        : `<h2>${esc(s.title)}</h2>`;
      const list = s.list ? `<div style="margin-top:2.4rem">${s.list.map((i) => `<div class="li"><span class="tick">✓</span><span>${esc(i)}</span></div>`).join('')}</div>` : '';
      const note = s.note ? `<p class="qmeta">${esc(s.note)}</p>` : '';
      return `<main>${head}${list}<div class="divider"></div><div class="merk">${esc(s.merk)}</div>${note}</main>`;
    }
    case 'quote':
      if (s.meta) // Light-Variante (P3)
        return `<main class="quote"><h1 style="color:#103157">${esc(s.quote)}</h1>
          <div class="dash" style="margin:2.6rem 0 0"></div>
          <p class="qmeta">${esc(s.meta)}</p></main>`;
      return `<main class="quote"><h1>${esc(s.quote)}</h1>
        <div class="dash" style="margin:2.6rem 0 0"></div>
        <p class="answer">${esc(s.answer)}</p></main>`;
    case 'formula':
      return `<main><h1 style="font-size:4.4rem">${esc(s.title)}</h1>
        <p class="sub">${esc(s.sub)}</p>
        <div class="frow">${s.boxes.map((b) => `<div class="tile fbox"><b>${esc(b.n)}</b><span lang="de">${esc(b.label)}</span></div>`).join('')}</div></main>`;
    case 'steps':
      return `<main><h1 style="font-size:4.4rem">${esc(s.title)}</h1>
        <p class="sub">${esc(s.sub)}</p>
        <div class="stair">${s.steps.map((t, i) => `<div class="tile step" style="padding-bottom:${2.1 + i * 2.6}rem"><b>${i + 1}</b><span lang="de">${esc(t)}</span></div>`).join('')}</div></main>`;
    case 'ways':
      return `<main><h1 style="font-size:4.2rem">${esc(s.title)}</h1>
        <div class="ways">
          <div class="tile node">EU</div>
          <div class="wlist">${s.arrows.map((a) => `<div class="way"><span lang="de">${esc(a)}</span><i></i></div>`).join('')}</div>
          <div class="tile node"><svg viewBox="0 0 24 24" style="width:3.4rem;height:3.4rem;fill:#fff"><path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5z"/></svg>CH</div>
        </div>
        ${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}</main>`;
    case 'lines':
      return `<main><h1 style="font-size:4.6rem">${esc(s.title)}</h1>
        <p class="sub" style="margin-bottom:2.8rem">${esc(s.sub)}</p>
        ${s.items.map((i) => `<div class="li"><span class="tick">–</span><span>${esc(i)}</span></div>`).join('')}
        <div class="divider"></div><div class="merk">${esc(s.foot)}</div></main>`;
    case 'seq':
      return `<main><h1 style="font-size:4.6rem">${esc(s.title)}</h1>
        <div class="seq">${s.stages.map((st, i) => `${i ? '<span class="sarr"></span>' : ''}<div class="tile stage">${ICONS[st.icon]}<span>${esc(st.label)}</span></div>`).join('')}</div>
        <div class="divider" style="margin-top:3.4rem"></div>
        <div class="merk">${esc(s.question)}</div></main>`;
    default:
      throw new Error('Unbekannter Slide-Typ: ' + s.t);
  }
}

function slideHTML(v, s, i, n) {
  const pager = n > 1 ? `<span class="pager">${i + 1}/${n}</span>` : '';
  const right = s.src ?? (n > 1 && i === 0 ? '→ weiterblättern' : '');
  const cls = (v.format === 'single' ? 'sq' : 'car') + (v.theme === 'light' ? ' light' : '');
  return `<div class="slide ${cls}">
    <div class="hd"><span class="lab">${esc(v.badge)}</span>${pager}</div>
    ${slideBody(s)}
    ${footer(right)}</div>`;
}

const page = (body, fs) => `<!doctype html><html lang="de"><head><meta charset="utf-8">
<style>${CSS} html{font-size:${fs}px} body{margin:0}</style></head><body>${body}</body></html>`;

// -------------------------------------------------------------------- Render
function chrome(args) {
  execFileSync(CHROME, ['--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--virtual-time-budget=3000', ...args], { stdio: 'pipe' });
}

rmSync(BUILD, { recursive: true, force: true });
mkdirSync(BUILD, { recursive: true });

const made = [];
for (const v of VISUALS) {
  const single = v.format === 'single';
  const [W, H] = single ? [1200, 1200] : [1080, 1350]; // Fakten-Karte / Carousel
  const fs = W / 100;
  const hrem = (H / W) * 100;
  const dir = join(OUT, v.slug);
  mkdirSync(dir, { recursive: true });
  const n = v.slides.length;

  v.slides.forEach((s, i) => {
    const html = page(slideHTML(v, s, i, n), fs, hrem);
    const f = join(BUILD, `${v.slug}-${i + 1}.html`);
    writeFileSync(f, html);
    const png = join(dir, single ? `${v.slug}.png` : `slide-${String(i + 1).padStart(2, '0')}.png`);
    chrome([`--window-size=${W},${H}`, `--screenshot=${png}`, 'file://' + f]);
    made.push(png);
  });

  if (!single) { // Dokument-Post-PDF (Vektor, Fonts eingebettet)
    const body = v.slides.map((s, i) => slideHTML(v, s, i, n)).join('');
    const f = join(BUILD, `${v.slug}-doc.html`);
    writeFileSync(f, page(body, fs, hrem).replace('<style>',
      `<style>@page{size:${W}px ${H}px;margin:0} .slide.sq,.slide.car{height:${H}px} .slide{page-break-after:always}`));
    chrome([`--print-to-pdf=${join(dir, v.slug + '.pdf')}`, '--no-pdf-header-footer', 'file://' + f]);
  }
  console.log(`✔ ${v.slug} (${n} Slide${n > 1 ? 's' : ''}${single ? '' : ' + PDF'})`);
}

if (process.argv[2] === 'sheet') {
  const imgs = made.map((p) => `<div style="text-align:center"><img src="file://${p}" style="width:400px;display:block;outline:1px solid #ccc"><small style="font:12px sans-serif">${p.split('/').slice(-2).join('/')}</small></div>`).join('');
  const f = join(BUILD, 'sheet.html');
  writeFileSync(f, `<!doctype html><body style="margin:16px;background:#fff;display:grid;grid-template-columns:repeat(4,400px);gap:16px">${imgs}</body>`);
  const rows = Math.ceil(made.length / 4);
  chrome([`--window-size=1700,${rows * 560 + 32}`, `--screenshot=${join(OUT, 'contact-sheet.png')}`, 'file://' + f]);
  console.log('✔ contact-sheet.png');
}
console.log(`Fertig: ${made.length} PNGs → ${OUT}`);
