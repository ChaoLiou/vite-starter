import { mount } from '@vue/test-utils';
import FeatureList from '@/components/FeatureList.vue';
import { FeatureModel } from '@/models/FeatureModel';

describe('FeatureList.vue', () => {
  it('renders props.dataSource when passed', async () => {
    const dataSource: FeatureModel[] = [{ title: 'Title', tags: ['Tag1', 'Tag2'] }];
    const wrapper = mount(FeatureList);
    await wrapper.setProps({
      dataSource,
    });
    const text = wrapper.text();
    expect(text).toMatch(dataSource[0].title + dataSource[0].tags.join(''));
  });
});
