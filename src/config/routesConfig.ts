import { lazy } from 'react';
import { IRoute } from '@/interfaces/interfaceCommon';
import { Path } from './path';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Monitor = lazy(() => import('@/pages/Monitor'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const routesConfig: IRoute[] = [
  {
    path: Path.DASHBOARD,
    component: Dashboard,
  },
  {
    path: Path.MONITOR,
    component: Monitor,
  },
  {
    path: Path.UNDEFINED,
    component: NotFound,
  },
];

export default routesConfig;
