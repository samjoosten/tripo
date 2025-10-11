import { SIZING } from '../const/sizing';
import type { SizingType } from '../types/sizing';

export const sizeValue = (size: SizingType) => {
  const [parent, child] = size.split('.') as [
    keyof typeof SIZING,
    keyof (typeof SIZING)[keyof typeof SIZING],
  ];
  return SIZING[parent]?.[child];
};