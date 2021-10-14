import { createApp } from 'vue'
import App from './App.vue'

// Importing on demand in local development will increase the number of browser requests by around 20%.
// This may slow down the browser refresh speed.
// Therefore, only enable on-demand importing in production environments .
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App)
  app.mount('#app')
}

bootstrap()
