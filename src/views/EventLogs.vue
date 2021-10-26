<script lang="ts">
  import { defineComponent } from 'vue';
  import { Table } from 'ant-design-vue';
  import useNotifications from '@/composables/useNotifications';

  export default defineComponent({
    components: {
      Table,
    },
    setup() {
      const { events } = useNotifications();
      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'params',
          dataIndex: 'params',
          key: 'params',
          slots: { customRender: 'params' },
        },
        {
          title: 'timestamp',
          dataIndex: 'timestamp',
          key: 'timestamp',
        },
      ];

      return {
        events,
        columns,
      };
    },
  });
</script>

<template>
  <div>
    <Table :data-source="events" :columns="columns">
      <template #params="{ record }">{{ record.params }}</template>
    </Table>
  </div>
</template>
