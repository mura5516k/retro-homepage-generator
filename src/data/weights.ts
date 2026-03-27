import type { ThemeKey } from '../types/site';

export const themeWeights: Record<ThemeKey, number> = {
  'pastel-diary': 28,
  'dark-otaku': 18,
  'game-walkthrough': 20,
  'poetry-atelier': 16,
  'alliance-banner': 18,
};

export const toggleWeights = {
  counter: 0.96,
  kiriban: 0.82,
  bbs: 0.9,
  history: 0.92,
  links: 0.9,
  underConstruction: 0.78,
};
