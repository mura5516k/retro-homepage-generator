export type Mode = 'custom' | 'omakase';

export type BackgroundPatternKey =
  | 'dots'
  | 'hearts'
  | 'stars'
  | 'checker'
  | 'grid'
  | 'bubbles';

export type ThemeKey =
  | 'pastel-diary'
  | 'dark-otaku'
  | 'game-walkthrough'
  | 'poetry-atelier'
  | 'alliance-banner';

export interface ThemeDefinition {
  key: ThemeKey;
  label: string;
  description: string;
  titlePool: string[];
  managerPool: string[];
  introPool: string[];
  baseTextColor: string;
  linkColor: string;
  accentColor: string;
  bgColor: string;
  panelColor: string;
  borderColor: string;
  backgroundPattern: BackgroundPatternKey;
}

export interface SiteConfig {
  themeKey: ThemeKey;
  siteTitle: string;
  managerName: string;
  intro: string;
  profileBlurb: string;
  backgroundPattern: BackgroundPatternKey;
  baseTextColor: string;
  linkColor: string;
  accentColor: string;
  bgColor: string;
  panelColor: string;
  borderColor: string;
  showCounter: boolean;
  showKiriban: boolean;
  showBbs: boolean;
  showHistory: boolean;
  showLinks: boolean;
  showUnderConstruction: boolean;
}

export interface BbsPost {
  name: string;
  message: string;
  date: string;
}

export interface LinkItem {
  title: string;
  url: string;
  comment: string;
}

export interface UpdateItem {
  date: string;
  text: string;
}

export interface GeneratedSite {
  config: SiteConfig;
  counterValue: string;
  kiriban: string[];
  catchCopy: string;
  welcomeLine: string;
  footerLine: string;
  profileItems: string[];
  bbsPosts: BbsPost[];
  updates: UpdateItem[];
  links: LinkItem[];
  banners: string[];
}
