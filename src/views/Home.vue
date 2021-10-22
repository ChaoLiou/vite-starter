<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tag, InputSearch, Divider } from 'ant-design-vue';
  import FeatureList from '@/components/FeatureList.vue';
  import useFeatures from '@/composables/useFeatures';
  import useFeatureFilters from '@/composables/useFeatureFilters';
  import useSamples from '@/composables/useSamples';

  export default defineComponent({
    components: {
      Tag,
      InputSearch,
      Divider,
      FeatureList,
    },
    setup() {
      const { features, allTags } = useFeatures();
      const { lastSample, samples } = useSamples();
      const { searchQuery, filteredFeatures } = useFeatureFilters(features);

      return {
        allTags,
        searchQuery,
        filteredFeatures,
        lastSample,
        samples,
      };
    },
  });
</script>

<template>
  <div>
    <h1>Features</h1>
    <InputSearch
      v-model="searchQuery"
      placeholder="Search features"
      @keyup="searchQuery = $event.target.value"
    ></InputSearch>
    <Divider></Divider>
    <div>
      <label>All tags: </label>
      <Tag v-for="tag in allTags" :key="tag">
        {{ tag }}
      </Tag>
      <FeatureList :data-source="filteredFeatures"></FeatureList>
    </div>
    <h3>All samples: {{ samples.join(', ') }}</h3>
    <h3>Last sample: {{ lastSample }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
