export enum LanguageList {
  EN = 'en',
  NL = 'nl',
}

export type LanguageType = Lowercase<keyof typeof LanguageList>;
