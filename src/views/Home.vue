<script lang="ts">
  import { defineComponent } from 'vue';
  import { List, ListItem, Card, Tag, InputSearch, Divider } from 'ant-design-vue';
  import FeatureList from '@/components/FeatureList.vue';
  import useFeatures from '@/composables/useFeatures';
  import useFeatureFilters from '@/composables/useFeatureFilters';

  export default defineComponent({
    components: {
      List,
      ListItem,
      Card,
      Tag,
      InputSearch,
      Divider,
      FeatureList,
    },
    setup() {
      const { features, allTags } = useFeatures();
      const { searchQuery, filteredFeatures } = useFeatureFilters(features);

      return {
        allTags,
        searchQuery,
        filteredFeatures,
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
  </div>
</template>

<style lang="scss" scoped></style>
