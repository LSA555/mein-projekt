// CYSPA LinkedIn Asset-Renderer
// HTML/CSS → headless Chromium → PNG (Feed) + PDF (Dokument-Posts).
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

const b64 = (p) => readFileSync(join(ROOT, p)).toString('base64');
const FONTS = {
  mont: b64('fonts/Montserrat-Bold.ttf'),
  inter: b64('fonts/Inter-Regular.ttf'),
  mono: b64('fonts/JetBrainsMono-Regular.ttf'),
};
const LOGO = 'data:image/png;base64,' + b64('img/cyspa-logo-transparent.png');

// ---------------------------------------------------------------- Designsystem
// Masse in rem; html font-size skaliert: 40px → 1080×1350 (Carousel-Slide),
// 44.444px → 1200×1500 (Single Graphic). Gleiches Seitenverhältnis 4:5.
const CSS = `
@font-face{font-family:Montserrat;font-weight:700;src:url(data:font/ttf;base64,${FONTS.mont})}
@font-face{font-family:Inter;font-weight:400;src:url(data:font/ttf;base64,${FONTS.inter})}
@font-face{font-family:JBMono;font-weight:400;src:url(data:font/ttf;base64,${FONTS.mono})}
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --navy:#0A1F44; --navy2:#103157; --card:#1D2535; --cyan:#00AEEF;
  --ink:#FFFFFF; --ink2:rgba(255,255,255,.84); --meta:rgba(255,255,255,.55);
  --line:rgba(255,255,255,.14);
}
.slide{width:100vw;height:100vh;background:var(--navy);color:var(--ink);
  display:flex;flex-direction:column;padding:2.1rem;overflow:hidden;
  font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
@media print{.slide{width:27rem;height:33.75rem}}
.slide.light{--navy:#F2F2F2;--ink:#0A1F44;--ink2:#0A1F44;--meta:#58595B;
  --card:#FFFFFF;--line:rgba(10,31,68,.15);background:#F2F2F2}
.hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.4rem}
.badge{font-family:Montserrat;font-weight:700;font-size:.56rem;letter-spacing:.18em;
  padding:.27rem .6rem .24rem;border:.055rem solid var(--cyan);border-radius:.12rem;white-space:nowrap}
.pager{font-size:.6rem;color:var(--meta);padding-top:.3rem}
main{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
.bar{width:2.6rem;height:.15rem;background:var(--cyan);border-radius:.08rem;margin-bottom:.85rem}
h1{font-family:Montserrat;font-weight:700;font-size:2.2rem;line-height:1.13;letter-spacing:-.01em}
h2{font-family:Montserrat;font-weight:700;font-size:1.42rem;line-height:1.16;letter-spacing:-.005em}
.sub{font-size:.9rem;line-height:1.42;color:var(--ink2);margin-top:.75rem;max-width:21rem}
.body{font-size:.95rem;line-height:1.45;color:var(--ink2);max-width:21.5rem}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:1.4rem}
.hint,.url{font-size:.6rem;color:var(--meta)}
.plate{background:#FFFFFF;border-radius:.16rem;padding:.26rem .4rem;line-height:0}
.slide.light .plate{background:none;padding:0}
.plate img{height:1rem;display:block}
.spacer{flex:1}
/* Nummern-Chip */
.chip{width:2.15rem;height:2.15rem;border:.075rem solid var(--cyan);border-radius:.2rem;
  display:flex;align-items:center;justify-content:center;
  font-family:Montserrat;font-weight:700;font-size:1.15rem;margin-bottom:1rem}
/* Cards */
.card{background:var(--card);border-left:.11rem solid var(--cyan);border-radius:.18rem;
  padding:.85rem .95rem}
.card.bad{border-left-color:#58595B}
.card .chead{font-family:Montserrat;font-weight:700;font-size:.82rem;margin-bottom:.4rem;
  display:flex;align-items:center;gap:.45rem}
.card .cbody{font-size:.8rem;line-height:1.42;color:var(--ink2)}
.glyph{font-family:Inter;font-size:.75rem;width:1.05rem;height:1.05rem;border-radius:.1rem;
  display:inline-flex;align-items:center;justify-content:center;flex:none;
  border:.05rem solid var(--cyan)}
.card.bad .glyph{border-color:#58595B}
.stack{display:flex;flex-direction:column;gap:.7rem;margin-top:1.1rem}
/* Mono-Chips */
.mono{display:inline-block;font-family:JBMono;font-size:.62rem;background:var(--navy2);
  padding:.3rem .55rem;border-radius:.14rem;margin-top:1.1rem}
/* Merksatz */
.merk{border-left:.14rem solid var(--cyan);padding-left:.8rem;
  font-family:Montserrat;font-weight:700;font-size:.95rem;line-height:1.35}
.divider{height:.045rem;background:var(--line);margin:1.15rem 0}
/* Listen */
.li{display:flex;gap:.6rem;align-items:baseline;font-size:.9rem;line-height:1.4;color:var(--ink2)}
.li+.li{margin-top:.7rem}
.dash{flex:none;width:.75rem;height:.13rem;background:var(--cyan);border-radius:.07rem;
  align-self:center}
/* Formel-Boxen */
.frow{display:flex;gap:.42rem;margin-top:1.5rem}
.fbox{flex:1;border:.06rem solid var(--cyan);border-radius:.18rem;padding:.8rem .45rem .7rem;
  text-align:center;display:flex;flex-direction:column;gap:.45rem;min-height:6.4rem}
.fbox b{font-family:Montserrat;font-weight:700;font-size:1.7rem;line-height:1}
.fbox span{font-size:.52rem;line-height:1.3;color:var(--ink2);hyphens:auto}
/* Treppe */
.stair{display:flex;gap:.4rem;align-items:flex-end;margin-top:1.6rem}
.step{flex:1;background:var(--card);border-top:.14rem solid var(--cyan);
  border-radius:.14rem .14rem 0 0;padding:.7rem .6rem}
.step b{font-family:Montserrat;font-weight:700;font-size:.95rem;display:block;margin-bottom:.4rem}
.step span{font-size:.6rem;line-height:1.3;color:var(--ink2);hyphens:auto}
/* Wege-Diagramm */
.ways{display:flex;align-items:stretch;gap:.7rem;margin-top:1.6rem}
.node{width:4.6rem;border-radius:.2rem;display:flex;flex-direction:column;gap:.3rem;
  align-items:center;justify-content:center;font-family:Montserrat;font-weight:700;font-size:1.25rem}
.node.eu{background:var(--navy2)}
.node.ch{border:.06rem solid rgba(255,255,255,.45)}
.wlist{flex:1;display:flex;flex-direction:column;justify-content:space-between;padding:.2rem 0}
.way{position:relative;padding-bottom:.55rem}
.way span{font-size:.62rem;color:var(--ink2);display:block;margin-bottom:.35rem;hyphens:auto}
.way i{display:block;height:.055rem;background:var(--cyan);position:relative}
.way i:after{content:'';position:absolute;right:0;top:-.16rem;border:.19rem solid transparent;
  border-left-color:var(--cyan);border-right:0}
/* Sequenz */
.seq{display:flex;align-items:center;gap:.5rem;margin-top:1.7rem}
.stage{flex:1;background:var(--card);border-radius:.18rem;padding:.9rem .5rem;
  display:flex;flex-direction:column;align-items:center;gap:.6rem;text-align:center}
.stage svg{width:1.7rem;height:1.7rem;stroke:#FFF;fill:none;stroke-width:1.6;
  stroke-linecap:round;stroke-linejoin:round}
.stage span{font-size:.6rem;line-height:1.3;color:var(--ink2)}
.sarr{flex:none;width:1rem;height:.055rem;background:var(--cyan);position:relative}
.sarr:after{content:'';position:absolute;right:0;top:-.16rem;border:.19rem solid transparent;
  border-left-color:var(--cyan);border-right:0}
/* Zitat */
.qblock{border-left:.16rem solid var(--cyan);padding-left:1.1rem}
.qblock h1{font-size:1.85rem}
.qmeta{font-size:.72rem;color:var(--meta);margin-top:1.1rem}
.answer{font-size:1rem;line-height:1.45;color:var(--ink2);margin-top:1.3rem;max-width:19rem}
.fnote{font-size:.62rem;line-height:1.45;color:var(--meta);
  border-top:.045rem solid var(--line);padding-top:.8rem;margin-top:1.5rem}
`;

const ICONS = {
  lock: `<svg viewBox="0 0 24 24"><rect x="3.5" y="11" width="17" height="9.5" rx="1.6"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg viewBox="0 0 24 24"><rect x="3.5" y="11" width="17" height="9.5" rx="1.6"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  archive: `<svg viewBox="0 0 24 24"><rect x="3" y="3.5" width="18" height="4.5" rx="1"/><path d="M5 8v11.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"/><path d="M10 12.5h4"/></svg>`,
};

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');

// ------------------------------------------------------------------ Templates
function footer({ hint, url, logo }) {
  return `<div class="foot"><span class="${url ? 'url' : 'hint'}">${
    url ? 'www.cyspa.ch' : esc(hint ?? '')
  }</span>${logo ? `<span class="plate"><img src="${LOGO}"></span>` : '<span></span>'}</div>`;
}

function cards(list) {
  return `<div class="stack">${list.map((c) => `<div class="card${c.tone === 'bad' ? ' bad' : ''}">
    <div class="chead">${c.tone ? `<span class="glyph">${c.tone === 'ok' ? '✓' : '✗'}</span>` : ''}${esc(c.head)}</div>
    <div class="cbody">${esc(c.body)}</div></div>`).join('')}</div>`;
}

function slideBody(s) {
  switch (s.t) {
    case 'cover':
      return `<main><div class="bar"></div><h1>${esc(s.title)}</h1>
        <p class="sub">${esc(s.sub)}</p></main>`;
    case 'split':
      return `<main><h2>${esc(s.title)}</h2>${cards(s.cards)}</main>`;
    case 'point':
      return `<main><div class="chip">${esc(s.num)}</div><h2>${esc(s.title)}</h2>
        <p class="body" style="margin-top:.8rem">${esc(s.body)}</p>
        ${s.mono ? `<div><span class="mono">${esc(s.mono)}</span></div>` : ''}</main>`;
    case 'cta': {
      const head = s.num
        ? `<div class="chip">${esc(s.num)}</div><h2>${esc(s.title)}</h2><p class="body" style="margin-top:.8rem">${esc(s.body)}</p>`
        : `<h2>${esc(s.title)}</h2>`;
      const list = s.list ? `<div style="margin-top:1rem">${s.list.map((i) => `<div class="li"><span class="dash"></span><span>${esc(i)}</span></div>`).join('')}</div>` : '';
      const note = s.note ? `<p class="qmeta">${esc(s.note)}</p>` : '';
      return `<main>${head}${list}<div class="divider"></div><div class="merk">${esc(s.merk)}</div>${note}</main>`;
    }
    case 'quote':
      if (s.meta) // Light-Variante (P3)
        return `<main><div class="qblock"><h1>${esc(s.quote)}</h1></div>
          <p class="qmeta" style="padding-left:1.26rem">${esc(s.meta)}</p></main>`;
      return `<main><h1>${esc(s.quote)}</h1><div class="bar" style="margin:1.2rem 0 0"></div>
        <p class="answer">${esc(s.answer)}</p></main>`;
    case 'formula':
      return `<main><div class="bar"></div><h1 style="font-size:1.62rem">${esc(s.title)}</h1>
        <p class="sub">${esc(s.sub)}</p>
        <div class="frow">${s.boxes.map((b) => `<div class="fbox"><b>${esc(b.n)}</b><span lang="de">${esc(b.label)}</span></div>`).join('')}</div>
        <p class="fnote">${esc(s.foot)}</p></main>`;
    case 'steps':
      return `<main><div class="bar"></div><h1 style="font-size:1.55rem">${esc(s.title)}</h1>
        <p class="sub">${esc(s.sub)}</p>
        <div class="stair">${s.steps.map((t, i) => `<div class="step" style="padding-bottom:${0.7 + i * 1.05}rem"><b>${i + 1}</b><span lang="de">${esc(t)}</span></div>`).join('')}</div></main>`;
    case 'ways':
      return `<main><div class="bar"></div><h1 style="font-size:1.42rem">${esc(s.title)}</h1>
        <div class="ways">
          <div class="node eu">EU</div>
          <div class="wlist">${s.arrows.map((a) => `<div class="way"><span lang="de">${esc(a)}</span><i></i></div>`).join('')}</div>
          <div class="node ch"><svg viewBox="0 0 24 24" style="width:1.2rem;height:1.2rem;fill:#FFF"><path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5z"/></svg>CH</div>
        </div>
        <p class="fnote">${esc(s.foot)}</p></main>`;
    case 'lines':
      return `<main><div class="bar"></div><h1 style="font-size:1.7rem">${esc(s.title)}</h1>
        <p class="sub" style="margin-bottom:1.3rem">${esc(s.sub)}</p>
        ${s.items.map((i) => `<div class="li"><span class="dash"></span><span>${esc(i)}</span></div>`).join('')}
        <div class="divider"></div><div class="merk">${esc(s.foot)}</div></main>`;
    case 'seq':
      return `<main><div class="bar"></div><h1 style="font-size:1.62rem">${esc(s.title)}</h1>
        <div class="seq">${s.stages.map((st, i) => `${i ? '<span class="sarr"></span>' : ''}<div class="stage">${ICONS[st.icon]}<span>${esc(st.label)}</span></div>`).join('')}</div>
        <div class="divider" style="margin-top:1.7rem"></div>
        <div class="merk" style="font-size:1.05rem">${esc(s.question)}</div></main>`;
    default:
      throw new Error('Unbekannter Slide-Typ: ' + s.t);
  }
}

function slideHTML(v, s, i, n) {
  const last = i === n - 1;
  const pager = n > 1 ? `<span class="pager">${i + 1}/${n}</span>` : '';
  const logo = n === 1 || i === 0 || last;
  const hint = n > 1 && i === 0 ? '→ weiterblättern' : '';
  const url = s.url || (n === 1 && !v.noUrl);
  return `<div class="slide${v.theme === 'light' ? ' light' : ''}">
    <div class="hd"><span class="badge">${esc(v.badge)}</span>${pager}</div>
    ${slideBody(s)}
    ${footer({ hint, url: url && (last || n === 1), logo })}</div>`;
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
  const fs = single ? 1200 / 27 : 40; // → 1200×1500 bzw. 1080×1350
  const [W, H] = single ? [1200, 1500] : [1080, 1350];
  const dir = join(OUT, v.slug);
  mkdirSync(dir, { recursive: true });
  const n = v.slides.length;

  v.slides.forEach((s, i) => {
    const html = page(slideHTML(v, s, i, n), fs);
    const f = join(BUILD, `${v.slug}-${i + 1}.html`);
    writeFileSync(f, html);
    const png = join(dir, single ? `${v.slug}.png` : `slide-${String(i + 1).padStart(2, '0')}.png`);
    chrome([`--window-size=${W},${H}`, `--screenshot=${png}`, 'file://' + f]);
    made.push(png);
  });

  if (!single) { // Dokument-Post-PDF (Vektor, Fonts eingebettet)
    const body = v.slides.map((s, i) => slideHTML(v, s, i, n)).join('');
    const f = join(BUILD, `${v.slug}-doc.html`);
    writeFileSync(f, page(body, fs).replace('<style>',
      `<style>@page{size:1080px 1350px;margin:0} .slide{page-break-after:always}`));
    chrome([`--print-to-pdf=${join(dir, v.slug + '.pdf')}`, '--no-pdf-header-footer', 'file://' + f]);
  }
  console.log(`✔ ${v.slug} (${n} Slide${n > 1 ? 's' : ''}${single ? '' : ' + PDF'})`);
}

if (process.argv[2] === 'sheet') {
  const imgs = made.map((p) => `<div style="text-align:center"><img src="file://${p}" style="width:400px;display:block;outline:1px solid #ccc"><small style="font:12px sans-serif">${p.split('/').slice(-2).join('/')}</small></div>`).join('');
  const f = join(BUILD, 'sheet.html');
  writeFileSync(f, `<!doctype html><body style="margin:16px;background:#fff;display:grid;grid-template-columns:repeat(4,400px);gap:16px">${imgs}</body>`);
  const rows = Math.ceil(made.length / 4);
  chrome([`--window-size=1700,${rows * 540 + 32}`, `--screenshot=${join(OUT, 'contact-sheet.png')}`, 'file://' + f]);
  console.log('✔ contact-sheet.png');
}
console.log(`Fertig: ${made.length} PNGs → ${OUT}`);
