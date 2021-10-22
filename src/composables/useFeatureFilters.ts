import { computed, ComputedRef, ref } from 'vue';
import { FeatureModel } from '@/models/FeatureModel';
import { FeatureInterface } from '@/interfaces/FeatureInterface';

export default function useFeatureFilters(features: ComputedRef<FeatureModel[]>) {
  const searchQuery = ref('');

  const isSearchQueryMatched = (text: string) =>
    text.toLocaleLowerCase().includes(searchQuery.value);

  const filteredFeatures = computed<FeatureInterface[]>(() => {
    return features.value
      .filter(
        (feature: FeatureModel) =>
          isSearchQueryMatched(feature.title) ||
          feature.tags.some((tag) => isSearchQueryMatched(tag)),
      )
      .map(
        (feature) =>
          ({
            ...feature,
            highlightedTags: feature.tags.filter(
              (tag) => searchQuery.value && isSearchQueryMatched(tag),
            ),
          } as FeatureInterface),
      );
  });

  return {
    searchQuery,
    filteredFeatures,
  };
}
