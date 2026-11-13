---
tags: [cyspa, website, hubspot, kopiervorlage]
status: entwurf
date: 2026-11-13
source: Export aus data/cyspa/website/preview/index.html
---

# Kopiervorlage 01: Startseite

## 1. Seite anlegen (HubSpot: Marketing > Website > Website-Seiten > Erstellen)

| Feld in HubSpot | Wert zum Kopieren |
|---|---|
| Interner Seitenname | CYSPA | Startseite |
| Seiten-URL (Slug) | / |
| Seitentitel (Einstellungen > Allgemein) | Cyber Security Beratung Schweiz | CYSPA Rotkreuz, Zug |
| Meta-Beschreibung | Unabhängige Cyber Security Beratung für Schweizer Unternehmen: CISO as a Service, Penetration Tests, ISO 27001 Audits und Awareness. Kostenloser Basic Check. |
| Sprache | Deutsch (Schweiz) |
| Hauptüberschrift H1 (zur Kontrolle, ist im Inhalt enthalten) | Cyber Security auf Schweizer Niveau. |

## 2. Head-HTML (Einstellungen > Erweitert > Head-HTML)

```html
<script type="application/ld+json">
[
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://cyspa.ch/#org",
    "name": "CYSPA Cyber Security Partners GmbH",
    "alternateName": "CYSPA",
    "url": "https://cyspa.ch/",
    "telephone": "+41 41 521 61 61",
    "email": "info@cyspa.ch",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Erlenstrasse 4B",
      "postalCode": "6343",
      "addressLocality": "Rotkreuz",
      "addressRegion": "ZG",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.1402,
      "longitude": 8.4345
    },
    "areaServed": {
      "@type": "Country",
      "name": "Schweiz"
    },
    "sameAs": [
      "https://www.linkedin.com/company/cyspa/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was macht CYSPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CYSPA Cyber Security Partners GmbH ist ein lösungs- und herstellerunabhängiges Cyber Security Beratungsunternehmen mit Sitz in Rotkreuz, Kanton Zug. Wir unterstützen Schweizer Unternehmen mit CISO as a Service, Security Consulting, Penetration Tests, Audits und Security Awareness."
        }
      },
      {
        "@type": "Question",
        "name": "Für welche Unternehmen arbeitet CYSPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Für KMU, grössere Unternehmen und Betreiber kritischer Infrastrukturen in der ganzen Schweiz, zum Beispiel aus Energie, Industrie, Immobilien und Dienstleistung."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der kostenlose IT Security Basic Check?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein unverbindliches Erstgespräch von 60 Minuten mit einem Senior Experten. Sie erhalten eine ehrliche Einschätzung Ihrer Sicherheitslage und die wichtigsten nächsten Schritte."
        }
      },
      {
        "@type": "Question",
        "name": "Ist CYSPA an Hersteller gebunden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein. CYSPA verkauft keine Produkte und erhält keine Provisionen von Herstellern. Unsere Empfehlungen richten sich ausschliesslich nach Ihrem Risiko."
        }
      }
    ]
  }
]
</script>
```

## 3. Seiteninhalt (ein Modul "Benutzerdefiniertes HTML" / "Custom HTML", Inhalt komplett ersetzen)

```html
<!-- CYSPA Website | Seite: Startseite | / -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap">
<style>

/* Layout: Visuelle Sprache aus cyspa-karriere und cyspa-premium (Navy-Verlauf mit Raster im Hero, Glas-Kennzahlen, Gold-Linien-Labels, Karten- und Spaltenraster). Inhalte aus cyspa-website-v2. Ein festes Erscheinungsbild nach CI, kein Dark Mode. */
:root{
  --yellow:#ffc000; --hover-blue:#2062af; --pb:#425b76; --link-blue:#096bd8;
  --navy:#103157; --navy-deep:#071828; --navy-2:#1a4576;
  --white:#ffffff; --gray:#f8f8f8; --gray-2:#f0f2f5;
  --heading:#1a1a1a; --body:#5a5a5a; --muted:#8a8a8a; --border:#e6e6e6;
  --on-dark:#ffffff; --on-dark-2:rgba(255,255,255,.78); --on-dark-3:rgba(255,255,255,.55);
  --font:"Raleway",system-ui,-apple-system,"Segoe UI",sans-serif;
  --sh-sm:0 1px 3px rgba(0,0,0,.04),0 4px 12px rgba(0,0,0,.04);
  --sh-md:0 5px 15px rgba(0,0,0,.08); --sh-lg:0 15px 40px rgba(0,0,0,.12);
  --tr:all .35s cubic-bezier(.4,0,.2,1);
  color-scheme:light;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--white);color:var(--body);font-family:var(--font);font-size:15px;font-weight:500;line-height:1.7;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{margin:0;color:var(--heading);font-weight:700;letter-spacing:-.025em;line-height:1.1;text-wrap:balance}
p{margin:0}
a{color:inherit;text-decoration:none}
ul{margin:0;padding:0;list-style:none}
button{font-family:inherit}
.display{font-size:clamp(38px,5.6vw,70px);font-weight:800;letter-spacing:-.035em;line-height:1.03}
h2{font-size:clamp(30px,3.8vw,50px);font-weight:800;letter-spacing:-.03em;line-height:1.06}
h3{font-size:22px;line-height:1.2}
h4{font-size:17px;line-height:1.3}
em.y{color:var(--yellow);font-style:normal}
.lede{font-size:clamp(16px,1.3vw,18px);line-height:1.65;font-weight:400;color:var(--body);max-width:62ch}
.con{max-width:1200px;margin:0 auto;padding-left:max(24px,env(safe-area-inset-left,0px));padding-right:max(24px,env(safe-area-inset-right,0px))}
@media (max-width:640px){.con{padding-left:max(18px,env(safe-area-inset-left,0px));padding-right:max(18px,env(safe-area-inset-right,0px))}}
section{padding-block:clamp(72px,10vw,120px)}
.bg-gray{background:var(--gray)}
.bg-navy{background:var(--navy);color:var(--on-dark-2)}
.bg-navy h2,.bg-navy h3,.bg-navy h4{color:var(--on-dark)}
.sec-lbl{font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:var(--pb);display:inline-flex;align-items:center;gap:10px;margin-bottom:18px}
.sec-lbl::before{content:"";width:24px;height:1px;background:var(--yellow)}
.bg-navy .sec-lbl,.hero .sec-lbl,.cta-sec .sec-lbl{color:var(--on-dark-3)}
.head-split{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:end;margin-bottom:56px}
.head-split .lede{justify-self:end}
.bg-navy .lede,.hero .lede,.cta-sec .lede{color:var(--on-dark-2)}
@media (max-width:900px){.head-split{grid-template-columns:1fr;gap:20px}.head-split .lede{justify-self:start}}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:11px;background:var(--yellow);color:var(--heading);border:1px solid var(--yellow);border-radius:5px;padding:16px 30px;font-weight:700;font-size:14px;letter-spacing:.02em;transition:var(--tr);cursor:pointer}
.btn:hover{background:var(--hover-blue);border-color:var(--hover-blue);color:#fff;transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.18)}
.btn-outline{background:transparent;color:var(--navy);border-color:var(--navy)}
.btn-outline:hover{color:#fff}
.btn-ghost{color:var(--on-dark);border-bottom:1px solid rgba(255,255,255,.35);padding:6px 0;font-size:14px;font-weight:600;transition:var(--tr)}
.btn-ghost:hover{color:var(--yellow);border-bottom-color:var(--yellow)}
.btn-link{color:var(--link-blue);font-weight:700;font-size:14px}
.btn-link:hover{color:var(--navy)}
svg.arr{width:16px;height:16px;flex:none}
:where(a,button,input,select,textarea):focus-visible{outline:3px solid var(--yellow);outline-offset:3px}

/* Navigation */
body::before{content:"";position:fixed;inset:0 0 auto;height:env(safe-area-inset-top,0px);z-index:1000;background:var(--white)}
#nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:999;background:rgba(255,255,255,.96);backdrop-filter:saturate(1.8) blur(20px);box-shadow:0 1px 24px rgba(0,0,0,.06)}
.nav-wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;height:78px}
.logo{font-weight:900;font-size:24px;letter-spacing:.08em;color:var(--navy)}
.logo span{color:var(--yellow);font-size:.62em;letter-spacing:0;font-weight:800}
.logo{display:block;line-height:0}
.logo-img{display:block;width:120px;height:50px}
.logo-img.on-dark{box-sizing:content-box;background:#fff;padding:10px 14px;border-radius:6px}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-item{position:relative}
.nav-item>a{display:flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;color:var(--heading);padding:9px 13px;border-radius:5px;transition:var(--tr)}
.nav-item>a:hover,.nav-item>a[aria-current="true"]{color:var(--pb);background:var(--gray)}
.nav-item .caret{font-size:9px;color:var(--muted)}
.drop{position:absolute;top:100%;left:0;min-width:250px;background:#fff;border:1px solid var(--border);border-radius:8px;box-shadow:var(--sh-lg);padding:8px;display:none}
.nav-item:hover .drop,.nav-item:focus-within .drop{display:grid}
.drop a{font-size:13.5px;font-weight:600;color:var(--heading);padding:9px 12px;border-radius:5px}
.drop a:hover{background:var(--gray);color:var(--pb)}
.nav-cta{padding:11px 20px;font-size:13.5px}
.nav-cta.mob{display:none}
.menu-btn{display:none;border:1px solid var(--border);background:#fff;border-radius:5px;padding:9px 14px;font-weight:700;font-size:13.5px;color:var(--navy);cursor:pointer}
@media (max-width:1060px){
  .menu-btn{display:block}
  .nav-links{display:none;position:absolute;left:0;right:0;top:78px;background:#fff;flex-direction:column;align-items:stretch;padding:12px max(18px,env(safe-area-inset-right,0px)) 20px max(18px,env(safe-area-inset-left,0px));border-top:1px solid var(--border);box-shadow:var(--sh-lg);max-height:calc(100vh - 78px);overflow:auto}
  .nav-links.open{display:flex}
  .drop{position:static;display:grid;box-shadow:none;border:0;padding:0 0 6px 14px;min-width:0}
  .nav-cta.desk{display:none}
  .nav-cta.mob{display:inline-flex;justify-content:center;margin-top:10px}
}

/* Hero */
.hero{background:linear-gradient(155deg,var(--navy-deep) 0%,var(--navy) 55%,var(--navy-2) 100%);color:var(--on-dark);position:relative;overflow:hidden;isolation:isolate;padding-block:clamp(80px,11vw,130px) clamp(70px,9vw,110px)}
.hero::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse 700px 400px at 82% 28%,rgba(255,192,0,.10) 0%,transparent 60%),radial-gradient(ellipse 600px 500px at 8% 75%,rgba(91,143,201,.22) 0%,transparent 65%)}
.hero::after{content:"";position:absolute;inset:0;z-index:-1;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%);mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
.hero h1{color:var(--on-dark)}
.hero-inner{display:grid;grid-template-columns:1.1fr 1fr;gap:72px;align-items:center}
.hero-inner>*{min-width:0}
.badge{display:inline-flex;align-items:center;gap:10px;color:var(--yellow);font-size:11px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;border:1px solid rgba(255,192,0,.35);background:rgba(255,192,0,.05);border-radius:50px;padding:9px 18px;margin-bottom:30px}
.badge::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--yellow)}
.hero-sub{font-size:clamp(16px,1.35vw,19px);line-height:1.65;color:var(--on-dark-2);font-weight:400;margin:24px 0 40px;max-width:56ch}
.hero-btns{display:flex;gap:22px;align-items:center;flex-wrap:wrap}
.facts{display:grid;gap:16px}
.facts-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.fact{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:28px 26px;backdrop-filter:blur(8px)}
.fact-num{font-size:50px;font-weight:800;color:#fff;letter-spacing:-.04em;line-height:1;display:block;margin-bottom:8px;font-variant-numeric:tabular-nums}
.fact-num em{color:var(--yellow);font-style:normal;font-weight:300}
.fact-lbl{font-size:12px;color:var(--on-dark-3);letter-spacing:.14em;text-transform:uppercase;font-weight:700}
.fact-sub{font-size:14px;color:var(--on-dark-2);margin-top:6px;line-height:1.5}
@media (max-width:1000px){.hero-inner{grid-template-columns:1fr;gap:48px}}
@media (max-width:520px){.facts-row{grid-template-columns:1fr}}
.page-hero{padding-block:clamp(64px,9vw,104px) clamp(56px,8vw,88px)}
.page-hero .crumb{font-size:13px;color:var(--on-dark-3);font-weight:600;margin-bottom:22px}
.page-hero .crumb a:hover{color:var(--yellow)}
.page-hero h1{font-size:clamp(34px,4.6vw,60px);font-weight:800;letter-spacing:-.035em;line-height:1.05;max-width:20ch}
.page-hero .hero-sub{margin-bottom:0}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:26px}
.tag{font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:6px 12px;border-radius:50px;border:1px solid rgba(255,192,0,.4);color:var(--yellow)}
.subnav{display:flex;gap:8px;flex-wrap:wrap;margin-top:34px}
.subnav a{font-size:13px;font-weight:700;color:var(--on-dark-2);border:1px solid rgba(255,255,255,.18);border-radius:50px;padding:8px 16px;transition:var(--tr)}
.subnav a:hover,.subnav a[aria-current="true"]{background:#fff;color:var(--navy);border-color:#fff}

/* Logo-Leiste */
.ticker{background:rgba(7,24,40,.92);border-top:1px solid rgba(255,255,255,.08);overflow:hidden}
.ticker-track{display:flex;gap:34px;align-items:center;white-space:nowrap;padding-block:18px;width:max-content;animation:tick 48s linear infinite}
.ticker-track span{font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.ticker-track i{width:6px;height:6px;background:var(--yellow);transform:rotate(45deg);opacity:.6;flex:none}
@keyframes tick{to{transform:translateX(-50%)}}

/* Raster mit Trennlinien (Karriere "Warum") */
.split3{display:grid;grid-template-columns:repeat(3,1fr);border-top:2px solid var(--border)}
.split3>div{padding:48px 36px 40px 0;border-right:1px solid var(--border)}
.split3>div:nth-child(3n+2){padding:48px 36px 40px}
.split3>div:nth-child(3n){border-right:none;padding:48px 0 40px 36px}
.split3 h4{margin-bottom:10px}
.split3 p{font-size:14px;line-height:1.65}
.ico{width:52px;height:52px;border-radius:50%;background:rgba(255,192,0,.12);display:flex;align-items:center;justify-content:center;color:var(--navy);margin-bottom:22px}
.ico svg{width:22px;height:22px}
.big-statement{font-size:clamp(22px,2.4vw,32px);font-weight:500;color:var(--heading);line-height:1.35;letter-spacing:-.015em;max-width:30ch}
.big-statement b{font-weight:800}
@media (max-width:900px){.split3{grid-template-columns:1fr}.split3>div,.split3>div:nth-child(3n+2),.split3>div:nth-child(3n){padding:32px 0;border-right:none;border-bottom:1px solid var(--border)}}

/* Karten */
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
@media (max-width:1000px){.grid3,.grid4{grid-template-columns:1fr 1fr}}
@media (max-width:680px){.grid3,.grid2,.grid4{grid-template-columns:1fr}}
.card{background:#fff;border:1px solid var(--border);border-radius:8px;padding:32px 30px;display:flex;flex-direction:column;gap:14px;transition:var(--tr);min-width:0}
a.card:hover,.card.hov:hover{transform:translateY(-6px);box-shadow:var(--sh-lg);border-color:transparent}
.card-top{display:flex;justify-content:space-between;align-items:center}
.card-num{font-size:12px;font-weight:800;color:var(--muted);letter-spacing:.2em;font-variant-numeric:tabular-nums}
.card .ico{margin:0;background:var(--gray-2)}
.pill{align-self:flex-start;font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:6px 12px;border-radius:50px;background:var(--gray-2);color:var(--pb)}
.card p{font-size:14px;line-height:1.65}
.checks{display:grid;margin-top:4px}
.checks li{display:grid;grid-template-columns:14px 1fr;gap:8px;font-size:13.5px;color:var(--heading);font-weight:600;padding:9px 0;border-top:1px solid var(--border)}
.checks li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--yellow);margin-top:.6em}
.card-foot{margin-top:auto;padding-top:16px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}

/* Ansprechpartner */
.svc-layout{display:grid;grid-template-columns:1fr 340px;gap:56px;align-items:start}
.svc-layout>*{min-width:0}
@media (max-width:1000px){.svc-layout{grid-template-columns:1fr}}
.contact-card{border:1px solid var(--border);border-radius:8px;overflow:hidden;background:#fff;position:sticky;top:110px}
.voice-cover{height:150px;position:relative;display:flex;align-items:flex-end;background:linear-gradient(135deg,var(--navy) 0%,var(--navy-2) 100%);overflow:hidden}
.voice-cover.vc2{background:linear-gradient(135deg,var(--navy-2) 0%,var(--pb) 100%)}
.voice-cover.vc3{background:linear-gradient(135deg,var(--pb) 0%,#2d5f8d 100%)}
.voice-cover.vc4{background:linear-gradient(135deg,var(--navy-deep) 0%,var(--navy) 100%)}
.voice-initial{position:absolute;top:50%;left:50%;transform:translate(-50%,-58%);font-size:70px;font-weight:900;color:rgba(255,255,255,.12);letter-spacing:-.04em}
.voice-tag{position:absolute;top:16px;right:16px;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border-radius:50px}
.voice-person{position:relative;padding:18px 22px}
.voice-name{display:block;font-size:16px;font-weight:800;color:#fff}
.voice-role{font-size:11.5px;color:rgba(255,255,255,.7);font-weight:600;letter-spacing:.04em}
.voice-body{padding:24px 24px 26px;display:flex;flex-direction:column;gap:16px}
.quote{font-size:15px;font-style:italic;line-height:1.7;position:relative;padding-top:20px}
.quote::before{content:"\201C";position:absolute;top:-8px;left:0;font-size:54px;color:var(--yellow);line-height:.75;font-style:normal;font-weight:900;opacity:.55}
.certs{display:flex;gap:6px;flex-wrap:wrap;padding-top:16px;border-top:1px solid var(--border)}
.cert{padding:4px 10px;background:rgba(66,91,118,.08);border-radius:50px;font-size:10px;font-weight:800;color:var(--pb);letter-spacing:.1em;text-transform:uppercase}
.team-wall{display:grid;grid-template-columns:repeat(auto-fill,132px);gap:28px 24px;justify-content:start}
@media (max-width:480px){.team-wall{grid-template-columns:repeat(2,132px);justify-content:center}}
.team-wall figure{margin:0;display:grid;gap:10px;justify-items:center}
.team-wall img{width:132px;max-width:100%;height:164px;object-fit:cover;border-radius:6px;display:block;background:var(--gray-2)}
.team-wall figcaption{font-size:15px;font-weight:700;color:var(--heading);text-align:center;display:grid;gap:2px;max-width:132px}
.team-wall figcaption small{font-size:11.5px;font-weight:600;color:var(--muted);line-height:1.35}
.team-wall .more div{width:132px;height:164px;border-radius:6px;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:600;letter-spacing:-.02em}
.team-wall .more em{color:var(--yellow);font-style:normal;font-weight:300}
.voice-cover.has-photo{height:auto;display:grid;grid-template-columns:132px 1fr;align-items:end;gap:18px;padding:56px 22px 20px}
.voice-cover.has-photo img{display:block;width:132px;height:164px;object-fit:cover;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,.25)}
.voice-cover.has-photo .voice-person{padding:0 0 4px;min-width:0}
.voice-cover.has-photo .voice-tag{z-index:2}
.ph-box{width:132px;height:164px;border-radius:6px;border:1px dashed rgba(255,255,255,.35);background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;color:rgba(255,255,255,.35);letter-spacing:-.02em}
.contact-pick{display:flex;flex-direction:column;gap:14px}
.contact-pick{height:100%}
.contact-pick .voice-card{flex:1 1 auto}
.contact-pick .pick{justify-content:center;width:100%}
.map-card{display:grid;grid-template-columns:1.6fr 1fr;border:1px solid var(--border);border-radius:8px;overflow:hidden;background:#fff}
.map-card>*{min-width:0}
.map-svg{display:block;width:100%;height:100%;min-height:260px}
.map-info{display:flex;flex-direction:column;gap:6px;padding:32px 30px;justify-content:center;font-size:15px}
.map-info b{color:var(--heading);font-size:17px;margin-bottom:4px}
.map-info .btn{align-self:flex-start;margin:16px 0 6px}
@media (max-width:860px){.map-card{grid-template-columns:1fr}}
.skip-link{position:absolute;left:16px;top:-100px;background:var(--navy);color:#fff;padding:12px 20px;border-radius:5px;font-weight:700;z-index:2000}
.skip-link:focus{top:12px}
.modal{position:fixed;inset:0;z-index:3000;background:rgba(7,24,40,.6);display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
.modal[hidden]{display:none}
.modal-box{background:#fff;border-radius:10px;max-width:520px;width:100%;padding:32px 30px;position:relative;box-shadow:var(--sh-lg);max-height:100%;overflow:auto}
.modal-x{position:absolute;top:12px;right:14px;border:0;background:none;font-size:28px;line-height:1;color:var(--muted);cursor:pointer}
.testi{gap:18px}
.testi .quote{color:var(--body)}
.testi figcaption{margin-top:auto;padding-top:16px;border-top:1px solid var(--border);display:grid;gap:2px;font-size:13.5px}
.testi figcaption b{color:var(--heading);font-size:15px}
.faq-sec{padding-block:clamp(56px,8vw,96px)}
.faq{display:grid;gap:12px;max-width:860px}
.faq details{border:1px solid var(--border);border-radius:8px;background:#fff;padding:0 22px}
.faq summary{cursor:pointer;list-style:none;font-weight:700;color:var(--heading);font-size:16px;padding:18px 28px 18px 0;position:relative}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";position:absolute;right:0;top:14px;font-size:22px;font-weight:400;color:var(--pb)}
.faq details[open] summary::after{content:"\2212"}
.faq details p{padding:0 0 18px;font-size:15px;max-width:70ch}
.sales-note{display:grid;gap:2px;padding:18px 24px 22px;border-top:1px solid var(--border);background:var(--gray);font-size:13.5px}
.sales-note b{color:var(--heading);font-size:15px}
.sales-note .btn-link{margin-top:6px}
.voice-card{border:1px solid var(--border);border-radius:8px;overflow:hidden;background:#fff;transition:var(--tr)}
.voice-card:hover{transform:translateY(-6px);box-shadow:var(--sh-lg);border-color:transparent}

/* Sparring / Kultur-Kasten */
.panel-navy{background:linear-gradient(135deg,var(--navy) 0%,var(--navy-2) 100%);border-radius:12px;padding:clamp(36px,5vw,60px) clamp(28px,4vw,48px);color:var(--on-dark-2);position:relative;overflow:hidden}
.panel-navy::before{content:"";position:absolute;top:-90px;right:-90px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,192,0,.13),transparent 70%)}
.panel-navy h2,.panel-navy h3{color:#fff;position:relative}
.panel-navy .quote{color:var(--on-dark-2)}
.vals{display:grid;margin-top:26px;position:relative}
.val{display:grid;grid-template-columns:36px 1fr;gap:16px;align-items:start;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.1)}
.val:last-child{border-bottom:none}
.val .dot{width:36px;height:36px;border-radius:50%;background:rgba(255,192,0,.15);display:flex;align-items:center;justify-content:center;color:var(--yellow)}
.val b{color:#fff;display:block;font-size:15px}
.val span{font-size:14px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.two-col>*{min-width:0}
@media (max-width:1000px){.two-col{grid-template-columns:1fr;gap:44px}}

/* Kennzahlen hell */
.stats{display:grid;grid-template-columns:repeat(3,1fr)}
.stat{padding:8px 28px;border-left:1px solid rgba(255,255,255,.14)}
.stat:first-child{border-left:none;padding-left:0}
.stat b{display:block;font-size:clamp(44px,5vw,64px);font-weight:800;color:#fff;letter-spacing:-.04em;line-height:1;font-variant-numeric:tabular-nums}
.stat b em{color:var(--yellow);font-style:normal;font-weight:300}
.stat .fact-lbl{display:block;margin:14px 0 6px}
@media (max-width:700px){.stats{grid-template-columns:1fr;row-gap:28px}.stat{border-left:none;padding-left:0}}

/* Kundenlogos als Wortmarken */
.logo-wall{display:grid;grid-template-columns:repeat(6,1fr);border-top:1px solid var(--border);border-left:1px solid var(--border)}
.logo-wall div{border-right:1px solid var(--border);border-bottom:1px solid var(--border);min-height:96px;display:flex;align-items:center;justify-content:center;text-align:center;padding:12px;font-size:13px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--pb);background:#fff}
@media (max-width:1000px){.logo-wall{grid-template-columns:repeat(3,1fr)}}
@media (max-width:520px){.logo-wall{grid-template-columns:repeat(2,1fr)}}

/* Stellen */
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px}
.filters button{padding:10px 20px;border:1px solid var(--border);border-radius:50px;font-size:13px;font-weight:700;color:var(--body);background:#fff;cursor:pointer;transition:var(--tr)}
.filters button[aria-pressed="true"],.filters button:hover{background:var(--navy);border-color:var(--navy);color:#fff}
.jobs{border:1px solid var(--border);border-radius:8px;overflow:hidden;background:#fff}
.job{display:grid;grid-template-columns:1fr 150px 130px 44px;gap:24px;align-items:center;padding:26px 30px 26px 36px;border-top:1px solid var(--border);position:relative;transition:var(--tr)}
.job:first-child{border-top:none}
.job::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--yellow);transform:scaleY(0);transform-origin:top;transition:transform .35s}
.job:hover{background:var(--gray)}
.job:hover::before{transform:scaleY(1)}
.job-cat{font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--pb);display:block;margin-bottom:5px}
.job-title{font-size:19px;font-weight:800;color:var(--heading);letter-spacing:-.015em;line-height:1.2}
.meta-lbl{display:block;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.meta-val{font-size:14px;font-weight:700;color:var(--heading)}
.job-arr{width:44px;height:44px;border-radius:50%;background:#eef3f9;display:flex;align-items:center;justify-content:center;color:var(--pb);transition:var(--tr)}
.job:hover .job-arr{background:var(--yellow);color:var(--navy)}
@media (max-width:760px){.job{grid-template-columns:1fr auto;padding:22px 20px 22px 24px}.job .m2{display:none}.job .m1{display:none}}

/* Prozess */
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative;margin-top:16px}
.steps::before{content:"";position:absolute;top:32px;left:12.5%;right:12.5%;height:1px;background:rgba(255,255,255,.15)}
.step{text-align:center;padding:0 16px;position:relative}
.step-num{width:64px;height:64px;border-radius:50%;background:var(--navy);border:1px solid rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:var(--yellow);margin:0 auto 22px;transition:var(--tr);position:relative}
.step:hover .step-num{background:var(--yellow);color:var(--navy);border-color:var(--yellow)}
.step h4{color:#fff;margin-bottom:8px;font-size:16px}
.step p{font-size:13.5px;color:rgba(255,255,255,.68);line-height:1.6}
@media (max-width:900px){.steps{grid-template-columns:1fr 1fr;row-gap:40px}.steps::before{display:none}}
@media (max-width:520px){.steps{grid-template-columns:1fr}}

/* Insights */
.post{background:#fff;border:1px solid var(--border);border-radius:8px;overflow:hidden;display:flex;flex-direction:column;transition:var(--tr)}
.post:hover{transform:translateY(-6px);box-shadow:var(--sh-lg);border-color:transparent}
.post-cover{height:150px;background:linear-gradient(135deg,var(--navy) 0%,var(--navy-2) 100%);position:relative;display:flex;align-items:flex-end;padding:18px 22px}
.post-cover.c2{background:linear-gradient(135deg,var(--navy-2) 0%,var(--pb) 100%)}
.post-cover.c3{background:linear-gradient(135deg,var(--navy-deep) 0%,var(--navy) 100%)}
.post-cover span{font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--navy);background:var(--yellow);padding:6px 12px;border-radius:50px}
.post-body{padding:26px 26px 28px;display:flex;flex-direction:column;gap:12px;flex:1}
.post-body time{font-size:12px;font-weight:700;color:var(--muted);letter-spacing:.06em}
.post-body h3{font-size:19px}
.post-body p{font-size:14px}
.post-body .btn-link{margin-top:auto;padding-top:8px}

/* Zertifikate */
.cert-card{border:1px solid var(--border);border-radius:8px;padding:26px 24px;background:#fff;display:flex;flex-direction:column;gap:8px;border-top:3px solid var(--yellow)}
.cert-card b{font-size:22px;font-weight:800;color:var(--navy);letter-spacing:-.02em}
.cert-card span{font-size:13.5px}

/* Kontakt */
form.contact{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.field{display:grid;gap:6px}
.field.full{grid-column:1/-1}
.field label{font-size:13px;font-weight:700;color:var(--heading)}
.field input,.field select,.field textarea{font:inherit;font-size:15px;color:var(--heading);padding:13px 14px;border:1px solid #cfd6df;border-radius:5px;background:#fff;width:100%}
.field textarea{min-height:140px;resize:vertical}
.note{font-size:12.5px;color:var(--muted)}
.ok{grid-column:1/-1;border-left:3px solid var(--yellow);background:var(--gray);padding:14px 16px;color:var(--heading);font-weight:600}
@media (max-width:640px){form.contact{grid-template-columns:1fr}}
.office{display:grid;gap:14px}
.office .row{display:grid;grid-template-columns:110px 1fr;gap:12px;font-size:14.5px;padding:12px 0;border-bottom:1px solid var(--border)}
.office .row span:first-child{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding-top:3px}
.office .row span:last-child{color:var(--heading);font-weight:600}

/* CTA */
.cta-sec{background:linear-gradient(140deg,var(--navy-deep) 0%,var(--navy) 50%,#1a4f80 100%);color:var(--on-dark-2);position:relative;overflow:hidden;isolation:isolate}
.cta-sec::before{content:"";position:absolute;top:-200px;right:-120px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(255,192,0,.1),transparent 60%);z-index:-1}
.cta-in{display:grid;grid-template-columns:1.2fr 1fr;gap:72px;align-items:center}
.cta-in>*{min-width:0}
.cta-in h2{color:#fff;margin-bottom:18px}
.cta-trust{display:flex;gap:22px;flex-wrap:wrap;margin-top:28px}
.cta-trust span{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:rgba(255,255,255,.72)}
.cta-trust svg{color:var(--yellow);width:14px;height:14px}
.cta-r{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.cta-contact{margin-top:18px;padding-top:24px;border-top:1px solid rgba(255,255,255,.12);display:grid;gap:12px;font-size:14px;color:rgba(255,255,255,.75);width:100%}
.cta-contact span{display:flex;align-items:center;gap:12px}
.cta-contact svg{color:var(--yellow);flex:none}
.cta-main{width:100%;max-width:300px;justify-content:center;padding-block:20px}
.btn-outline-y{background:transparent;color:var(--yellow);border-color:var(--yellow)}
@media (max-width:1000px){.cta-in{grid-template-columns:1fr;gap:40px}}

/* Footer */
footer{background:#0a1828;color:rgba(255,255,255,.55);padding-block:64px 28px}
.ft-grid{display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:40px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.08)}
.ft-grid>*{min-width:0}
.ft-grid h4{color:#fff;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;margin-bottom:16px}
.ft-grid ul{display:grid;gap:8px;font-size:14px}
.ft-grid a:hover{color:#fff}
footer .logo{color:#fff}
.ft-bot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:22px;font-size:12.5px;color:rgba(255,255,255,.35)}
@media (max-width:900px){.ft-grid{grid-template-columns:1fr 1fr}}
@media (max-width:520px){.ft-grid{grid-template-columns:1fr}}

@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition:none!important;animation:none!important}}

</style>
<div class="cyspa">
<nav id="nav" aria-label="Hauptnavigation">
  <div class="con nav-wrap">
    <a href="/" class="logo" aria-label="CYSPA Startseite"><img class="logo-img" src="https://cyspa.ch/hubfs/website-2026/cyspa-logo.png" alt="CYSPA Cyber Security Partners" width="120" height="50"></a>
    <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="nav-links">Menü</button>
    <div class="nav-links" id="nav-links"><div class="nav-item"><a href="/dienstleistungen" data-g="svc" aria-current="false">Dienstleistungen <span class="caret">▾</span></a><div class="drop"><a href="/dienstleistungen/ciso-as-a-service">CISO as a Service</a><a href="/dienstleistungen/security-consulting">Security Consulting</a><a href="/dienstleistungen/security-testing">Security Testing</a><a href="/dienstleistungen/security-audit">Audits und Assessments</a><a href="/dienstleistungen/security-awareness">Security Awareness</a><a href="/dienstleistungen/architecture-engineering">Architecture und Engineering</a></div></div><div class="nav-item"><a href="/ueber-uns" data-g="about" aria-current="false">Über uns <span class="caret">▾</span></a><div class="drop"><a href="/unternehmen">Unternehmen</a><a href="/unternehmen/portraet">Porträt: Zahlen und Fakten</a><a href="/unternehmen/team">Team</a><a href="/unternehmen/mission-vision-purpose">Mission, Vision und Purpose</a><a href="/unternehmen/referenzen">Referenzen</a><a href="/unternehmen/zertifizierungen">Zertifizierungen</a><a href="/unternehmen/partner">Partner</a></div></div><div class="nav-item"><a href="/sparringpartner" data-g="spar" aria-current="false">Sparring <span class="caret">▾</span></a><div class="drop"><a href="/sparringpartner">Sparringpartner</a><a href="/basic-check">Cyber Security Check</a></div></div><div class="nav-item"><a href="/karriere" data-g="karriere" aria-current="false">Karriere</a></div><div class="nav-item"><a href="/insights" data-g="ins" aria-current="false">Insights <span class="caret">▾</span></a><div class="drop"><a href="/insights/aktuelles">Aktuelles</a><a href="/insights/blog">Blog</a><a href="/insights/events">Events</a><a href="/insights/whitepaper">Whitepaper und Unterlagen</a></div></div><div class="nav-item"><a href="/kontakt" data-g="kontakt" aria-current="false">Kontakt</a></div><a href="/basic-check" class="btn nav-cta mob">Kostenloser Basic Check</a></div>
    <a href="/basic-check" class="btn nav-cta desk">Kostenloser Basic Check</a>
  </div>
</nav>
<main id="app">

<section class="hero" style="padding-bottom:0"><div class="con hero-inner" style="padding-bottom:clamp(64px,8vw,104px)">
  <div><div class="badge">Cyber Security Partners, Rotkreuz</div>
  <h1 class="display">Cyber Security auf <em class="y">Schweizer Niveau</em>.</h1>
  <p class="hero-sub">Unabhängige Cyber Security Beratung, Penetration Tests und CISO as a Service für Schweizer Unternehmen, aus Rotkreuz im Kanton Zug. Wir unterstützen Sie dabei, Cyberrisiken frühzeitig zu erkennen, wirksame Schutzmassnahmen umzusetzen und ihre Reaktionsfähigkeit bei Sicherheitsvorfällen systematisch zu stärken.</p>
  <div class="hero-btns"><a href="/basic-check" class="btn">Kostenlosen Basic Check starten <svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></a><a href="/dienstleistungen" class="btn-ghost">Dienstleistungen entdecken</a></div></div>
  <div class="facts">
   <div class="fact"><span class="fact-num">100<em>+</em></span><span class="fact-lbl">Kunden in der Schweiz</span><p class="fact-sub">Von kritischen Infrastrukturen bis zum dynamischen KMU.</p></div>
   <div class="facts-row"><div class="fact"><span class="fact-num">100<em>%</em></span><span class="fact-lbl">Unabhängig</span><p class="fact-sub">Kein Hersteller, kein Produktdruck.</p></div><div class="fact"><span class="fact-num">125<em>+</em></span><span class="fact-lbl">Jahre Erfahrung</span><p class="fact-sub">Kombiniert im Team mehr als 125 Jahre Erfahrung.</p></div></div>
  </div>
</div><div class="ticker" aria-label="Kunden"><div class="ticker-track"><span>Swissgrid</span><i></i><span>AMAG</span><i></i><span>Switzerland Global Enterprise</span><i></i><span>Energie 360°</span><i></i><span>soxes</span><i></i><span>Zug Estates</span><i></i><span>FS Partners</span><i></i><span>Schoop + Co.</span><i></i><span>HIAG</span><i></i><span>Arthur Weber</span><i></i><span>oxygen at Work</span><i></i><span>Fredy's</span><i></i><span>Penergetic</span><i></i><span>CSE</span><i></i><span>Swissgrid</span><i></i><span>AMAG</span><i></i><span>Switzerland Global Enterprise</span><i></i><span>Energie 360°</span><i></i><span>soxes</span><i></i><span>Zug Estates</span><i></i><span>FS Partners</span><i></i><span>Schoop + Co.</span><i></i><span>HIAG</span><i></i><span>Arthur Weber</span><i></i><span>oxygen at Work</span><i></i><span>Fredy's</span><i></i><span>Penergetic</span><i></i><span>CSE</span><i></i></div></div></section>

<section><div class="con"><span class="sec-lbl">Über CYSPA</span>
 <p class="big-statement">Über 100 Kunden in der Schweiz vertrauen auf CYSPA. <b>Wir verbinden strategische Beratung, technische Prüfungen, Audits, Awareness und operative Unterstützung zu einem Sicherheitsansatz, der zu Ihrer Organisation passt.</b></p>
 <div class="split3" style="margin-top:56px">
  <div><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"></circle><path d="M7.5 12l3 3 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><h4>100 % Unabhängig</h4><p>Kein Produkt, kein Hersteller beeinflusst unsere Empfehlungen. Einzig Ihre Sicherheit bestimmt unsere Entscheidungen.</p></div>
  <div><span class="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5l8 4v6.5c0 4-3.2 7-8 8.5-4.8-1.5-8-4.5-8-8.5V6.5l8-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg></span><h4>Schweizer Expertise</h4><p>Gegründet in Rotkreuz, Kanton Zug. nDSG, FINMA und alle regulatorischen Anforderungen aus der täglichen Praxis.</p></div>
  <div><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.8"></circle><path d="M3 21c0-4 4-7 9-7s9 3 9 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></span><h4>Senior Experten Pool</h4><p>Kombiniert im Team mehr als 125 Jahre Erfahrung. Erfahrene Consultants und zertifizierte Penetration Tester betreuen Ihre Mandate persönlich.</p></div>
 </div></div></section>

<section class="bg-gray"><div class="con"><div class="head-split"><div><span class="sec-lbl">Dienstleistungen</span><h2>Prävention und Resilienz aus einer Hand.</h2></div><p class="lede">Unsere Leistungen sind auf drei strategische Ziele ausgerichtet: Risiken erkennen, Schutzmassnahmen umsetzen, Widerstandsfähigkeit stärken.</p></div>
 <div class="grid3"><a class="card" href="/dienstleistungen/ciso-as-a-service"><div class="card-top"><span class="card-num">01</span><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.8"></circle><path d="M3 21c0-4 4-7 9-7s9 3 9 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></span></div><span class="pill">Strategisch, Operativ</span><h3>CISO as a Service</h3><p>Externe Übernahme der CISO-Funktion auf Mandatsbasis.</p><ul class="checks"><li>Strategische Sicherheitsberatung</li><li>Risiko- und Compliance-Management</li><li>Interims-CISO-Mandat</li></ul><div class="card-foot"><span class="btn-link">Mehr erfahren</span><svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a class="card" href="/dienstleistungen/security-consulting"><div class="card-top"><span class="card-num">02</span><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"></circle><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"></circle><circle cx="12" cy="12" r="1" fill="currentColor"></circle></svg></span></div><span class="pill">Strategie, Compliance</span><h3>Security Consulting</h3><p>Strategische Beratung für Sicherheitsstrategie, Richtlinien und Vorgaben, Compliance- und Risk-Management sowie Datenschutz und Privacy.</p><ul class="checks"><li>Strategie, Richtlinien und Vorgaben</li><li>Compliance und Risk-Management</li><li>Datenschutz und Privacy</li><li>Lieferanten- und Drittparteienprüfungen</li></ul><div class="card-foot"><span class="btn-link">Mehr erfahren</span><svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a class="card" href="/dienstleistungen/security-testing"><div class="card-top"><span class="card-num">03</span><span class="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5l8 4v6.5c0 4-3.2 7-8 8.5-4.8-1.5-8-4.5-8-8.5V6.5l8-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg></span></div><span class="pill">Offensiv, Technisch</span><h3>Security Testing</h3><p>Wir prüfen Ihre Systeme mit den Methoden echter Angreifer.</p><ul class="checks"><li>Penetration Testing</li><li>Phishing und Social Engineering</li><li>Cloud Security Testing</li><li>Schwachstellenanalysen</li></ul><div class="card-foot"><span class="btn-link">Mehr erfahren</span><svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a class="card" href="/dienstleistungen/security-audit"><div class="card-top"><span class="card-num">04</span><span class="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M6 3h8l4 4v14H6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M9 12h6M9 16h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></span></div><span class="pill">Normkonform, Zertifiziert</span><h3>Audits und Assessments</h3><p>Unabhängige Prüfungen nach anerkannten Standards, von ISO 27001 bis NIST und FINMA.</p><ul class="checks"><li>ISO 27001 Audit</li><li>FINMA-Compliance-Audit</li><li>Cyber Security Assessment</li><li>IKT-Revision</li></ul><div class="card-foot"><span class="btn-link">Mehr erfahren</span><svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a class="card" href="/dienstleistungen/security-awareness"><div class="card-top"><span class="card-num">05</span><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"></circle><circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"></circle><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M15 14.5c3 0 6.5 1.5 6.5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></span></div><span class="pill">Mensch, Kultur, Verhalten</span><h3>Security Awareness</h3><p>Menschen sind die stärkste und gleichzeitig schwächste Sicherheitsschicht.</p><ul class="checks"><li>Phishing-Simulationen</li><li>Awareness-Trainings</li><li>Security Culture Assessment</li></ul><div class="card-foot"><span class="btn-link">Mehr erfahren</span><svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a class="card" href="/dienstleistungen/architecture-engineering"><div class="card-top"><span class="card-num">06</span><span class="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M3 13l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg></span></div><span class="pill">Technisch, Operativ</span><h3>Architecture und Engineering</h3><p>Wir helfen Ihnen, eine robuste und zukunftsfähige Sicherheitsarchitektur aufzubauen, von der Strategie bis zur Implementierung.</p><ul class="checks"><li>Zero Trust Architecture</li><li>Netzwerksicherheit</li><li>Identity und Access Management</li><li>SIEM und Security Monitoring</li></ul><div class="card-foot"><span class="btn-link">Mehr erfahren</span><svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a></div></div></section>

<section><div class="con two-col">
 <div><span class="sec-lbl">Sparringpartner</span><h2>Strategische Sicherheitsberatung auf Augenhöhe.</h2><p class="lede" style="margin-top:22px">Als unabhängiger Sparringpartner unterstützen wir Geschäftsleitungen und Verwaltungsräte bei strategischen Entscheidungen zur Cybersicherheit. Ohne Interessenkonflikt, ohne Produktabhängigkeiten, ohne verdeckte Agenda.</p>
  <div style="margin-top:32px"><a href="/basic-check" class="btn">Kostenlosen Basic Check starten <svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></div></div>
 <div class="panel-navy"><p class="quote">Die Zusammenarbeit mit CYSPA war von Anfang an ein Gewinn für die soxes. Durch die individuelle Beratung konnten wir eine erfolgreiche Cybersecurity-Strategie entwickeln, die genau auf unsere Bedürfnisse zugeschnitten ist. Die Zusammenarbeit erfolgt stets auf Augenhöhe und fördert einen produktiven Austausch.</p><p style="margin-top:14px;font-size:13px;font-weight:700;color:#fff">Patrick Büchler, CEO, soxes AG</p>
  <div class="vals"><div class="val"><span class="dot"><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><div><b>Unabhängige Sicherheitsbeurteilung</b><span>Ehrliche Standortbestimmung ohne kommerziellen Bias.</span></div></div><div class="val"><span class="dot"><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><div><b>VR- und GL-Beratung</b><span>Sicherheitslagen verständlich erklären und entscheidungsreif aufbereiten.</span></div></div><div class="val"><span class="dot"><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><div><b>Persönliche Senior-Expertise</b><span>Sie arbeiten direkt mit erfahrenen Beraterinnen und Beratern.</span></div></div><div class="val"><span class="dot"><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><div><b>Kostenloser Basic Check</b><span>Erste Einschätzung Ihrer Sicherheitslage, ohne Kosten und ohne Verpflichtung.</span></div></div></div></div>
</div></section>

<section class="bg-navy"><div class="con"><span class="sec-lbl">Porträt</span><h2 style="margin-bottom:48px">CYSPA in Zahlen.</h2><div class="stats"><div class="stat"><b>100<em>+</em></b><span class="fact-lbl">Kunden</span><span>in der Schweiz</span></div><div class="stat"><b>100<em>%</em></b><span class="fact-lbl">Unabhängig</span><span>keine Hersteller- oder Produktbindung</span></div><div class="stat"><b>125<em>+</em></b><span class="fact-lbl">Jahre Erfahrung</span><span>kombiniert im Team, mehr als 125 Jahre</span></div></div></div></section>

<section><div class="con"><div class="head-split"><div><span class="sec-lbl">Referenzkunden</span><h2>Über 100 Kunden vertrauen auf CYSPA.</h2></div><p class="lede">Von kritischer Infrastruktur über Industrie und Immobilien bis zu Dienstleistern, quer durch alle Branchen und Unternehmensgrössen.</p></div><div class="logo-wall"><div>Swissgrid</div><div>AMAG</div><div>Switzerland Global Enterprise</div><div>Energie 360°</div><div>soxes</div><div>Zug Estates</div><div>FS Partners</div><div>Schoop + Co.</div><div>HIAG</div><div>Arthur Weber</div><div>oxygen at Work</div><div>Fredy's</div></div><div style="margin-top:32px"><a href="/unternehmen/referenzen" class="btn btn-outline">Alle Referenzen</a></div></div></section>

<section class="bg-gray"><div class="con"><div class="head-split"><div><span class="sec-lbl">Kundenstimmen</span><h2>Was unsere Kunden über CYSPA sagen.</h2></div></div><div class="grid3"><figure class="card testi"><p class="quote">Die Zusammenarbeit mit CYSPA war von Anfang an ein Gewinn für die soxes. Durch die individuelle Beratung konnten wir eine erfolgreiche Cybersecurity-Strategie entwickeln, die genau auf unsere Bedürfnisse zugeschnitten ist. Die Zusammenarbeit erfolgt stets auf Augenhöhe und fördert einen produktiven Austausch.</p><figcaption><b>Patrick Büchler</b><span>CEO, soxes AG</span></figcaption></figure><figure class="card testi"><p class="quote">CYSPA hat uns höchst professionell beraten und bei diversen Projekten im Risk Management und Endpoint-Security Bereich unterstützt. Das pragmatische und dennoch hochqualitative Vorgehen hat uns überzeugt.</p><figcaption><b>Fabian Fisecker</b><span>Senior Cyber Security Specialist, Swissgrid AG</span></figcaption></figure><figure class="card testi"><p class="quote">Wir haben mit der Firma CYSPA einen Pentest durchgeführt. Die Zusammenarbeit war von der Planung über die Umsetzung bis hin zum Abschlussbericht sehr professionell und absolut zufriedenstellend. Wir haben eine exzellente Unterstützung für die Verbesserung unserer Sicherheitsmassnahmen erhalten und würden jederzeit wieder mit CYSPA zusammenarbeiten.</p><figcaption><b>Laura Birlibescu</b><span>Projektmanagement Gruppenleitung und IT, Schoop + Co. AG</span></figcaption></figure></div></div></section>

<section><div class="con"><div class="head-split"><div><span class="sec-lbl">Warum CYSPA</span><h2>Was uns von anderen unterscheidet.</h2></div><p class="lede">Sechs Prinzipien, die jede unserer Entscheidungen leiten.</p></div><div class="grid3"><div class="card hov"><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"></circle><path d="M7.5 12l3 3 6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="card-num">01</span></div><h4>Unabhängigkeit</h4><p>Keine Produkte, kein Hersteller, keine versteckten Incentives. Unsere Empfehlungen richten sich ausschliesslich nach Ihren Sicherheitsbedürfnissen.</p></div><div class="card hov"><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.8"></circle><path d="M3 21c0-4 4-7 9-7s9 3 9 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></span><span class="card-num">02</span></div><h4>Erfahrung, die zählt</h4><p>Ihre Mandate betreuen erfahrene Expertinnen und Experten persönlich. So haben Sie direkten Zugang zu fundiertem Know-how.</p></div><div class="card hov"><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5l8 4v6.5c0 4-3.2 7-8 8.5-4.8-1.5-8-4.5-8-8.5V6.5l8-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg></span><span class="card-num">03</span></div><h4>Schweizer Kontext</h4><p>nDSG, FINMA, kantonale Regulierungen. Wir kennen den Schweizer Rechts- und Geschäftskontext aus der täglichen Praxis.</p></div><div class="card hov"><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M3 13l9 5 9-5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg></span><span class="card-num">04</span></div><h4>Ganzheitlich</h4><p>Prävention, Detektion, Reaktion und Compliance aus einer Hand. Keine isolierten Massnahmen, sondern ein kohärenter Sicherheitsansatz.</p></div><div class="card hov"><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"></circle><circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"></circle><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M15 14.5c3 0 6.5 1.5 6.5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg></span><span class="card-num">05</span></div><h4>Nachhaltig</h4><p>Wir befähigen Ihre Organisation, statt sie abhängig zu machen. Wissenstransfer und Kompetenzaufbau gehören zu jedem Mandat.</p></div><div class="card hov"><div class="card-top"><span class="ico"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"></circle><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"></circle><circle cx="12" cy="12" r="1" fill="currentColor"></circle></svg></span><span class="card-num">06</span></div><h4>Resultatorientiert</h4><p>Klare Deliverables, nachvollziehbare Massnahmen und eine Wirkung, die sich überprüfen lässt. Unternehmerisches Handeln statt Berater-Denken.</p></div></div></div></section>

<section class="bg-gray"><div class="con"><div class="head-split"><div><span class="sec-lbl">Insights</span><h2>Wissen, das wirkt.</h2></div><p class="lede">Aktuelle Beiträge, praxisnahe Erkenntnisse und Branchentrends aus der Feder unserer Experten.</p></div><div class="grid3"><a class="post" href="/insights/blog"><div class="post-cover "><span>Blog</span></div><div class="post-body"><time>15. September 2026</time><h3>Ransomware 2026: Neue Angriffswellen gegen Schweizer KMU</h3><p>Wie sich die Angriffsmuster entwickelt haben, warum klassische Backups nicht mehr reichen und was Schweizer Unternehmen jetzt tun müssen.</p><span class="btn-link">Artikel lesen</span></div></a><a class="post" href="/insights/aktuelles"><div class="post-cover c2"><span>Aktuelles</span></div><div class="post-body"><time>Oktober 2026</time><h3>nDSG: Was gilt seit dem 1. September 2023 wirklich?</h3><p>Drei Jahre nach Inkrafttreten ein pragmatischer Überblick: was wirklich gilt, was oft falsch gemacht wird und wie CYSPA unterstützt.</p><span class="btn-link">Mehr erfahren</span></div></a><a class="post" href="/insights/events"><div class="post-cover c3"><span>Event</span></div><div class="post-body"><time>November 2026</time><h3>CYSPA Roundtable: Cyber Resilience 2027</h3><p>Exklusiver Austausch für CISOs und Security-Verantwortliche über die grössten Herausforderungen im kommenden Jahr.</p><span class="btn-link">Platz reservieren</span></div></a></div><div style="margin-top:32px"><a href="/insights" class="btn btn-outline">Alle Beiträge lesen</a></div></div></section><section class="faq-sec"><div class="con"><div class="head-split"><div><span class="sec-lbl">Häufige Fragen</span><h2>Antworten auf einen Blick.</h2></div></div><div class="faq"><details><summary>Was macht CYSPA?</summary><p>CYSPA Cyber Security Partners GmbH ist ein lösungs- und herstellerunabhängiges Cyber Security Beratungsunternehmen mit Sitz in Rotkreuz, Kanton Zug. Wir unterstützen Schweizer Unternehmen mit CISO as a Service, Security Consulting, Penetration Tests, Audits und Security Awareness.</p></details><details><summary>Für welche Unternehmen arbeitet CYSPA?</summary><p>Für KMU, grössere Unternehmen und Betreiber kritischer Infrastrukturen in der ganzen Schweiz, zum Beispiel aus Energie, Industrie, Immobilien und Dienstleistung.</p></details><details><summary>Was ist der kostenlose IT Security Basic Check?</summary><p>Ein unverbindliches Erstgespräch von 60 Minuten mit einem Senior Experten. Sie erhalten eine ehrliche Einschätzung Ihrer Sicherheitslage und die wichtigsten nächsten Schritte.</p></details><details><summary>Ist CYSPA an Hersteller gebunden?</summary><p>Nein. CYSPA verkauft keine Produkte und erhält keine Provisionen von Herstellern. Unsere Empfehlungen richten sich ausschliesslich nach Ihrem Risiko.</p></details></div></div></section>
</main>
<section class="cta-sec" id="cta">
  <div class="con cta-in">
    <div>
      <span class="sec-lbl">Jetzt handeln</span>
      <h2>Wie sicher ist Ihr Unternehmen wirklich?</h2>
      <p class="lede">Unser kostenloser IT Security Basic Check gibt Ihnen in 60 Minuten eine erste Einschätzung Ihrer aktuellen Sicherheitslage, ohne Verpflichtungen, ohne Vendor Pitch.</p>
      <div class="cta-trust" id="cta-trust"><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>60 Minuten Erstgespräch</span><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>Kostenlos und unverbindlich</span><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>Senior Experte direkt</span><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>Vertraulicher Umgang mit Ihren Daten</span></div>
    </div>
    <div class="cta-r">
      <a href="/basic-check" class="btn cta-main">Kostenloser Basic Check <svg class="arr" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
      <a href="/kontakt" class="btn btn-outline-y cta-main">Beratungsgespräch anfragen</a>
      <div class="cta-contact"><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true"><path d="M3.5 2.5h2.2l1 3-1.5 1c.8 1.7 2 2.9 3.8 3.8l1-1.5 3 1v2.2c0 .6-.5 1-1 1C6.8 13 3 9.2 2.5 3.5c0-.5.4-1 1-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>+41 41 521 61 61</span><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true"><rect x="2" y="3.5" width="12" height="9" rx="1.2" stroke="currentColor" stroke-width="1.3"></rect><path d="M2.5 4.5L8 9l5.5-4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path></svg>info@cyspa.ch</span><span><svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true"><path d="M2.5 7.5L8 3l5.5 4.5V13H2.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>Erlenstrasse 4B, CH-6343 Rotkreuz</span></div>
    </div>
  </div>
</section>
<footer>
  <div class="con">
    <div class="ft-grid" id="ft-grid"><div><a href="/" class="logo" aria-label="CYSPA Startseite"><img class="logo-img on-dark" src="https://cyspa.ch/hubfs/website-2026/cyspa-logo.png" alt="CYSPA Cyber Security Partners" width="120" height="50"></a><p style="margin-top:16px;max-width:30ch">Cyber Security Partners GmbH. Ihr unabhängiger Schweizer Cybersecurity-Experte.</p><p style="margin-top:14px">info@cyspa.ch<br>+41 41 521 61 61</p><p style="margin-top:14px"><a href="https://www.linkedin.com/company/cyspa/" target="_blank" rel="noopener" style="color:#fff;font-weight:700">LinkedIn</a></p></div><div><h4>Dienstleistungen</h4><ul><li><a href="/dienstleistungen/ciso-as-a-service">CISO as a Service</a></li><li><a href="/dienstleistungen/security-consulting">Security Consulting</a></li><li><a href="/dienstleistungen/security-testing">Security Testing</a></li><li><a href="/dienstleistungen/security-audit">Audits und Assessments</a></li><li><a href="/dienstleistungen/security-awareness">Security Awareness</a></li><li><a href="/dienstleistungen/architecture-engineering">Architecture und Engineering</a></li></ul></div><div><h4>Über uns</h4><ul><li><a href="/unternehmen">Unternehmen</a></li><li><a href="/unternehmen/portraet">Porträt: Zahlen und Fakten</a></li><li><a href="/unternehmen/team">Team</a></li><li><a href="/unternehmen/mission-vision-purpose">Mission, Vision und Purpose</a></li><li><a href="/unternehmen/referenzen">Referenzen</a></li><li><a href="/unternehmen/zertifizierungen">Zertifizierungen</a></li><li><a href="/unternehmen/partner">Partner</a></li></ul></div><div><h4>Insights und Kontakt</h4><ul><li><a href="/insights/aktuelles">Aktuelles</a></li><li><a href="/insights/blog">Blog</a></li><li><a href="/insights/events">Events</a></li><li><a href="/insights/whitepaper">Whitepaper und Unterlagen</a></li><li><a href="/sparringpartner">Sparringpartner</a></li><li><a href="/basic-check">Cyber Security Check</a></li><li><a href="/karriere">Karriere</a></li><li><a href="/kontakt">Kontakt</a></li></ul></div></div>
    <div class="ft-bot"><span>© 2026 CYSPA Cyber Security Partners GmbH, Erlenstrasse 4B, 6343 Rotkreuz ZG</span><span>Datenschutz  Impressum</span></div>
  </div>
</footer>
</div>
<script>
/* CYSPA Website: kleine Interaktionen für HubSpot (in Einstellungen > Website > Seiten > Footer-HTML oder im Template einbinden) */
document.addEventListener("DOMContentLoaded",function(){
  // Mobiles Menü
  var btn=document.getElementById("menu-btn"),nav=document.getElementById("nav-links");
  if(btn&&nav){btn.addEventListener("click",function(){var o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(o));});}
  // Stellenfilter (Karriere)
  var fb=document.querySelectorAll(".filters button");
  fb.forEach(function(b){b.addEventListener("click",function(){
    fb.forEach(function(x){x.setAttribute("aria-pressed",String(x===b));});
    var f=b.getAttribute("data-filter");
    document.querySelectorAll(".job").forEach(function(j){j.hidden=!(f==="all"||j.getAttribute("data-dept")===f);});
  });});
});

</script>
```
