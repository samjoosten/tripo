import type { SIZING } from '../const/sizing';

export type SizingType = {
  [K in keyof typeof SIZING]: `${K & string}.${keyof (typeof SIZING)[K] & string}`;
}[keyof typeof SIZING];
