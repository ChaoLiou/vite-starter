import { search } from '@/composables/useFeatureFilters';
import { FeatureInterface } from '@/interfaces/FeatureInterface';
import { FeatureModel } from '@/models/FeatureModel';

describe('useFeatureFilters', () => {
  const inline = (feature: FeatureInterface) =>
    `${feature.title}:${feature.tags.join(',')}>${feature.highlightedTags.join(',')}`;
  const join = (features: FeatureInterface[]) => features.map(inline).join(';');

  it('search features: title is matched', async () => {
    const features: FeatureModel[] = [
      { title: 'fruit', tags: ['apple', 'banana'] },
      { title: 'weather', tags: ['sunny', 'windy', 'rainy'] },
    ];
    const searchQuery = 'fruit';
    const result = search(features, searchQuery);
    expect(join(result)).toBe('fruit:apple,banana>');
  });

  it('search features: tags are matched', async () => {
    const features: FeatureModel[] = [
      { title: 'fruit', tags: ['apple', 'banana'] },
      { title: 'weather', tags: ['sunny', 'windy', 'rainy'] },
    ];
    const searchQuery = 'ny';
    const result = search(features, searchQuery);
    expect(join(result)).toBe('weather:sunny,windy,rainy>sunny,rainy');
  });

  it('search features: nothing is matched', async () => {
    const features: FeatureModel[] = [
      { title: 'fruit', tags: ['apple', 'banana'] },
      { title: 'weather', tags: ['sunny', 'windy', 'rainy'] },
    ];
    const searchQuery = 'xxx';
    const result = search(features, searchQuery);
    expect(join(result)).toBe('');
  });
});
