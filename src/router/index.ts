import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(processEnv.BASE_URL),
  routes,
});

export default router;
