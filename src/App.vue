<script setup lang="ts">
  import { Layout, LayoutContent, LayoutHeader, Menu, MenuItem } from 'ant-design-vue';
  import { menuList } from '@/router';
</script>

<template>
  <Layout>
    <LayoutHeader>
      <Menu theme="dark" mode="horizontal" :selected-keys="['home']">
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
