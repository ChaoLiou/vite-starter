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
      const { dataSource } = toRefs(props);
      return {
        dataSource,
      };
    },
  });
</script>

<template>
  <List item-layout="vertical" :data-source="dataSource">
    <template #renderItem="{ item }">
      <ListItem>
        <Card :title="item.title">
          <Tag
            :color="item.highlightedTags.includes(tag) ? 'orange' : ''"
            v-for="tag in item.tags"
            :key="tag"
          >
            {{ tag }}
          </Tag>
        </Card>
      </ListItem>
    </template>
  </List>
</template>

<style lang="scss" scoped></style>
