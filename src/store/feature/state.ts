import type { FeatureModel } from '@/models/FeatureModel';

export const state = {
  list: [] as FeatureModel[],
};

export type State = typeof state;
