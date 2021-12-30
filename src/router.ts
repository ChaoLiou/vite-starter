/* eslint-disable no-unused-vars */
import type { BreadcrumbType } from './interfaces/UtilityInterface';
import { RouteKeys } from './router/routes';

declare module 'vue-router' {
  interface RouteMeta {
    // Hide sider if true
    siderless?: boolean;
    breadcrumbs?: BreadcrumbType[] | RouteKeys[];
  }
}
