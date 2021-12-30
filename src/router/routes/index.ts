/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import EventLogs from '@/views/EventLogs.vue';
import type { IDictionary } from '@/interfaces/UtilityInterface';

export enum RouteKeys {
  HOME = 'home',
  EVENT_LOGS = 'event-logs',
}

export const RouteTitleMap = {
  [RouteKeys.HOME]: 'Home',
  [RouteKeys.EVENT_LOGS]: 'Event Logs',
} as IDictionary;

export default [
  {
    path: '/',
    redirect: { name: RouteKeys.HOME },
  },
  {
    name: RouteKeys.HOME,
    path: '/home',
    component: Home,
  },
  {
    name: RouteKeys.EVENT_LOGS,
    path: '/event-logs',
    component: EventLogs,
  },
] as RouteRecordRaw[];
