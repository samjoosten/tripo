import type { SIZING } from '../const/sizing';

export type SizingType = `${keyof typeof SIZING}.${keyof (typeof SIZING)[keyof typeof SIZING]}`;