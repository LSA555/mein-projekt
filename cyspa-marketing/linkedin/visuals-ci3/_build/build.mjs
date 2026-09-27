// CYSPA LinkedIn-Visuals, CI v3.0 (Raleway, Navy/Gold)
// HTML/CSS -> chromium_headless_shell (Playwright) -> PNG (+ PDF bei Carousels)
//
// Voraussetzungen (in einem Arbeitsordner ausserhalb des Repos):
//   npm i @fontsource/raleway playwright-core pngjs
//   NODE_PATH=<arbeitsordner>/node_modules node build.mjs
// Umgebungsvariablen:
//   CHROME     Pfad zu headless_shell (Default: /opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell)
//   FONT_DIR   Ordner mit raleway-latin-<w>-normal.woff2 (Default: <NODE_PATH>/@fontsource/raleway/files)
//   OUT        Zielordner (Default: ../ relativ zu dieser Datei, also visuals-ci3/)
//   ONLY       Teilstring der Post-Nummer/Slug, rendert nur passende Visuals

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { VISUALS as ALL } from './content.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(process.env.NODE_PATH || ROOT, 'x.js'));
const { chromium } = require('playwright-core');
const { PNG } = require('pngjs');
const { PDFDocument } = require('pdf-lib');

const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const FONT_DIR = process.env.FONT_DIR || join(process.env.NODE_PATH || '', '@fontsource/raleway/files');
const OUT = resolve(process.env.OUT || join(ROOT, '..'));
const VISUALS = process.env.ONLY ? ALL.filter((v) => (v.nr + '-' + v.slug).includes(process.env.ONLY)) : ALL;

const b64 = (p) => readFileSync(p).toString('base64');
const FONTFACE = [400, 500, 600, 700, 800, 900].map((w) =>
  `@font-face{font-family:Raleway;font-style:normal;font-weight:${w};src:url(data:font/woff2;base64,${b64(join(FONT_DIR, `raleway-latin-${w}-normal.woff2`))}) format('woff2')}`).join('\n');
const LOGO = 'data:image/png;base64,' + b64(join(ROOT, 'assets/cyspa-logo-transparent.png'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/(\d+) (?=\p{L})/gu, '$1\u00a0')                       // Zahl + Einheit nicht trennen
  .replace(/([^\s«»()]+-[^\s«»()]+)/g, '<span class="nw">$1</span>') // Bindestrich-Wörter nicht am Bindestrich trennen
  .replace(/([«»])/g, '<span class="gq">$1</span>');

// ---------------------------------------------------------------- CI-v3-Tokens
const CSS = `
${FONTFACE}
:root{
  --gold:#ffc000; --navy:#103157; --deep:#071828; --blue:#425b76;
  --ink:#1a1a1a; --body:#5a5a5a; --border:#e6e6e6; --gray:#f8f8f8;
  --on-dark:#ffffff; --on-dark-2:#d6dee9; --on-dark-3:#b8c4d3;
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:var(--deep)}
body{font-family:Raleway,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:"lnum" 1}
.page{position:relative;overflow:hidden;break-after:page}
.page:last-child{break-after:auto}
.grid::before{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
  background-size:var(--cell) var(--cell)}
/* Wortmarke als Text: CYSPA + .ch in Gold (keine helle Bildmarke vorhanden) */
.wm{font-weight:800;letter-spacing:.14em;color:#fff;white-space:nowrap;line-height:1}
.wm b{font-weight:800;color:var(--gold);letter-spacing:.1em}
.wm.dark{color:var(--navy)}
.gq{font-weight:500}
.nw{white-space:nowrap}
/* Eyebrow zweizeilig mit Gold-Tick */
.eyebrow{font-weight:800;letter-spacing:.22em;text-transform:uppercase;line-height:1.5;color:var(--gold)}
.eyebrow .tick{display:block;height:.18em;width:2.4em;background:var(--gold);margin-bottom:.6em}
.eyebrow.right{text-align:right}.eyebrow.right .tick{margin-left:auto}
.eyebrow.onlight{color:var(--navy)}
`;

// ---------------------------------------------------------------- Fakten-Karte 1200x1200
const FACT_CSS = `
.fact{width:1200px;height:1200px;font-size:12px;--cell:40px;color:#fff;
  background:linear-gradient(155deg,#071828 0%,#103157 55%,#1a4576 100%);
  padding:88px 96px 64px 124px;display:flex;flex-direction:column}
.fact .edge{position:absolute;left:0;top:0;bottom:0;width:12px;background:var(--gold)}
.fact .eyebrow{font-size:24px}
.fact .kicker{font-size:30px;font-weight:600;color:var(--on-dark-2);margin-top:52px}
.fact h1{font-size:62px;font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-top:18px}
.fact.small h1{font-size:52px}
.fact h1 > span{display:block}
.fact h1 .l2{color:var(--gold)}
.fact main{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center}
.rows{display:flex;flex-direction:column}
.row{display:flex;align-items:center;gap:32px;padding:22px 0;border-top:1px solid rgba(255,255,255,.16)}
.row:last-child{border-bottom:1px solid rgba(255,255,255,.16)}
.pill{flex:none;width:272px;text-align:center;font-size:24px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
  color:var(--gold);border:2px solid var(--gold);border-radius:999px;padding:9px 12px 10px}
.pill.num{width:72px;height:72px;padding:0;display:flex;align-items:center;justify-content:center;font-size:32px;letter-spacing:0}
.row .head{font-size:34px;font-weight:700;line-height:1.2}
.row .sub{font-size:26px;font-weight:500;color:var(--on-dark-2);line-height:1.35;margin-top:6px}
.compact .row{padding:17px 0}.compact .row .head{font-size:32px}
.note{display:flex;gap:28px;align-items:flex-start;margin-top:30px;background:rgba(7,24,40,.55);
  border-left:6px solid var(--gold);padding:24px 28px}
.note .pill{width:auto;padding:7px 18px 8px}
.note p{font-size:26px;font-weight:500;line-height:1.4;color:var(--on-dark)}
.closing{margin-top:30px;font-size:34px;font-weight:800;letter-spacing:-.01em;display:flex;align-items:center;gap:22px}
.closing::before{content:"";flex:none;width:56px;height:6px;background:var(--gold)}
/* timeline (vertikal) */
.tl{position:relative;display:flex;flex-direction:column;gap:30px;padding-left:4px}
.tl::before{content:"";position:absolute;left:21px;top:22px;bottom:22px;width:3px;background:rgba(255,192,0,.55)}
.step{display:flex;gap:36px;align-items:flex-start;position:relative}
.dot{flex:none;width:44px;height:44px;border-radius:50%;border:4px solid var(--gold);background:#0c2644;margin-top:2px}
.dot.hot{background:var(--gold)}
.step .when{font-size:24px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.step .head{font-size:34px;font-weight:700;line-height:1.22;margin-top:4px}
.step .sub{font-size:26px;font-weight:500;color:var(--on-dark-2);margin-top:4px;line-height:1.35}
.small .step .head{font-size:32px}
.legend{display:flex;align-items:center;gap:18px;margin-top:30px;font-size:26px;font-weight:600;color:var(--on-dark)}
.legend .dot{width:28px;height:28px;border-width:3px;margin:0 8px 0 12px}
.question{margin-top:36px;background:rgba(255,255,255,.94);color:var(--navy);font-size:36px;font-weight:800;
  letter-spacing:-.01em;line-height:1.25;padding:28px 36px;position:relative}
.question::after{content:"";position:absolute;right:0;bottom:-18px;width:38%;height:18px;background:var(--gold)}
.fact footer{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-top:36px}
.fact footer .wm{font-size:30px}
.fact footer .src{font-size:24px;font-weight:500;color:var(--on-dark-3);text-align:right;line-height:1.35}
`;

function fact(v) {
  const title = `<h1><span class="l1">${esc(v.title[0])}</span><span class="l2">${esc(v.title[1])}</span></h1>`;
  let body = '';
  if (v.variant === 'rows') {
    body = `<div class="rows">${v.rows.map((r, i) => `
      <div class="row">${v.numbered ? `<div class="pill num">${i + 1}</div>` : `<div class="pill">${esc(r.pill)}</div>`}
        <div><div class="head">${esc(r.head)}</div>${r.sub ? `<div class="sub">${esc(r.sub)}</div>` : ''}</div></div>`).join('')}</div>`;
    if (v.note) body += `<div class="note"><div class="pill">${esc(v.note.pill)}</div><p>${esc(v.note.text)}</p></div>`;
  } else if (v.variant === 'timeline') {
    body = `<div class="tl">${v.steps.map((s) => `
      <div class="step"><div class="dot${s.hot ? ' hot' : ''}"></div>
        <div><div class="when">${esc(s.when)}</div><div class="head">${esc(s.head)}</div>${s.sub ? `<div class="sub">${esc(s.sub)}</div>` : ''}</div></div>`).join('')}</div>`;
    if (v.legend) body += `<div class="legend"><div class="dot hot"></div>${esc(v.legend)}</div>`;
    if (v.question) body += `<div class="question">${esc(v.question)}</div>`;
  }
  if (v.closing) body += `<div class="closing">${esc(v.closing)}</div>`;
  return `<section class="page fact grid${v.small ? ' small' : ''}${v.compact ? ' compact' : ''}">
    <div class="edge"></div>
    <div class="eyebrow"><span class="tick"></span>SECURITY4KMU<br>${esc(v.series)}</div>
    <div class="kicker">${esc(v.kicker)}</div>
    ${title}
    <main>${body}</main>
    <footer><div class="wm">CYSPA<b>.ch</b></div><div class="src">${esc(v.source)}</div></footer>
  </section>`;
}

// ---------------------------------------------------------------- Tipp-Carousel 1080x1350
const CAR_CSS = `
.slide{width:1080px;height:1350px;font-size:10.8px;--cell:54px}
.dark{background:linear-gradient(180deg,#081a2f 0%,#0d2847 45%,#123867 80%,#1a4576 100%);color:#fff}
.light{background:#fff;color:var(--ink)}
.slide .top{position:absolute;left:80px;right:80px;top:72px;display:flex;justify-content:space-between;align-items:flex-start}
.slide .top .wm{font-size:44px;margin-top:10px}
.slide .top img{height:82px;display:block}
.slide .eyebrow{font-size:24px}
.url{position:absolute;right:80px;bottom:64px;font-size:26px;font-weight:700;letter-spacing:.14em}
.dark .url{color:#fff}.light .url{color:var(--navy)}
.pager{position:absolute;left:80px;bottom:64px;font-size:24px;font-weight:700;letter-spacing:.12em;color:var(--body)}
.dark .pager{color:var(--on-dark-3)}
/* Cover */
.cover .sub{position:absolute;left:80px;right:120px;top:430px;font-size:34px;font-weight:500;line-height:1.4;color:var(--on-dark-2)}
.cover .sub::before{content:"";display:block;width:64px;height:6px;background:var(--gold);margin-bottom:30px}
.hblock{position:absolute;left:0;top:772px;width:86%;background:#eef1f5;padding:66px 64px 70px 80px}
.hblock h1{font-size:54px;font-weight:800;letter-spacing:-.025em;line-height:1.12}
.hblock h1 > span{display:block}.hblock .l1{color:var(--navy)}.hblock .l2{color:var(--ink)}
.hbar{position:absolute;left:44%;width:42%;height:20px;background:var(--gold)}
/* Textslides */
.content{position:absolute;left:80px;right:80px;top:0;padding-top:17%;margin-top:120px;bottom:150px;display:flex;flex-direction:column}
.label{font-size:24px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--blue);margin-bottom:26px}
.dark .label{color:var(--gold)}
.lead{font-size:48px;font-weight:800;letter-spacing:-.02em;line-height:1.18;color:var(--navy)}
.dark .lead{color:#fff}
.bodytxt{font-size:30px;font-weight:500;line-height:1.5;color:var(--ink);margin-top:30px}
.dark .bodytxt{color:var(--on-dark-2)}
.checks{list-style:none;margin-top:44px;display:flex;flex-direction:column;gap:30px}
.checks li{display:flex;gap:26px;align-items:flex-start;font-size:30px;font-weight:500;line-height:1.42;color:var(--ink)}
.dark .checks li{color:#fff}
.ic{flex:none;width:46px;height:46px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;margin-top:-2px}
.dark .ic{background:var(--gold)}
.ic svg{width:26px;height:26px}
.ic.no{background:#fff;border:3px solid var(--body)}
.blockhead{font-size:30px;font-weight:800;color:var(--navy);margin-bottom:10px}
.cmp{display:flex;flex-direction:column;gap:30px;margin-top:50px}
.card{display:flex;gap:26px;align-items:flex-start;background:var(--gray);border-left:8px solid var(--navy);padding:34px 36px}
.card.no{border-left-color:var(--body)}
.card .ct{font-size:34px;font-weight:800;color:var(--navy);line-height:1.2}
.card.no .ct{color:var(--ink)}
.card .cb{font-size:28px;font-weight:500;line-height:1.45;color:var(--ink);margin-top:10px}
.setting{margin-top:56px;border:2px solid var(--border);background:var(--gray);padding:26px 32px}
.setting .k{font-size:24px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--blue)}
.setting .v{font-size:34px;font-weight:700;color:var(--navy);margin-top:8px}
.bignum{display:flex;align-items:baseline;gap:22px}
.bignum .n{font-size:150px;font-weight:900;letter-spacing:-.04em;line-height:.9;color:var(--navy)}
.bignum .u{font-size:44px;font-weight:800;color:var(--navy)}
.nbar{width:120px;height:10px;background:var(--gold);margin:26px 0 30px}
.numchip{font-size:24px;font-weight:800;letter-spacing:.2em;color:var(--blue);text-transform:uppercase;margin-bottom:26px}
/* CTA */
.cta .stroke{width:84px;height:8px;background:var(--gold);margin-bottom:36px}
.cta h2{font-size:56px;font-weight:800;letter-spacing:-.025em;line-height:1.14}
.merk{margin-top:auto;border-left:8px solid var(--gold);padding:8px 0 8px 34px;font-size:36px;font-weight:700;line-height:1.35;color:#fff}
.note2{margin-top:40px;font-size:30px;font-weight:600;color:#fff;display:flex;gap:18px;align-items:center}
.note2::before{content:"";width:40px;height:4px;background:var(--gold);flex:none}
`;
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#ffc000" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5 10-11"/></svg>';
const CHECK_DARK = CHECK.replace('#ffc000', '#103157');
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="#5a5a5a" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const ic = (dark) => `<span class="ic">${dark ? CHECK_DARK : CHECK}</span>`;

function slide(v, s, i, n) {
  const dark = s.t === 'cover' || s.t === 'cta';
  const eyebrow = `<div class="eyebrow right${dark ? '' : ' onlight'}"><span class="tick"></span>SECURITY4KMU<br>${esc(v.series)}</div>`;
  const top = `<div class="top">${dark ? '<div class="wm">CYSPA<b>.ch</b></div>' : `<img src="${LOGO}" alt="CYSPA Cyber Security Partners">`}${eyebrow}</div>`;
  const foot = `${i > 0 ? `<div class="pager">${i + 1} / ${n}</div>` : ''}<div class="url">www.cyspa.ch</div>`;
  let inner = '';
  if (s.t === 'cover') {
    inner = `<div class="sub">${esc(s.sub)}</div>
      <div class="hblock"><h1><span class="l1">${esc(s.title[0])}</span><span class="l2">${esc(s.title[1])}</span></h1></div>
      <div class="hbar" id="hbar"></div>`;
  } else if (s.t === 'compare') {
    inner = `<div class="content"><div class="label">${esc(s.label)}</div><div class="lead">${esc(s.lead)}</div>
      <div class="cmp">
        <div class="card"><span class="ic">${CHECK}</span><div><div class="ct">${esc(s.ok.head)}</div><div class="cb">${esc(s.ok.body)}</div></div></div>
        <div class="card no"><span class="ic no">${CROSS}</span><div><div class="ct">${esc(s.no.head)}</div><div class="cb">${esc(s.no.body)}</div></div></div>
      </div></div>`;
  } else if (s.t === 'point') {
    inner = `<div class="content"><div class="label">${esc(s.label)}</div><div class="lead">${esc(s.title)}</div>
      ${s.body ? `<div class="bodytxt">${esc(s.body)}</div>` : ''}
      ${s.checks ? `<ul class="checks">${s.checks.map((c) => `<li>${ic()}<span>${esc(c)}</span></li>`).join('')}</ul>` : ''}
      ${s.setting ? `<div class="setting"><div class="k">Einstellung in Entra ID</div><div class="v">${esc(s.setting)}</div></div>` : ''}</div>`;
  } else if (s.t === 'blocks') {
    inner = `<div class="content"><div class="label">${esc(s.label)}</div><div class="lead">${esc(s.title)}</div>
      <ul class="checks">${s.blocks.map((b) => `<li>${ic()}<span><div class="blockhead">${esc(b.head)}</div>${esc(b.body)}</span></li>`).join('')}</ul></div>`;
  } else if (s.t === 'horizon') {
    inner = `<div class="content"><div class="label">Horizont</div>
      <div class="bignum"><span class="n">${esc(s.num)}</span><span class="u">${esc(s.unit)}</span></div>
      <div class="nbar"></div><div class="lead">${esc(s.title)}</div>
      <div class="bodytxt">${esc(s.body)}</div>
      <ul class="checks">${s.checks.map((c) => `<li>${ic()}<span>${esc(c)}</span></li>`).join('')}</ul></div>`;
  } else if (s.t === 'cta') {
    inner = `<div class="content cta">${s.label ? `<div class="label">${esc(s.label)}</div>` : '<div class="stroke"></div>'}
      <h2>${Array.isArray(s.title) ? `${esc(s.title[0])}<br><span style="color:var(--gold)">${esc(s.title[1])}</span>` : esc(s.title)}</h2>
      ${s.body ? `<div class="bodytxt">${esc(s.body)}</div>` : ''}
      ${s.list ? `<ul class="checks">${s.list.map((c) => `<li>${ic(true)}<span>${esc(c)}</span></li>`).join('')}</ul>` : ''}
      <div class="merk">${esc(s.merk)}</div>
      ${s.note ? `<div class="note2">${esc(s.note)}</div>` : ''}</div>`;
  }
  return `<section class="page slide ${dark ? 'dark grid' : 'light'} ${s.t}">${top}${inner}${foot}</section>`;
}

const doc = (w, h, body, extra) => `<!doctype html><html lang="de-CH"><head><meta charset="utf-8">
<style>@page{size:${w}px ${h}px;margin:0}${CSS}${extra}</style></head><body>${body}</body></html>`;

// Gold-Balken des Covers an die tatsächliche Blockhöhe anhängen
const FIX_JS = `document.querySelectorAll('.cover').forEach(c=>{const b=c.querySelector('.hblock'),bar=c.querySelector('.hbar');
  if(b&&bar){bar.style.top=(b.offsetTop+b.offsetHeight)+'px'}});`;

// ---------------------------------------------------------------- Prüfungen
function pixelCheck(file, w, h) {
  const png = PNG.sync.read(readFileSync(file));
  const issues = [];
  if (png.width !== w || png.height !== h) issues.push(`Masse ${png.width}x${png.height} statt ${w}x${h}`);
  // Weisser Rand: Anteil (fast) weisser Pixel je Randzeile/-spalte
  const white = (x, y) => { const k = (y * png.width + x) * 4; return png.data[k] > 245 && png.data[k + 1] > 245 && png.data[k + 2] > 245; };
  const edge = (pts) => pts.filter(([x, y]) => white(x, y)).length / pts.length;
  const W = png.width, H = png.height;
  const rows = (y) => Array.from({ length: W }, (_, x) => [x, y]);
  const cols = (x) => Array.from({ length: H }, (_, y) => [x, y]);
  const res = { top: edge(rows(0)), bottom: edge(rows(H - 1)), left: edge(cols(0)), right: edge(cols(W - 1)) };
  return { issues, res };
}

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  const report = [];
  for (const v of VISUALS) {
    const dir = join(OUT, `${v.nr}-${v.slug}`);
    mkdirSync(dir, { recursive: true });
    if (v.format === 'fact') {
      const html = doc(1200, 1200, fact(v), FACT_CSS);
      writeFileSync(join(ROOT, 'html', `${v.nr}-${v.slug}.html`), html);
      const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => { const s = document.querySelector('.page'); return s.scrollHeight > s.clientHeight + 1; });
      const out = join(dir, `${v.file}.png`);
      await page.locator('.page').screenshot({ path: out });
      await page.close();
      report.push({ file: out, overflow, ...pixelCheck(out, 1200, 1200) });
    } else {
      const n = v.slides.length;
      const html = doc(1080, 1350, v.slides.map((s, i) => slide(v, s, i, n)).join('\n'), CAR_CSS) + `<script>${FIX_JS}</script>`;
      writeFileSync(join(ROOT, 'html', `${v.nr}-${v.slug}.html`), html);
      const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(FIX_JS);
      const secs = page.locator('.page');
      for (let i = 0; i < n; i++) {
        const out = join(dir, `slide-${String(i + 1).padStart(2, '0')}.png`);
        const overflow = await secs.nth(i).evaluate((s) => [...s.querySelectorAll('.content')].some((c) => c.scrollHeight > c.clientHeight + 1));
        await secs.nth(i).screenshot({ path: out });
        report.push({ file: out, overflow, ...pixelCheck(out, 1080, 1350) });
      }
      await page.emulateMedia({ media: 'print' });
      await page.pdf({ path: join(dir, `${v.file}.pdf`), width: '11.25in', height: '14.0625in', printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
      // Chromium rundet die Seitenhöhe auf 1013.04 pt. Auf exakt 810 x 1012.5 pt (= 1080 x 1350 px) setzen,
      // Inhalt oben verankert.
      const pdfPath = join(dir, `${v.file}.pdf`);
      const pdf = await PDFDocument.load(readFileSync(pdfPath));
      for (const pg of pdf.getPages()) {
        const { height } = pg.getSize();
        pg.translateContent(0, 1012.5 - height);
        pg.setSize(810, 1012.5);
      }
      pdf.setTitle(v.pdfTitle || v.file); pdf.setAuthor('CYSPA GmbH'); pdf.setLanguage('de-CH');
      writeFileSync(pdfPath, await pdf.save());
      await page.close();
    }
  }
  // Kontaktbogen
  const pngs = report.map((r) => r.file);
  const sheet = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}
    html,body{background:#e6e6e6}body{padding:40px;width:2200px}
    .g{display:flex;flex-wrap:wrap;gap:28px}
    figure{background:#fff;padding:14px;width:400px}
    figure img{width:372px;display:block;border:1px solid #e6e6e6}
    figcaption{font:600 18px Raleway;color:#1a1a1a;margin-top:10px;overflow-wrap:anywhere}
    h1{font:800 40px Raleway;color:#103157;margin-bottom:24px}</style></head><body>
    <h1>CYSPA LinkedIn-Visuals Oktober 2026 · CI v3.0</h1><div class="g">
    ${pngs.map((p) => `<figure><img src="${pathToFileURL(p)}"><figcaption>${esc(p.replace(OUT + '/', ''))}</figcaption></figure>`).join('')}
    </div></body></html>`;
  writeFileSync(join(ROOT, 'html', 'contact-sheet.html'), sheet);
  if (!process.env.ONLY) {
    const page = await browser.newPage({ viewport: { width: 2200, height: 800 } });
    await page.goto(pathToFileURL(join(ROOT, 'html', 'contact-sheet.html')).href, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(OUT, 'contact-sheet.png'), fullPage: true });
    await page.close();
  }
  await browser.close();
  for (const r of report) {
    const bad = r.issues.length || r.overflow;
    console.log(`${bad ? 'FEHLER' : 'ok    '} ${r.file.replace(OUT + '/', '')} ${r.issues.join('; ')}${r.overflow ? ' Überlauf' : ''} Rand-weiss t${r.res.top.toFixed(2)} b${r.res.bottom.toFixed(2)} l${r.res.left.toFixed(2)} r${r.res.right.toFixed(2)}`);
  }
}
mkdirSync(join(ROOT, 'html'), { recursive: true });
await main();
