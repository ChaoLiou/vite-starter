<script lang="ts">
  import { defineComponent, toRefs, PropType } from 'vue';
  import { List, ListItem, Card, Tag } from 'ant-design-vue';
  import { FeatureInterface } from '@/interfaces/FeatureInterface';

  export default defineComponent({
    components: {
      List,
      ListItem,
      Card,
      Tag,
    },
    props: {
      dataSource: {
        type: Array as PropType<FeatureInterface[]>,
        default: () => [],
      },
    },
    setup(props) {
      const { dataSource: features } = toRefs(props);
      return {
        features,
      };
    },
  });
</script>

<template>
  <List item-layout="vertical" :data-source="features">
    <template #renderItem="{ item }">
      <ListItem>
        <Card :title="item.title">
          <Tag
            v-for="tag in item.tags"
            :key="tag"
            :color="item.highlightedTags.includes(tag) ? 'orange' : ''"
          >
            {{ tag }}
          </Tag>
        </Card>
      </ListItem>
    </template>
  </List>
</template>

<style lang="scss" scoped></style>
