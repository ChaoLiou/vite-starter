import { computed, ComputedRef, ref } from 'vue';
import { FeatureModel } from '@/models/FeatureModel';
import { FeatureInterface } from '@/interfaces/FeatureInterface';

/**
 * Search {features} which any {FeatureModel.title} or
 * {FeatureModel.tags} contain {searchQuery}, and highlight if it's tag matching.
 * @param features
 * @param searchQuery
 * @returns
 */
export function search(features: FeatureModel[], searchQuery: string) {
  const isSearchQueryMatched = (text: string) => text.toLocaleLowerCase().includes(searchQuery);

  return features
    .filter(
      (feature: FeatureModel) =>
        isSearchQueryMatched(feature.title) ||
        feature.tags.some((tag) => isSearchQueryMatched(tag)),
    )
    .map(
      (feature) =>
        ({
          ...feature,
          highlightedTags: feature.tags.filter((tag) => searchQuery && isSearchQueryMatched(tag)),
        } as FeatureInterface),
    );
}

export default function useFeatureFilters(features: ComputedRef<FeatureModel[]>) {
  const searchQuery = ref('');

  const filteredFeatures = computed<FeatureInterface[]>(() =>
    search(features.value, searchQuery.value),
  );

  return {
    searchQuery,
    filteredFeatures,
  };
}
