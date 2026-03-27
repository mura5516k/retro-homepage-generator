import { useState, type CSSProperties, type ReactNode } from 'react';
import { backgroundPatterns } from './data/components';
import { themes } from './data/themes';
import { downloadSiteZip } from './lib/exportZip';
import { createDraftFromTheme, createRandomConfig, generateSite, getPatternLabel } from './lib/generator';
import type { GeneratedSite, Mode, SiteConfig, ThemeKey } from './types/site';

const welcomeBannerUrl = `${import.meta.env.BASE_URL}assets/banners/welcome-banner.png`;
const heiseiBannerUrl = `${import.meta.env.BASE_URL}assets/banners/heisei-banner.png`;

function App() {
  const initialDraft = createDraftFromTheme('pastel-diary');
  const [mode, setMode] = useState<Mode>('custom');
  const [draftConfig, setDraftConfig] = useState<SiteConfig>(initialDraft);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite>(() => generateSite(initialDraft));

  const applyGeneratedConfig = (nextConfig: SiteConfig) => {
    setDraftConfig(nextConfig);
    setGeneratedSite(generateSite(nextConfig));
  };

  const handleThemeChange = (themeKey: ThemeKey) => {
    const themedDraft = createDraftFromTheme(themeKey);
    setDraftConfig((prev) => ({
      ...themedDraft,
      showCounter: prev.showCounter,
      showKiriban: prev.showKiriban,
      showBbs: prev.showBbs,
      showHistory: prev.showHistory,
      showLinks: prev.showLinks,
      showUnderConstruction: prev.showUnderConstruction,
    }));
  };

  const handleOmakase = () => {
    const next = createRandomConfig();
    setMode('omakase');
    applyGeneratedConfig(next);
  };

  const updateField = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    setDraftConfig((prev) => ({ ...prev, [key]: value }));
  };

  const site = generatedSite;

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Vite + React + TypeScript</p>
          <img className="app-banner" src={welcomeBannerUrl} alt="Welcome to My Homepage! 平成ホームページメーカー" />
          <h1>2000年前後の日本の個人ホームページ風ジェネレータ</h1>
          <p className="hero-copy">
            懐かしい配色、キリ番、掲示板、工事中バナーまで含めて、昔の個人サイト文化を静的HTMLとして書き出せます。
          </p>
        </div>
        <div className="action-row top-actions">
          <button className="primary" onClick={() => applyGeneratedConfig(draftConfig)}>
            この内容で生成
          </button>
          <button onClick={handleOmakase}>もう一回生成</button>
          <button onClick={() => downloadSiteZip(site)}>ZIPダウンロード</button>
        </div>
      </header>

      <div className="mode-tabs" role="tablist" aria-label="モード切替">
        <button className={mode === 'custom' ? 'tab active' : 'tab'} onClick={() => setMode('custom')}>
          カスタムモード
        </button>
        <button className={mode === 'omakase' ? 'tab active' : 'tab'} onClick={() => setMode('omakase')}>
          おまかせモード
        </button>
      </div>

      <main className="workspace">
        <section className="control-panel">
          <div className="panel-header">
            <h2>{mode === 'custom' ? 'カスタム設定' : 'おまかせ結果の調整'}</h2>
            <p>
              {mode === 'custom'
                ? '左で編集中の内容と、右で生成済みの見た目を分離しています。'
                : 'おまかせ生成の結果はそのまま編集できます。気に入ったらカスタムとして微調整してください。'}
            </p>
          </div>

          <label className="field">
            <span>テーマ</span>
            <select value={draftConfig.themeKey} onChange={(e) => handleThemeChange(e.target.value as ThemeKey)}>
              {themes.map((theme) => (
                <option key={theme.key} value={theme.key}>
                  {theme.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>サイトタイトル</span>
            <input value={draftConfig.siteTitle} onChange={(e) => updateField('siteTitle', e.target.value)} />
          </label>

          <label className="field">
            <span>管理人名</span>
            <input value={draftConfig.managerName} onChange={(e) => updateField('managerName', e.target.value)} />
          </label>

          <label className="field">
            <span>自己紹介文</span>
            <textarea rows={4} value={draftConfig.intro} onChange={(e) => updateField('intro', e.target.value)} />
          </label>

          <label className="field">
            <span>プロフィール補足</span>
            <textarea rows={3} value={draftConfig.profileBlurb} onChange={(e) => updateField('profileBlurb', e.target.value)} />
          </label>

          <div className="field-grid">
            <label className="field">
              <span>背景パターン</span>
              <select
                value={draftConfig.backgroundPattern}
                onChange={(e) => updateField('backgroundPattern', e.target.value as SiteConfig['backgroundPattern'])}
              >
                {backgroundPatterns.map((pattern) => (
                  <option key={pattern.key} value={pattern.key}>
                    {pattern.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>ベース文字色</span>
              <input type="color" value={draftConfig.baseTextColor} onChange={(e) => updateField('baseTextColor', e.target.value)} />
            </label>

            <label className="field">
              <span>リンク色</span>
              <input type="color" value={draftConfig.linkColor} onChange={(e) => updateField('linkColor', e.target.value)} />
            </label>
          </div>

          <div className="toggle-list">
            <label><input type="checkbox" checked={draftConfig.showCounter} onChange={(e) => updateField('showCounter', e.target.checked)} /> カウンタ表示</label>
            <label><input type="checkbox" checked={draftConfig.showKiriban} onChange={(e) => updateField('showKiriban', e.target.checked)} /> キリ番案内</label>
            <label><input type="checkbox" checked={draftConfig.showBbs} onChange={(e) => updateField('showBbs', e.target.checked)} /> 掲示板表示</label>
            <label><input type="checkbox" checked={draftConfig.showHistory} onChange={(e) => updateField('showHistory', e.target.checked)} /> 更新履歴表示</label>
            <label><input type="checkbox" checked={draftConfig.showLinks} onChange={(e) => updateField('showLinks', e.target.checked)} /> リンク集表示</label>
            <label>
              <input
                type="checkbox"
                checked={draftConfig.showUnderConstruction}
                onChange={(e) => updateField('showUnderConstruction', e.target.checked)}
              />{' '}
              工事中GIF表示
            </label>
          </div>

          <div className="action-row mobile-actions">
            <button className="primary" onClick={() => applyGeneratedConfig(draftConfig)}>
              この内容で生成
            </button>
            <button onClick={handleOmakase}>もう一回生成</button>
            <button onClick={() => downloadSiteZip(site)}>ZIPダウンロード</button>
          </div>
        </section>

        <section className="preview-panel">
          <div className="preview-meta">
            <div>
              <strong>生成済みプレビュー</strong>
              <p>
                テーマ: {themes.find((theme) => theme.key === site.config.themeKey)?.label} / 背景: {getPatternLabel(site.config.backgroundPattern)}
              </p>
            </div>
          </div>

          <div className={`retro-preview pattern-${site.config.backgroundPattern}`} style={previewVars(site.config)}>
            <div className="retro-page">
              <div className="retro-top-banner">
                <img src={heiseiBannerUrl} alt="平成ホームページメーカー" />
              </div>
              <div className="retro-title-box">
                <div className="sparkle-line">WELCOME TO MY HOMEPAGE</div>
                <h2>{site.config.siteTitle}</h2>
                <p>{site.catchCopy}</p>
              </div>

              <div className="retro-marquee">
                <span>{site.welcomeLine}</span>
              </div>

              <div className="retro-layout">
                <div className="retro-main">
                  <RetroBox title="TOP">
                    <p>{site.config.intro}</p>
                    {site.config.showCounter && <p className="retro-counter">あなたは {site.counterValue} 人目のお客様です</p>}
                    {site.config.showKiriban && <p>キリ番 {site.kiriban.join(' / ')} を踏んだ方は掲示板でご報告ください♪</p>}
                  </RetroBox>

                  {site.config.showHistory && (
                    <RetroBox title="更新履歴">
                      <ul className="retro-list">
                        {site.updates.map((item) => (
                          <li key={`${item.date}-${item.text}`}>{item.date} {item.text}</li>
                        ))}
                      </ul>
                    </RetroBox>
                  )}

                  {site.config.showBbs && (
                    <RetroBox title="掲示板">
                      <div className="bbs-list">
                        {site.bbsPosts.map((post, index) => (
                          <div key={`${post.name}-${index}`} className="bbs-item">
                            <strong>{post.name}</strong> <span>{post.date}</span>
                            <p>{post.message}</p>
                          </div>
                        ))}
                      </div>
                    </RetroBox>
                  )}
                </div>

                <aside className="retro-side">
                  <RetroBox title="プロフィール">
                    <p>管理人: {site.config.managerName}</p>
                    <p>{site.config.profileBlurb}</p>
                    <ul className="retro-list">
                      {site.profileItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </RetroBox>

                  {site.config.showLinks && (
                    <RetroBox title="リンク集">
                      <ul className="retro-list">
                        {site.links.map((link) => (
                          <li key={link.title}>
                            <a href={link.url} onClick={(e) => e.preventDefault()}>
                              {link.title}
                            </a>
                            <br />
                            <span>{link.comment}</span>
                          </li>
                        ))}
                      </ul>
                    </RetroBox>
                  )}

                  <RetroBox title="バナー">
                    <div className="banner-grid">
                      {site.banners.map((banner) => (
                        <div key={banner} className="mini-banner">
                          {banner}
                        </div>
                      ))}
                    </div>
                  </RetroBox>

                  {site.config.showUnderConstruction && (
                    <RetroBox title="工事中">
                      <div className="construction-wrap">
                        <div className="construction-sign">UNDER CONSTRUCTION</div>
                        <div className="construction-text">工事中...</div>
                      </div>
                    </RetroBox>
                  )}
                </aside>
              </div>

              <footer className="retro-footer">{site.footerLine}</footer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function RetroBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="retro-box">
      <div className="retro-box-title">{title}</div>
      <div>{children}</div>
    </section>
  );
}

function previewVars(config: SiteConfig) {
  return {
    ['--retro-bg' as const]: config.bgColor,
    ['--retro-panel' as const]: config.panelColor,
    ['--retro-text' as const]: config.baseTextColor,
    ['--retro-link' as const]: config.linkColor,
    ['--retro-accent' as const]: config.accentColor,
    ['--retro-border' as const]: config.borderColor,
  } as CSSProperties;
}

export default App;
