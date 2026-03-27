import { backgroundPatterns } from '../data/components';
import {
  bannerTextPool,
  bbsMessages,
  bbsNames,
  catchCopies,
  footerLines,
  kiribanPresets,
  linkTemplates,
  profileTemplates,
  updateTemplates,
  welcomeLines,
} from '../data/phrases';
import { themes } from '../data/themes';
import { themeWeights, toggleWeights } from '../data/weights';
import type { GeneratedSite, SiteConfig, ThemeDefinition, ThemeKey } from '../types/site';
import { pickMany, pickOne, randomBool, randomInt, weightedPick } from './random';

export function getThemeByKey(themeKey: ThemeKey): ThemeDefinition {
  return themes.find((theme) => theme.key === themeKey) ?? themes[0];
}

export function createDraftFromTheme(themeKey: ThemeKey): SiteConfig {
  const theme = getThemeByKey(themeKey);
  return {
    themeKey: theme.key,
    siteTitle: pickOne(theme.titlePool),
    managerName: pickOne(theme.managerPool),
    intro: pickOne(theme.introPool),
    profileBlurb: `${pickOne(profileTemplates)} / ${pickOne(profileTemplates)}`,
    backgroundPattern: theme.backgroundPattern,
    baseTextColor: theme.baseTextColor,
    linkColor: theme.linkColor,
    accentColor: theme.accentColor,
    bgColor: theme.bgColor,
    panelColor: theme.panelColor,
    borderColor: theme.borderColor,
    showCounter: true,
    showKiriban: true,
    showBbs: true,
    showHistory: true,
    showLinks: true,
    showUnderConstruction: true,
  };
}

export function createRandomConfig(): SiteConfig {
  const themeKey = weightedPick(themeWeights);

  return {
    ...createDraftFromTheme(themeKey),
    showCounter: randomBool(toggleWeights.counter),
    showKiriban: randomBool(toggleWeights.kiriban),
    showBbs: randomBool(toggleWeights.bbs),
    showHistory: randomBool(toggleWeights.history),
    showLinks: randomBool(toggleWeights.links),
    showUnderConstruction: randomBool(toggleWeights.underConstruction),
    profileBlurb: `${pickOne(profileTemplates)} / ${pickOne(profileTemplates)}`,
  };
}

export function generateSite(config: SiteConfig): GeneratedSite {
  const counterValue = String(randomInt(87, 543210)).padStart(7, '0');
  const kiriban = pickMany(kiribanPresets, randomInt(3, 4)).sort((a, b) => Number(a) - Number(b));
  const updates = pickMany(updateTemplates, randomInt(3, 5)).map((text, index) => ({
    date: `200${randomInt(0, 4)}.${String(randomInt(1, 12)).padStart(2, '0')}.${String(randomInt(1, 28)).padStart(2, '0')}`,
    text: index === 0 ? `${text} New!` : text,
  }));
  const bbsPosts = pickMany(bbsMessages, randomInt(2, 5)).map((message) => ({
    name: pickOne(bbsNames),
    message,
    date: `200${randomInt(0, 4)}/${String(randomInt(1, 12)).padStart(2, '0')}/${String(randomInt(1, 28)).padStart(2, '0')}`,
  }));

  return {
    config,
    counterValue,
    kiriban,
    catchCopy: pickOne(catchCopies),
    welcomeLine: pickOne(welcomeLines),
    footerLine: pickOne(footerLines),
    profileItems: pickMany(profileTemplates, 3),
    bbsPosts,
    updates,
    links: pickMany(linkTemplates, randomInt(3, 5)),
    banners: pickMany(bannerTextPool, randomInt(3, 5)),
  };
}

export function getPatternLabel(patternKey: SiteConfig['backgroundPattern']) {
  return backgroundPatterns.find((pattern) => pattern.key === patternKey)?.label ?? backgroundPatterns[0].label;
}
