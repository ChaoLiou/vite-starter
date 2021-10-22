import { FeatureModel } from '@/models/FeatureModel';

export interface FeatureInterface extends FeatureModel {
  highlightedTags: string[];
}
