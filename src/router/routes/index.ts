import Home from '@/views/Home.vue';
import EventLogs from '@/views/EventLogs.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/event-logs',
    name: 'EventLogs',
    component: EventLogs,
  },
];
