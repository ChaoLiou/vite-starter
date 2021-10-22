import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import menuList from './menu';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { menuList };

export default router;
