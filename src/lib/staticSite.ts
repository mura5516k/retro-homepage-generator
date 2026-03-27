import type { GeneratedSite } from '../types/site';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function nav() {
  return `
    <div class="retro-nav">
      <a href="index.html">TOP</a>
      <a href="profile.html">PROFILE</a>
      <a href="bbs.html">BBS</a>
      <a href="link.html">LINK</a>
      <a href="diary.html">DIARY</a>
    </div>
  `;
}

function layout(title: string, site: GeneratedSite, body: string) {
  const { config } = site;
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} - ${escapeHtml(config.siteTitle)}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="pattern-${config.backgroundPattern}">
  <div class="page-shell">
    <div class="page-title">
      <div class="sparkle">WELCOME</div>
      <h1>${escapeHtml(config.siteTitle)}</h1>
      <p>${escapeHtml(site.catchCopy)}</p>
    </div>
    ${nav()}
    ${body}
    <div class="page-footer">${escapeHtml(site.footerLine)}</div>
  </div>
  <script src="script.js"></script>
</body>
</html>`;
}

function topPage(site: GeneratedSite) {
  const { config } = site;
  return layout(
    'TOP',
    site,
    `
    <div class="top-banner">
      <img src="assets/banners/heisei-banner.png" alt="平成ホームページメーカー" />
    </div>
    <div class="two-column">
      <div class="main-panel">
        <div class="box">
          <div class="box-title">TOP</div>
          <p>${escapeHtml(config.intro)}</p>
          <p>${escapeHtml(site.welcomeLine)}</p>
          ${config.showCounter ? `<p><strong>あなたは ${escapeHtml(site.counterValue)} 人目のお客様です</strong></p>` : ''}
          ${config.showKiriban ? `<p>キリ番: ${site.kiriban.map(escapeHtml).join(' / ')} を踏んだ方はBBSへどうぞ♪</p>` : ''}
        </div>
        ${config.showHistory ? `
        <div class="box">
          <div class="box-title">UPDATE</div>
          <ul>${site.updates.map((item) => `<li>${escapeHtml(item.date)} ${escapeHtml(item.text)}</li>`).join('')}</ul>
        </div>` : ''}
        ${config.showBbs ? `
        <div class="box">
          <div class="box-title">BBS</div>
          ${site.bbsPosts.map((post) => `<p><strong>${escapeHtml(post.name)}</strong> : ${escapeHtml(post.message)}<br /><span class="meta">${escapeHtml(post.date)}</span></p>`).join('')}
        </div>` : ''}
      </div>
      <div class="side-panel">
        <div class="box">
          <div class="box-title">PROFILE</div>
          <p>管理人: ${escapeHtml(config.managerName)}</p>
          <p>${escapeHtml(config.profileBlurb)}</p>
        </div>
        ${config.showLinks ? `
        <div class="box">
          <div class="box-title">LINK</div>
          <ul>${site.links.map((link) => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.title)}</a></li>`).join('')}</ul>
        </div>` : ''}
        <div class="box">
          <div class="box-title">BANNER</div>
          <div class="banner-stack">${site.banners.map((text) => `<div class="mini-banner">${escapeHtml(text)}</div>`).join('')}</div>
        </div>
        ${config.showUnderConstruction ? `
        <div class="box center">
          <img src="assets/construction.svg" alt="工事中" class="construction-mark" />
        </div>` : ''}
      </div>
    </div>`,
  );
}

function profilePage(site: GeneratedSite) {
  const { config } = site;
  return layout(
    'PROFILE',
    site,
    `<div class="box">
      <div class="box-title">PROFILE</div>
      <p>管理人: ${escapeHtml(config.managerName)}</p>
      <p>${escapeHtml(config.intro)}</p>
      <ul>${site.profileItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    </div>`,
  );
}

function bbsPage(site: GeneratedSite) {
  return layout(
    'BBS',
    site,
    `<div class="box">
      <div class="box-title">BBS</div>
      <p>掲示板は仮設置です。お気軽に足あとどうぞ♪</p>
      ${site.bbsPosts.map((post) => `<div class="bbs-post"><strong>${escapeHtml(post.name)}</strong><span class="meta">${escapeHtml(post.date)}</span><p>${escapeHtml(post.message)}</p></div>`).join('')}
    </div>`,
  );
}

function linksPage(site: GeneratedSite) {
  return layout(
    'LINK',
    site,
    `<div class="box">
      <div class="box-title">LINK</div>
      <p>リンクフリーです。報告は任意ですがあるとうれしいです。</p>
      <ul>${site.links.map((link) => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.title)}</a> - ${escapeHtml(link.comment)}</li>`).join('')}</ul>
    </div>`,
  );
}

function diaryPage(site: GeneratedSite) {
  return layout(
    'DIARY',
    site,
    `<div class="box">
      <div class="box-title">DIARY</div>
      ${site.updates.map((item) => `<p><strong>${escapeHtml(item.date)}</strong><br />${escapeHtml(item.text)} 今日はちょっとだけ更新しました。</p>`).join('')}
    </div>`,
  );
}

function css(site: GeneratedSite) {
  const { config } = site;
  return `:root {
  --bg: ${config.bgColor};
  --panel: ${config.panelColor};
  --text: ${config.baseTextColor};
  --link: ${config.linkColor};
  --accent: ${config.accentColor};
  --border: ${config.borderColor};
}

body {
  margin: 0;
  color: var(--text);
  background-color: var(--bg);
  font-family: "MS PGothic", "Meiryo", sans-serif;
  font-size: 14px;
}

a { color: var(--link); }
img { max-width: 100%; }
.top-banner { margin-bottom: 12px; }
.top-banner img { display: block; width: 100%; border: 3px ridge var(--border); }

.pattern-dots { background-image: radial-gradient(rgba(255,255,255,0.75) 1.2px, transparent 1.2px); background-size: 12px 12px; }
.pattern-hearts { background-image: radial-gradient(circle at 25% 25%, rgba(255,182,193,0.55) 0 3px, transparent 3px), radial-gradient(circle at 75% 25%, rgba(255,182,193,0.55) 0 3px, transparent 3px), linear-gradient(135deg, transparent 11px, rgba(255,182,193,0.4) 11px 14px, transparent 14px); background-size: 24px 24px; }
.pattern-stars { background-image: radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), radial-gradient(rgba(102,204,255,0.35) 1px, transparent 1px); background-position: 0 0, 10px 10px; background-size: 20px 20px; }
.pattern-checker { background-image: linear-gradient(45deg, rgba(255,211,115,0.22) 25%, transparent 25%, transparent 75%, rgba(255,211,115,0.22) 75%), linear-gradient(45deg, rgba(255,211,115,0.22) 25%, transparent 25%, transparent 75%, rgba(255,211,115,0.22) 75%); background-position: 0 0, 12px 12px; background-size: 24px 24px; }
.pattern-grid { background-image: linear-gradient(rgba(122,162,106,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(122,162,106,0.18) 1px, transparent 1px); background-size: 16px 16px; }
.pattern-bubbles { background-image: radial-gradient(circle at 20% 20%, rgba(176,79,124,0.18) 0 8px, transparent 8px), radial-gradient(circle at 70% 30%, rgba(90,67,168,0.14) 0 10px, transparent 10px), radial-gradient(circle at 50% 70%, rgba(189,177,216,0.2) 0 11px, transparent 11px); background-size: 120px 120px; }

.page-shell { width: min(960px, calc(100% - 24px)); margin: 16px auto; background: rgba(255,255,255,0.78); border: 3px double var(--border); padding: 12px; }
.page-title { text-align: center; border: 2px solid var(--border); background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78)); padding: 12px; }
.page-title h1 { margin: 4px 0; color: var(--accent); }
.sparkle { color: var(--link); font-size: 12px; letter-spacing: 2px; animation: blink 1.2s steps(2, jump-none) infinite; }
.retro-nav { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 12px 0; }
.retro-nav a, .mini-banner { border: 1px solid var(--border); background: var(--panel); padding: 6px 10px; text-decoration: none; }
.two-column { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
.box { background: var(--panel); border: 2px solid var(--border); margin-bottom: 12px; padding: 10px; }
.box-title { display: inline-block; margin-bottom: 8px; padding: 2px 8px; background: var(--accent); color: #fff; font-weight: bold; }
.meta { display: inline-block; margin-left: 8px; font-size: 12px; }
.banner-stack { display: grid; gap: 6px; }
.construction-mark { width: 160px; }
.bbs-post { border-top: 1px dashed var(--border); padding-top: 8px; margin-top: 8px; }
.center { text-align: center; }
.page-footer { text-align: center; font-size: 12px; margin-top: 16px; }
@keyframes blink { 50% { opacity: 0.3; } }
@media (max-width: 720px) { .two-column { grid-template-columns: 1fr; } }`;
}

function js() {
  return `document.querySelectorAll('.mini-banner').forEach((banner, index) => {
  banner.style.animation = \`blink 1.4s steps(2, jump-none) \${index * 0.1}s infinite\`;
});`;
}

function constructionSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="90" viewBox="0 0 320 90">
  <rect width="320" height="90" fill="#fff8cc" stroke="#ff8800" stroke-width="4"/>
  <rect x="10" y="10" width="300" height="70" fill="#111111"/>
  <text x="160" y="38" text-anchor="middle" fill="#ffff66" font-size="24" font-family="Verdana">UNDER CONSTRUCTION</text>
  <text x="160" y="65" text-anchor="middle" fill="#ff6666" font-size="20" font-family="Verdana">工事中...</text>
</svg>`;
}

export function buildStaticSite(site: GeneratedSite) {
  return {
    'index.html': topPage(site),
    'profile.html': profilePage(site),
    'bbs.html': bbsPage(site),
    'link.html': linksPage(site),
    'diary.html': diaryPage(site),
    'style.css': css(site),
    'script.js': js(),
    'assets/construction.svg': constructionSvg(),
    'assets/banners/welcome-banner.png': null,
    'assets/banners/heisei-banner.png': null,
  };
}
