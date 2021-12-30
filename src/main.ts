import { createApp } from 'vue';
import { v4 as uuid } from 'uuid';
import App from './App.vue';
import router from '@/router/index';
import { store } from '@/store';
import makeServer from '@/miragejs/server';
import socketIOPlugin from '@/plugins/ws/socket-io';
import localStorageMockPlugin from '@/plugins/localStorage/mock';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');

  if (import.meta.env.VITE_ENABLE_MOCK_SERVER === 'yes') {
    makeServer({ environment: 'development' });
  }
}

async function bootstrap() {
  const app = createApp(App);
  app.use(router);
  app.use(store);

  if (import.meta.env.VITE_ENABLE_MOCK_SERVER !== 'yes') {
    app.use(socketIOPlugin, {
      uri: processEnv.VUE_APP_WS_URL,
      socketIOOptions: {
        path: processEnv.VUE_APP_WS_PATH,
        forceNew: true,
        reconnectionAttempts: 3,
        timeout: 2000,
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}` ?? '',
          'trace-id': uuid(),
        },
      },
      vuex: { store, namespace: 'wsqueue' },
    });
  }

  if (import.meta.env.DEV) {
    app.use(localStorageMockPlugin);
  }

  app.mount('#app');
}

bootstrap();
