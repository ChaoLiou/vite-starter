<script setup lang="ts">
  import { computed } from 'vue';
  import { Layout, LayoutContent, LayoutHeader, Menu, MenuItem } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { menuList } from '@/router';

  const route = useRoute();
  const menuKey = computed(() => route.name?.toString().toLowerCase());
</script>

<template>
  <Layout>
    <LayoutHeader>
      <Menu theme="dark" mode="horizontal" :selected-keys="[menuKey]">
        <MenuItem v-for="item in menuList" :key="item.key">
          <router-link :to="item.link">{{ item.title }}</router-link>
        </MenuItem>
      </Menu>
    </LayoutHeader>
    <LayoutContent style="padding: 16px">
      <router-view />
    </LayoutContent>
  </Layout>
</template>

<style lang="scss"></style>
