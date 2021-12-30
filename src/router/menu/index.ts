import { RouteKeys, RouteTitleMap } from '@/router/routes';

export default [
  {
    key: RouteKeys.HOME,
    name: RouteTitleMap[RouteKeys.HOME],
    path: '/dashboard',
  },
  {
    key: RouteKeys.EVENT_LOGS,
    name: RouteTitleMap[RouteKeys.EVENT_LOGS],
    path: '/server',
  },
];
