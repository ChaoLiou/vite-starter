import { createApp } from 'vue';
import App from './App.vue';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);
  app.mount('#app');
}

bootstrap();
