import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import { store } from '@/store';
import socketIOPlugin from '@/utils/ws/socket-io';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);
  app.use(router);
  app.use(store);

  app.use(socketIOPlugin, {
    uri: 'ws://172.17.9.54:3001',
    socketIOOptions: {},
    vuex: { store, namespace: 'wsqueue' },
  });

  app.mount('#app');
}

bootstrap();
